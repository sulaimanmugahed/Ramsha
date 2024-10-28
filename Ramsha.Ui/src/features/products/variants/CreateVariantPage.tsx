import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import VariantCommand from './VariantCommand';
import { useNavigate, useParams } from 'react-router-dom';
import { VariantScheme } from '../productFormValidations';
import { UploadResponse } from '../../../app/models/common/commonModels';
import { useUploadFile } from '../../../app/hooks/storageHooks';
import { useAddVariant, useProductOptions } from '../../../app/hooks/productHooks';


const CreateVariantPage = () => {

    const { productId } = useParams()
    if (!productId) return;

    const { addVariant } = useAddVariant()
    const { productOptions } = useProductOptions(productId)

    const { upload } = useUploadFile()

    const navigate = useNavigate()

    const handleClose = () => {
        navigate(-1)
    }

    const onSubmit = async (variant: VariantScheme) => {

        const { file, ...others } = variant
        let imageUrl = file?.preview
        const newFile = file?.file
        if (newFile) {
            const uploadResponse = await upload({ path: 'products', file: newFile })
            imageUrl = uploadResponse.url
        }

        await addVariant({ data: { ...others, imageUrl }, productId })
        handleClose()
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
                {'Add Variant'}
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
                        productOptions &&
                        <VariantCommand availableOptions={productOptions} onSubmit={onSubmit} />
                    }
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CreateVariantPage;
