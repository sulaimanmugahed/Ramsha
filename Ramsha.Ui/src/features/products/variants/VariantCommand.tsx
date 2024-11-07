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


const VariantCommand = ({ variant, onSubmit, availableOptions }: { variant?: ProductVariantDto, onSubmit: (data: any) => void, availableOptions: ProductOption[] }) => {
    const { options } = useOptions()

    const form = useForm<VariantScheme>({
        defaultValues:
        {
            file: null,
            variantValues: variant?.variantValues.reduce((acc, { optionId, optionValueId }) => {
                acc[optionId] = { value: optionValueId };
                return acc;
            }, {} as VariantValues)
        },
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
                <LoadingButton type='submit' loading={isSubmitting}>Save</LoadingButton>
            </form>
            <DevTool control={control} />
        </FormProvider>
    )
}

export default VariantCommand