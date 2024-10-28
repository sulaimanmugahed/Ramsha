import { useNavigate, useParams } from "react-router-dom"
import { ProductVariantDto } from "../../../app/models/products/product"
import VariantCommand from "./VariantCommand"
import { VariantScheme } from "../productFormValidations"
import { Close } from "@mui/icons-material"
import { Box, Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material"
import { useProductOptions, useProductVariant, useUpdateVariant } from "../../../app/hooks/productHooks"
import { useUploadFile } from "../../../app/hooks/storageHooks"


const EditVariantPage = () => {
    const { productId, variantId } = useParams()
    if ((!productId || !variantId)) return;

    const { variant } = useProductVariant(productId, variantId)
    const { updateVariant } = useUpdateVariant(productId, variantId)

    const { productOptions } = useProductOptions(productId)
    const { upload } = useUploadFile()


    const onSubmit = async (updatedVariantData: VariantScheme) => {

        const { variantValues: updatedVariantValues, file, ...others } = updatedVariantData

        const existVariantValues = variant?.variantValues

        const variantValuesToRemove = existVariantValues
            ?.filter(vv => !updatedVariantValues?.some(uvv => uvv.option === vv.optionId && uvv.value === vv.optionValueId))
            ?.map(vv => ({ option: vv.optionId, value: vv.optionValueId }))

        const variantValuesToAdd = updatedVariantValues.filter(uvv => !existVariantValues
            ?.some(vv => vv.optionId === uvv.option && vv.optionValueId === uvv.value))

        let imageUrl;
        const newFile = file?.file;
        if (newFile) {
            const uploadResponse = await upload({ path: 'products', file: newFile })
            imageUrl = uploadResponse.url
        }


        const updateRequestData = {
            variantValuesToRemove,
            variantValuesToAdd,
            imageUrl,
            ...others
        }


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
                        variant && productOptions &&
                        <VariantCommand availableOptions={productOptions} onSubmit={onSubmit} variant={variant} />

                    }

                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditVariantPage