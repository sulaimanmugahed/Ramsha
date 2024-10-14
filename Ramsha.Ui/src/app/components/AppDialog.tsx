import React, { ReactNode } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material/styles";
import AppDynamicBreadcrumb from "./AppDynamicBreadcrumb";

// Define the prop types for the reusable dialog
interface AppDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
    dynamicBreadcrumb?: boolean;
    fullWidth?: boolean;
    maxWidth?: "lg" | "md" | "sm";
    styles?: SxProps<Theme>;
}

// Reusable dialog component
const AppDialog = ({
    open,
    onClose,
    title,
    children,
    actions,
    dynamicBreadcrumb,
    maxWidth = "lg", // default to lg but can be overridden
    styles,
    fullWidth = false, // default fullWidth to false unless specified
}: AppDialogProps) => {
    const theme = useTheme();

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: theme.shape.borderRadius * 1,
                    boxShadow: theme.shadows[10],
                    margin: 0,
                    width: maxWidth === 'md' ? {
                        xs: '90%',
                        sm: '80%',
                        md: '60%',
                        lg: '40%',
                    } : undefined,
                },

                ...styles,
            }}
            open={open}
            onClose={onClose}
        >
            <DialogTitle sx={{ position: "relative", pb: 3 }}>
                {title && <>{title}</>}
                {dynamicBreadcrumb && <AppDynamicBreadcrumb />}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: theme.palette.grey[600],
                        transition: "all 0.3s ease",
                        "&:hover": {
                            color: theme.palette.grey[900],
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
        </Dialog>
    );
};

export default AppDialog;
