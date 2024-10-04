// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AppModal from '../../../app/components/AppModal';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        if (location.pathname === '/login') {
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
            title={t('login')}
        >
            <Box sx={{ p: 2 }}>
                <LoginForm />
                <Typography color={'text.secondary'} variant="body2">{t('have_an_account_message')}
                    <Typography onClick={() => navigate('/register')} color={'primary'} component={'span'}> {t('signUp')}</Typography></Typography>
            </Box>
        </AppModal>
    );
};

export default LoginPage;
