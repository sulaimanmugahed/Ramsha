import { FormProvider, useForm } from "react-hook-form"
import { SupplierVariant } from "../../../../app/models/suppliers/supplierProduct"
import { DevTool } from "@hookform/devtools"
import SupplierVariantFormField from "./SupplierVariantFormField"
import LoadingButton from "@mui/lab/LoadingButton"
import { useAddVariant, useUpdateMyVariant } from "../../../../app/hooks/supplierHooks"
import { useUploadFiles } from "../../../../app/hooks/storageHooks"
import { UploadResponse } from "../../../../app/models/common/commonModels"



type Props = {
    variant?: SupplierVariant
    productId: string
    productVariantId: string;
    onSubmitComplete?: () => void

}

const SupplierVariantForm = ({ variant, onSubmitComplete, productId, productVariantId }: Props) => {

    const form = useForm({
        defaultValues: {
            description: variant?.description,
            wholesalePrice: variant?.wholesalePrice,
            variantImages: variant?.variantImages?.map(x => ({ preview: x.url })) || [],
        }
    })

    const { updateVariant } = useUpdateMyVariant(productId!, productVariantId!)
    const { addVariant } = useAddVariant()
    const { upload } = useUploadFiles()

    const { control, handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: any) => {
        const { variantImages, ...others } = data

        let variantImagesToAdd: UploadResponse[] = []

        if (variantImages && variantImages.length > 0) {
            const newImageFiles = variantImages.filter((i: any) => i.file)
                .map((x: any) => x.file as File);

            if (newImageFiles.length > 0)
                variantImagesToAdd = await upload({ files: newImageFiles, path: 'variants' })
        }

        if (variant) {
            const existVariantImages = variant?.variantImages
            const variantImagesUrlToRemove = existVariantImages
                ?.filter(vi => !variantImages?.some((uvi: any) => uvi.preview === vi.url))
                ?.map(vi => vi.url);
            await updateVariant({ ...others, variantImagesToAdd, variantImagesUrlToRemove })
        } else {
            await addVariant({
                productId,
                productVariantId,
                variantImagesToAdd,
                ...others
            })
        }

        onSubmitComplete && onSubmitComplete()
    }


    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SupplierVariantFormField />
                <LoadingButton loading={isSubmitting} size='small' variant='contained' sx={{ borderRadius: 20, color: 'text.primary' }} type="submit">{variant ? 'Save' : 'Add'}</LoadingButton>
            </form>
            <DevTool control={control} />
        </FormProvider>
    )
}

export default SupplierVariantForm