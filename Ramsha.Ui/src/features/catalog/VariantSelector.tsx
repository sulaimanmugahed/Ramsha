import React, { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import ColorSelect from './ColorSelector';
import MaterialSelect from './MaterialSelector';
import SizeSelect from './SizeSelector';
import AppFormError from '../../app/components/AppFormError';

type VariantValue = { optionName: string; valueName: string };
type Variant = { variantValues: VariantValue[] };

type Props = {
    variants: Variant[];
    options: string[]
};

const VariantSelector = ({ variants, options }: Props) => {
    const { setValue, formState: { errors } } = useFormContext();

    const selectedVariantValues = useWatch({ name: "variantValues" });

    const getAvailableOptions = (optionName: string, dependencies: string[]): string[] => {
        const availableValues = variants
            .filter(variant =>
                dependencies.every(dep =>
                    variant.variantValues.some(v => v.optionName === dep && v.valueName === selectedVariantValues[dep])
                )
            )
            .flatMap(variant =>
                variant.variantValues.filter(v => v.optionName === optionName).map(v => v.valueName)
            );

        return Array.from(new Set(availableValues));
    };


    const availableOptions = useMemo(() => {
        return options.reduce((acc: { [key: string]: string[] }, optionName) => {
            const dependencies = options.slice(0, options.indexOf(optionName));
            acc[optionName] = getAvailableOptions(optionName, dependencies);
            return acc;
        }, {});
    }, [options, selectedVariantValues]);

    useEffect(() => {
        options.forEach((optionName) => {
            if (!selectedVariantValues[optionName] && availableOptions[optionName]?.length > 0) {
                setValue(`variantValues.${optionName}`, availableOptions[optionName][0]);
            }
        });
    }, [availableOptions, options, selectedVariantValues, setValue]);

    const handleVariantValueChange = (optionName: string, value: string) => {
        setValue(`variantValues.${optionName}`, value);
    };

    return (

        <>
            {options.map(optionName => (
                <Box key={optionName} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" mb={1}>Select {optionName}:</Typography>
                    {optionName === 'Color' && (
                        <>
                            <ColorSelect
                                selectedColor={selectedVariantValues[optionName] || ''}
                                onColorChange={(value) => handleVariantValueChange(optionName, value)}
                                colors={availableOptions[optionName]}
                            />

                        </>
                    )}
                    {optionName === 'Size' && (
                        <SizeSelect
                            selectedSize={selectedVariantValues[optionName] || ''}
                            onSizeChange={(value) => handleVariantValueChange(optionName, value)}
                            sizes={availableOptions[optionName]}
                        />
                    )}
                    {optionName === 'Material' && (
                        <MaterialSelect
                            selectedMaterial={selectedVariantValues[optionName] || ''}
                            onMaterialChange={(value) => handleVariantValueChange(optionName, value)}
                            materials={availableOptions[optionName]}
                        />
                    )}
                    <AppFormError errors={errors} name={`variantValues.${optionName}`} />
                </Box>
            ))}
        </>
    );
};

export default VariantSelector;







// import React, { useMemo } from 'react'
// import { CatalogVariant } from '../../app/models/catalog/catalogProduct';
// import { Box, Typography } from '@mui/material';
// import ColorSelect from './ColorSelector';
// import MaterialSelect from './MaterialSelector';
// import SizeSelect from './SizeSelector';


// type Props = {
//     variants: { variantValues: { optionName: string; valueName: string }[] }[],
//     selectedVariantValues: {
//         [key: string]: string;
//     };
//     onVariantValueChange: (optionName: string, value: string) => void
// }

// const VariantSelector = ({ selectedVariantValues, variants, onVariantValueChange }: Props) => {




//     const getAvailableOptions = (optionName: string, dependencies: string[]): string[] => {
//         return variants
//             .filter(variant =>
//                 dependencies.every(dep =>
//                     variant.variantValues.some(v => v.optionName === dep && v.valueName === selectedVariantValues[dep])
//                 )
//             )
//             .flatMap(variant =>
//                 variant.variantValues.filter(v => v.optionName === optionName).map(v => v.valueName)
//             );
//     };


//     const availableColors = useMemo(() => getAvailableOptions('Color', []), [selectedVariantValues])
//     const availableSizes = useMemo(() => getAvailableOptions('Size', ['Color']), [selectedVariantValues]);
//     const availableMaterials = useMemo(() => getAvailableOptions('Material', ['Color', 'Size']), [selectedVariantValues]);



//     return (
//         <>
//             {variants.some(variant =>
//                 variant.variantValues.some(v => v.optionName === "Color")
//             ) && (
//                     <Box sx={{ mb: 2 }}>
//                         <Typography variant="subtitle2" mb={1}>Select Color:</Typography>
//                         <ColorSelect
//                             selectedColor={selectedVariantValues.Color || ""}
//                             onColorChange={(value) => onVariantValueChange("Color", value)}
//                             colors={availableColors}
//                         />
//                     </Box>
//                 )}

//             {variants.some(variant =>
//                 variant.variantValues.some(v => v.optionName === "Size")
//             ) && (
//                     <Box sx={{ mb: 2 }}>
//                         <Typography variant="subtitle2" mb={1}>Select Size:</Typography>
//                         <SizeSelect
//                             selectedSize={selectedVariantValues.Size || ""}
//                             onSizeChange={(value) => onVariantValueChange("Size", value)}
//                             sizes={availableSizes}
//                         />
//                     </Box>
//                 )}

//             {variants.some(variant =>
//                 variant.variantValues.some(v => v.optionName === "Material")
//             ) && (
//                     <Box sx={{ mb: 2 }}>
//                         <Typography variant="subtitle2" mb={1}>Select Material:</Typography>
//                         <MaterialSelect
//                             selectedMaterial={selectedVariantValues.Material || ""}
//                             onMaterialChange={(value) => onVariantValueChange("Material", value)}
//                             materials={availableMaterials}
//                         />
//                     </Box>
//                 )}
//         </>
//     )
// }

// export default VariantSelector