import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import AppModal from "../../../app/components/AppModal"
import RegisterForm from "./RegisterForm";
import { Box, Typography } from "@mui/material";

const RegisterPage = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        if (location.pathname === '/register') {
            setOpen(true);
        }
    }, [location.pathname]);

    const handleClose = () => {
        setOpen(false);
        navigate(-1)
    }

    return (
        <AppModal
            open={open}
            handleClose={handleClose}
            styles={{ width: { sm: 800 } }}
            title={t('register')}
        >
            <Box sx={{ p: 2 }}>
                <RegisterForm />
                <Typography color={'text.secondary'} variant="body2">{t('have_an_account_message')}
                    <Typography onClick={() => navigate('/login')} color={'primary'} component={'span'}> {t('signIn')}</Typography></Typography>
            </Box>
        </AppModal>
    )
}

export default RegisterPage