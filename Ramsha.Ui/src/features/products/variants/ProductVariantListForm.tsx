import React, { useEffect } from 'react';
import { useFieldArray, useFormContext, FieldError } from 'react-hook-form';
import VariantDialog from './VariantFormDialog';
import { useOptions } from '../../../app/hooks/optionHooks';
import { PreviewVariantType } from '../../../app/models/common/commonModels';
import ProductVariantList from './ProductVariantList';
import { ProductVariantDto } from '../../../app/models/products/product';


const ProductVariantListForm: React.FC = () => {
    const { control, formState: { errors }, setValue, getValues } = useFormContext();
    const { fields: variants, append, remove, update } = useFieldArray({
        control,
        name: 'variants',
    });

    const [dialogState, setDialogState] = React.useState<{ open: boolean; currentVariantIndex: number | null }>({ open: false, currentVariantIndex: null });

    const handleDialogToggle = (isOpen: boolean, index: number | null = null) => {
        if (!isOpen) {
            setDialogState({ open: false, currentVariantIndex: null });
        } else {
            setDialogState({ open: isOpen, currentVariantIndex: index });
        }
    };

    const { options } = useOptions();

    const handleVariantSubmit = () => {
        const variantData = getValues(`variants[${dialogState.currentVariantIndex}]`)
        if (dialogState.currentVariantIndex === null) {
            append(variantData);
        } else {
            const { currentVariantIndex } = dialogState;
            update(currentVariantIndex, variantData)
        }
        handleDialogToggle(false); 
    };


    const asVariantPreview = (variant: any, index: number): PreviewVariantType => {
        return {
            id: index.toString(),
            description: variant.description,
            name: variant.name,
            basePrice: variant.basePrice,
            variantValues: variant.variantValues.map((val: any) => {
                const option = options.find((opt) => opt.id === val.option);
                const valueLabel = option?.values.find((optVal: any) => optVal.id === val.value)?.name || '';
                return {
                    optionName: option?.name,
                    valueName: valueLabel,
                    optionId: val.option,
                    optionValueId: val.value
                };
            }),
            variantImages: variant.variantImages?.map((img: any) => ({ url: img.preview }))
        };
    };


    const handleAdd = () => {
        handleDialogToggle(true, variants.length || 0);
    }

    const onEdit = (variant: PreviewVariantType | ProductVariantDto, index: number) => {
        setValue(`variants[${index}]`, {
            id: variant.id,
            basePrice: variant.basePrice.toString(),
            description: variant.description,
            name: variant.name,
            variantImages: variant.variantImages?.map(x => ({ preview: x.url })),
            variantValues: variant.variantValues.map(x => ({ option: x.optionId, value: x.optionValueId }))
        });
        handleDialogToggle(true, index);
    }

    return (
        <>
            <ProductVariantList
                onAddVariant={handleAdd}
                onDeleteVariant={(_, index) => remove(index)}
                onUpdateVariant={onEdit}
                variants={variants.map((variant: any, index) => asVariantPreview(variant, index))} />

            <VariantDialog
                edit={variants.length !== dialogState.currentVariantIndex}
                open={dialogState.open}
                onClose={() => handleDialogToggle(false)}
                onClick={handleVariantSubmit}
                name={`variants[${dialogState.currentVariantIndex}]`}
            />
        </>
    );
};

export default ProductVariantListForm;
