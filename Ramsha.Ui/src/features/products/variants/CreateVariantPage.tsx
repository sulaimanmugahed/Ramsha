import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import VariantCommand from './VariantCommand';
import { useNavigate, useParams } from 'react-router-dom';
import { VariantScheme } from '../productFormValidations';
import { UploadResponse } from '../../../app/models/common/commonModels';
import { useUploadFiles } from '../../../app/hooks/storageHooks';
import { useAddVariant } from '../../../app/hooks/productHooks';


const CreateVariantPage = () => {

    const { productId } = useParams()
    if (!productId) return;

    const { addVariant } = useAddVariant()

    const { upload } = useUploadFiles()

    const navigate = useNavigate()

    const handleClose = () => {
        navigate(-1)
    }

    const onSubmit = async (variant: VariantScheme) => {

        const { variantImages, ...others } = variant
        let uploadedImages: UploadResponse[] = []
        const files = variantImages?.map(x => x.file as File);
        if (files)
            uploadedImages = await upload({ path: 'variants', files });

        await addVariant({ data: { ...others, variantImages: uploadedImages }, productId })
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
                    <VariantCommand onSubmit={onSubmit} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CreateVariantPage;
