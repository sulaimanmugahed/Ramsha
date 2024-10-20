import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { ProductVariantDto, SelectableVariant } from '../../../app/models/products/product'
import LoadingButton from '@mui/lab/LoadingButton'
import { DevTool } from '@hookform/devtools'
import VariantSelector from '../../catalog/VariantSelector'
import { usePagedParams } from '../../../app/hooks/routeHooks'



type Props = {
    variants?: SelectableVariant[],
    optionNames?: string[],
    onSubmit: (selectedVariant: SelectableVariant | undefined) => void,
    setPageParams?: boolean
}
const VariantSelectorForm = ({ variants, onSubmit, optionNames, setPageParams }: Props) => {
    const [params, setParams] = usePagedParams()
    const { variantParams, variantId } = params

    const methods = useForm<FieldValues>({
        defaultValues: {
            variantValues: variantParams
        }
    })

    const handleSubmission = (data: any) => {
        const { variantValues } = data
        const matchedVariant = variants?.find(variant =>
            variant.variantValues.every(v => variantValues[v.optionName] === v.valueName)
        );

      
        onSubmit(matchedVariant)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmission)}>
                {
                    variants && optionNames && (
                        <VariantSelector
                            options={optionNames}
                            variants={variants}
                        />
                    )
                }
                <LoadingButton type="submit">Apply</LoadingButton>
            </form>
            <DevTool control={methods.control} />
        </FormProvider>
    )
}

export default VariantSelectorForm