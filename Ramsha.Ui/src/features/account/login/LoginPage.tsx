// src/pages/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppModal from '../../../app/components/AppModal';
import { LoginForm } from './LoginForm';

const LoginPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (location.pathname === '/login') {
            setOpen(true);
            console.log('lang: ', i18n.resolvedLanguage)
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
            title={t('login')}
        >
            <Box sx={{ p: 2 }}>
                <LoginForm />
                <Typography color={'text.secondary'} variant="body2">{t('you-not-have-account')}
                    <Typography onClick={() => navigate('/register')} color={'primary'} component={'span'}> {t('signUp')}</Typography></Typography>
            </Box>
        </AppModal>
    );
};

export default LoginPage;
