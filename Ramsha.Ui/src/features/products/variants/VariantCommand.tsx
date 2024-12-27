import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { useOptions } from "../../../app/hooks/optionHooks";
import { ProductOption, ProductVariantDto } from '../../../app/models/products/product';
import { variantSchema, VariantScheme } from "../../products/productFormValidations";
import ProductVariantForm from './ProductVariantFormField';

interface VariantValues {
    [key: string]: {
        value: string;
    };
}


const VariantCommand = ({ variant, onSubmit, availableOptions, defaultVariant }: { defaultVariant?: ProductVariantDto, variant?: ProductVariantDto, onSubmit: (data: any) => void, availableOptions: ProductOption[] }) => {
    const { options } = useOptions()

    const defaultValues = !variant && defaultVariant ? {
        file: {
            preview: defaultVariant.imageUrl || null,
            file: null
        },
        weight: defaultVariant.weight.toString(),
        height: defaultVariant.dimensions.height.toString(),
        width: defaultVariant.dimensions.width.toString(),
        length: defaultVariant.dimensions.length.toString(),
        variantValues: defaultVariant.variantValues.reduce((acc, { optionId, optionValueId }) => {
            acc[optionId] = { value: optionValueId };
            return acc;
        }, {} as VariantValues)

    }
        : {
            file: {
                preview: variant?.imageUrl || null,
                file: null
            },
            weight: variant?.weight?.toString() || '0',
            height: variant?.dimensions?.height?.toString() || '0',
            width: variant?.dimensions?.width?.toString() || '0',
            length: variant?.dimensions?.length?.toString() || '0',
            variantValues: variant?.variantValues.reduce((acc, { optionId, optionValueId }) => {
                acc[optionId] = { value: optionValueId };
                return acc;
            }, {} as VariantValues)
        }

    const form = useForm<VariantScheme>({
        defaultValues,
        resolver: zodResolver(variantSchema),
        mode: 'all'
    })

    const { reset, control, formState: { isSubmitSuccessful, isSubmitting }, handleSubmit } = form

    useEffect(() => {
        if (isSubmitSuccessful)
            reset()
    }, [isSubmitSuccessful])


    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ProductVariantForm availableOptions={options.filter(o => availableOptions.some(x => x.id === o.id))} />
                <LoadingButton sx={{ mt: 4 }} type='submit' loading={isSubmitting}>Save</LoadingButton>
            </form>
            <DevTool control={control} />
        </FormProvider>
    )
}

export default VariantCommand