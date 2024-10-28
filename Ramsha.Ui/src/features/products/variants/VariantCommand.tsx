import React, { useEffect } from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { variantSchema, VariantScheme } from "../../products/productFormValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { ProductOption, ProductVariantDto } from '../../../app/models/products/product';
import ProductVariantForm from './ProductVariantForm';




const VariantCommand = ({ variant, onSubmit, availableOptions }: { variant?: ProductVariantDto, onSubmit: (data: any) => void, availableOptions: ProductOption[] }) => {



    const form = useForm<VariantScheme>({
        defaultValues:
        {
            file: null,
            variantValues: variant?.variantValues?.map(x => ({ option: x.optionId, value: x.optionValueId })) || []
        },
        resolver: zodResolver(variantSchema),
        mode: 'all'
    })

    const { reset, control, formState: { isSubmitSuccessful } } = form

    useEffect(() => {
        if (isSubmitSuccessful)
            reset()
    }, [isSubmitSuccessful])


    return (
        <FormProvider {...form}>
            <ProductVariantForm availableOptions={availableOptions} type='submit' onSubmit={onSubmit} />
            <DevTool control={control} />
        </FormProvider>
    )
}

export default VariantCommand