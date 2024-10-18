import VariantSelector from '../../catalog/VariantSelector';
import { FieldArray, FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ProductVariantDto } from '../../../app/models/products/product';
import AppTextInput from '../../../app/components/AppTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSupplyRequestItemFormSchema } from './schemas';
import AppFormError from '../../../app/components/AppFormError';
import { DevTool } from '@hookform/devtools';
import { useAddSupplyItem } from '../../../app/hooks/supplierHooks';


type Props = {
    variants: ProductVariantDto[],
    optionNames: string[],
    productId: string,
    onSubmitComplete: () => void
}


const AddSupplyRequestItemForm = ({ optionNames, variants, onSubmitComplete, productId }: Props) => {

    const { addItem } = useAddSupplyItem()

    const methods = useForm<FieldValues>({
        defaultValues: {
            variantValues: {},
            wholesalePrice: '0',
            quantity: '5'
        },
        resolver: zodResolver(addSupplyRequestItemFormSchema)
    });


    const { control, setError, formState: { errors } } = methods

    const handleSubmission = async (data: any) => {
        console.log('data of supply item: ', data)
        const { variantValues, ...others } = data
        const matchedVariant = variants.find(variant =>
            variant.variantValues.every(v => variantValues[v.optionName] === v.valueName)
        );
        if (!matchedVariant) {
            setError("variantValues", { message: 'no variant available with this options' })
            return
        }

        await addItem({ ...others, productVariantId: matchedVariant.id, productId })

        onSubmitComplete()
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmission)}>
                <VariantSelector
                    options={optionNames}
                    variants={variants}
                />
                <AppFormError errors={errors} name='variantValues' />

                <AppTextInput
                    label='Price'
                    name='wholesalePrice'
                    type="number"
                    control={control}
                />
                <AppTextInput
                    label='Quantity'
                    name='quantity'
                    type="number"
                    control={control}
                />
                <button type="submit">Submit</button>
            </form>
            <DevTool control={methods.control} />
        </FormProvider>
    )
}

export default AddSupplyRequestItemForm