import React, { useMemo } from 'react'
import { CatalogVariant } from '../../app/models/catalog/catalogProduct';
import { Box, Typography } from '@mui/material';
import ColorSelect from './ColorSelector';
import MaterialSelect from './MaterialSelector';
import SizeSelect from './SizeSelector';


type Props = {
    variants: CatalogVariant[],
    selectedVariantValues: {
        [key: string]: string;
    };
    onVariantValueChange: (optionName: string, value: string) => void
}

const VariantSelector = ({ selectedVariantValues, variants, onVariantValueChange }: Props) => {

    const getAvailableOptions = (optionName: string, dependencies: string[]): string[] => {
        return variants
            .filter(variant =>
                dependencies.every(dep =>
                    variant.variantValues.some(v => v.optionName === dep && v.valueName === selectedVariantValues[dep])
                )
            )
            .flatMap(variant =>
                variant.variantValues.filter(v => v.optionName === optionName).map(v => v.valueName)
            );
    };


    const availableColors = useMemo(() => getAvailableOptions('Color', []), [selectedVariantValues])
    const availableSizes = useMemo(() => getAvailableOptions('Size', ['Color']), [selectedVariantValues]);
    const availableMaterials = useMemo(() => getAvailableOptions('Material', ['Color', 'Size']), [selectedVariantValues]);



    return (
        <>
            {variants.some(variant =>
                variant.variantValues.some(v => v.optionName === "Color")
            ) && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" mb={1}>Select Color:</Typography>
                        <ColorSelect
                            selectedColor={selectedVariantValues.Color || ""}
                            onColorChange={(value) => onVariantValueChange("Color", value)}
                            colors={availableColors}
                        />
                    </Box>
                )}

            {variants.some(variant =>
                variant.variantValues.some(v => v.optionName === "Size")
            ) && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" mb={1}>Select Size:</Typography>
                        <SizeSelect
                            selectedSize={selectedVariantValues.Size || ""}
                            onSizeChange={(value) => onVariantValueChange("Size", value)}
                            sizes={availableSizes}
                        />
                    </Box>
                )}

            {variants.some(variant =>
                variant.variantValues.some(v => v.optionName === "Material")
            ) && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" mb={1}>Select Material:</Typography>
                        <MaterialSelect
                            selectedMaterial={selectedVariantValues.Material || ""}
                            onMaterialChange={(value) => onVariantValueChange("Material", value)}
                            materials={availableMaterials}
                        />
                    </Box>
                )}
        </>
    )
}

export default VariantSelector