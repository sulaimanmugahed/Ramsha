import { useNavigate, useParams } from "react-router-dom"
import { ProductVariantDto } from "../../../app/models/products/product"
import VariantCommand from "./VariantCommand"
import { VariantScheme } from "../productFormValidations"
import { Close } from "@mui/icons-material"
import { Box, Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material"
import { useProductVariant, useUpdateVariant } from "../../../app/hooks/productHooks"
import { useUploadFiles } from "../../../app/hooks/storageHooks"
import { UploadResponse } from "../../../app/models/common/commonModels"
const useVariant = (a: string, b: string) => {

    const variant: ProductVariantDto = {} as ProductVariantDto
    return {
        variant
    }
}
const EditVariantPage = () => {
    const { productId, variantId } = useParams()
    if ((!productId || !variantId)) return;

    const { variant } = useProductVariant(productId, variantId)
    const { updateVariant } = useUpdateVariant(productId, variantId)
    const { upload } = useUploadFiles()


    const onSubmit = async (updatedVariantData: VariantScheme) => {

        const { variantValues: updatedVariantValues, variantImages: updatedVariantImages, ...others } = updatedVariantData

        const existVariantValues = variant?.variantValues
        const existVariantImages = variant?.variantImages


        const variantValuesToRemove = existVariantValues
            ?.filter(vv => !updatedVariantValues?.some(uvv => uvv.option === vv.optionId && uvv.value === vv.optionValueId))
            ?.map(vv => ({ option: vv.optionId, value: vv.optionValueId }))

        const variantValuesToAdd = updatedVariantValues.filter(uvv => !existVariantValues
            ?.some(vv => vv.optionId === uvv.option && vv.optionValueId === uvv.value))

        const variantImagesUrlToRemove = existVariantImages
            ?.filter(vi => !updatedVariantImages?.some(uvi => uvi.preview === vi.url))
            ?.map(vi => vi.url);


        let variantImagesToAdd: UploadResponse[] = []

        if (updatedVariantImages && updatedVariantImages.length > 0) {
            const newImageFiles = updatedVariantImages.filter(i => i.file)
                .map(x => x.file as File);
                
            if (newImageFiles.length > 0)
                variantImagesToAdd = await upload({ files: newImageFiles, path: 'variants' })
        }

        const updateRequestData = {
            variantValuesToRemove,
            variantValuesToAdd,
            variantImagesUrlToRemove,
            variantImagesToAdd,
            ...others
        }

        console.log('updateRequestData: ', updateRequestData)

        await updateVariant(updateRequestData)

    }

    const navigate = useNavigate()

    const handleClose = () => {
        navigate(-1)
    }

    return (
        <Dialog
            sx={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                transform: 'none',
            }}
            open
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {'Edit Variant'}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ paddingY: 4, }}>
                <Box sx={{ mt: 4, p: 2 }}>
                    {
                        variant &&
                        <VariantCommand onSubmit={onSubmit} variant={variant} />

                    }

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditVariantPage