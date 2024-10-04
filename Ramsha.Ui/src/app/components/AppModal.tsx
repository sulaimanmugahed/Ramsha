import React from 'react';
import { Box, Modal, Typography, IconButton, SxProps, Theme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the style for the modal container
const defaultStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

interface CustomModalProps {
    open: boolean;
    handleClose: () => void;
    title?: string;
    children: React.ReactNode;
    actions?: React.ReactNode;
    styles?: SxProps<Theme>
}

const AppModal: React.FC<CustomModalProps> = ({
    open,
    handleClose,
    title,
    children,
    actions,
    styles
}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="custom-modal-title"
            aria-describedby="custom-modal-description"
        >
            <Box sx={{ ...defaultStyle, ...styles }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {title && (
                        <Typography id="custom-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                    )}
                    <IconButton type='button' onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box id="custom-modal-description" sx={{ mt: 2 }}>
                    {children}
                </Box>
                {actions && (
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        {actions}
                    </Box>
                )}
            </Box>
        </Modal >
    );
};

export default AppModal;
