import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box } from '@mui/material';
import ProductVariantForm from './ProductVariantForm';
import { Close } from '@mui/icons-material';
import { ProductOption } from '../../../app/models/products/product';


interface VariantDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
    onClick?: () => void
    edit?: boolean
    name?: string
    type?: 'button' | 'submit'
    availableOptions: ProductOption[]
}

const VariantFormDialog: React.FC<VariantDialogProps> = ({ type = 'button', name, open, onClose, onSubmit, edit, onClick, availableOptions }) => {




    return (
        <Dialog
            sx={{
                position: 'absolute',
                bottom: '10%',
                left: '10%',
                transform: 'none',
            }}
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                {edit ? 'Edit Variant' : 'Add Variant'}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                    <ProductVariantForm availableOptions={availableOptions} type={type} name={name} onSubmit={onSubmit} onClick={onClick} />
                </Box>
            </DialogContent>

        </Dialog>
    );
};

export default VariantFormDialog;
