import { FieldArray, FieldValues, FormProvider, useForm } from 'react-hook-form';
import AppTextInput from '../../../app/components/AppTextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { addSupplyRequestItemFormSchema } from './schemas';
import { DevTool } from '@hookform/devtools';
import { useAddOrUpdateSupplyItem } from '../../../app/hooks/supplierHooks';
import ApiValidationError from '../../../app/utils/appError';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { SupplyRequestItem } from '../../../app/models/suppliers/supplyRequest';


type Props = {
    onSubmitComplete?: () => void
    item?: SupplyRequestItem
    productId?: string
    productVariantId?: string | null
}


const SupplyRequestItemForm = ({ onSubmitComplete, productVariantId, productId, item }: Props) => {

    const { addOrUpdateItem, addItemError } = useAddOrUpdateSupplyItem()

    const methods = useForm<FieldValues>({
        defaultValues: {
            variantValues: {},
            wholesalePrice: item ? item.wholesalePrice.toString() : '0',
            quantity: item ? item.quantity.toString() : '5'
        },
        resolver: zodResolver(addSupplyRequestItemFormSchema),
        mode: 'onChange'
    });

    const { control, setError, formState: { isSubmitting } } = methods

    const handleSubmission = async (data: any) => {
        console.log('data of supply item: ', data)
        await addOrUpdateItem({ ...data, productVariantId, productId })

        onSubmitComplete && onSubmitComplete()
    }

    useEffect(() => {
        if (addItemError && addItemError instanceof ApiValidationError) {
            addItemError.errors.forEach(err => {
                if (err.fieldName) {
                    setError(err.fieldName, {
                        type: 'manual',
                        message: err.description || 'Unknown error occurred',
                    }, { shouldFocus: true });
                }
            });
        }
    }, [addItemError, setError])


    return (
        <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(handleSubmission)}>
                <AppTextInput
                    fullWidth
                    label='Price'
                    name='wholesalePrice'
                    type="number"
                    control={control}
                    sx={{ mb: 2 }}
                />
                <AppTextInput
                    fullWidth
                    label='Quantity'
                    name='quantity'
                    type="number"
                    control={control}
                    sx={{ mb: 2 }}
                />
                <LoadingButton loading={isSubmitting} size='small' variant='contained' sx={{ borderRadius: 20, color: 'text.primary' }} type="submit">{item ? 'Save' : 'Add'}</LoadingButton>
            </form>
            <DevTool control={methods.control} />
        </FormProvider>
    )
}

export default SupplyRequestItemForm