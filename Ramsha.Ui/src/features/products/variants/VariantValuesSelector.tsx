
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import ColorSelect from '../../catalog/ColorSelector';
import MaterialSelect from '../../catalog/MaterialSelector';
import SizeSelect from '../../catalog/SizeSelector';
import { usePagedParams } from '../../../app/hooks/routeHooks';
import { SelectableVariant } from '../../../app/models/products/product';
import AppDialog from '../../../app/components/AppDialog';



type Props = {
    variants: SelectableVariant[],
    availableOptionsNames: string[],
    open: boolean,
    onApply?: (variantId?: string) => void
    onClose: () => void

}

const VariantValuesSelector = ({ variants, availableOptionsNames, open, onApply, onClose }: Props) => {
    const [tempVariantParams, setTempVariantParams] = useState({} as { [key: string]: string });
    const [params, setParams] = usePagedParams()
    const { variantId } = params

    const initial = useRef(true)

    useEffect(() => {
        if (initial.current) {
            let initialVariant = variants.find(x => x.id === variantId);
            if (!initialVariant) {
                initialVariant = variants[0]
            }
            console.log('variantParams else con', variants[0])
            const initialValues = initialVariant.variantValues.reduce((acc, value) => {
                return { ...acc, [value.optionName]: value.valueName };
            }, {});
            console.log('variantParams else con initialValues', initialValues)

            setParams({
                variantId: initialVariant.id
            });
            setTempVariantParams(initialValues)
            initial.current = false;
        }

    }, [variants, open]);

    const handleVariantValueChange = (optionName: string, value: string) => {
        const newSelectedValues = {
            ...tempVariantParams,
            [optionName]: value,
        };

        setTempVariantParams(newSelectedValues);
    };

    const handleApplyVariant = () => {
        const matchedVariant = variants.find(variant =>
            variant.variantValues.every(v => tempVariantParams[v.optionName] === v.valueName)
        );

        if (matchedVariant) {
            setParams({
                variantId: matchedVariant.id
            });
        }

        if (onApply) {
            onApply(matchedVariant?.id)
        }
        onClose()
    };


    const getAvailableOptions = (optionName: string, dependencies: string[]): string[] => {
        const availableValues = variants
            .filter(variant =>
                dependencies.every(dep =>
                    variant.variantValues.some(v => v.optionName === dep && v.valueName === tempVariantParams[dep])
                )
            )
            .flatMap(variant =>
                variant.variantValues.filter(v => v.optionName === optionName).map(v => v.valueName)
            );

        return Array.from(new Set(availableValues));
    };

    const availableOptions = useMemo(() => {
        return availableOptionsNames.reduce((acc: { [key: string]: string[] }, optionName) => {
            const dependencies = availableOptionsNames.slice(0, availableOptionsNames.indexOf(optionName));
            acc[optionName] = getAvailableOptions(optionName, dependencies);
            return acc;
        }, {});
    }, [availableOptionsNames, tempVariantParams]);



    return (
        <>
            <AppDialog
                actions={
                    <>
                        <Button onClick={onClose} color="secondary">Cancel</Button>
                        <Button onClick={handleApplyVariant} color="primary">Apply</Button>
                    </>

                }
                title='Select Product Variant'
                open={open} onClose={onClose}
                maxWidth="md"
            >
                {availableOptionsNames.map((optionName, index) => (
                    <Box key={optionName} sx={{ mb: index < availableOptionsNames.length - 1 ? 2 : 0 }}>
                        <Typography variant="subtitle2" mb={1}>Select {optionName}</Typography>
                        {optionName === 'Color' && (
                            <>
                                <ColorSelect
                                    selectedColor={tempVariantParams[optionName] || ''}
                                    onColorChange={(value) => handleVariantValueChange(optionName, value)}
                                    colors={availableOptions[optionName]}
                                />

                            </>
                        )}
                        {optionName === 'Size' && (
                            <SizeSelect
                                selectedSize={tempVariantParams[optionName] || ''}
                                onSizeChange={(value) => handleVariantValueChange(optionName, value)}
                                sizes={availableOptions[optionName]}
                            />
                        )}
                        {optionName === 'Material' && (
                            <MaterialSelect
                                selectedMaterial={tempVariantParams[optionName] || ''}
                                onMaterialChange={(value) => handleVariantValueChange(optionName, value)}
                                materials={availableOptions[optionName]}
                            />
                        )}
                    </Box>

                ))}
            </AppDialog>
        </>
    )
}

export default VariantValuesSelector
