import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AppModal from "../../../app/components/AppModal";
import { ChangePasswordForm } from "../../account/ChangePasswordForm";

const ChangePasswordModal = () => {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
    const { t } = useTranslation()



    const handleClose = () => {
        setOpen(false);
        navigate(-1)
    }
    return (
        <AppModal
            open={open}
            handleClose={handleClose}
            title={t('change-password')}
        >
            <Box sx={{ p: 2 }}>
                <ChangePasswordForm />
                <Typography color={'text.secondary'} variant="body2">{t('forgot_Password_message')}
                    <Typography onClick={() => navigate('/send-reset-password-email')} color={'primary'} component={'span'}> {t('reset')}</Typography></Typography>
            </Box>
        </AppModal>
    )
}

export default ChangePasswordModal