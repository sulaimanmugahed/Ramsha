import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSendResetPasswordEmail } from "../../app/hooks/accountHooks";

const SendResetPasswordEmail = () => {
    const { t } = useTranslation()

    const { send, isPending } = useSendResetPasswordEmail()

    const handleClick = async () => {
        await send()
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
            <Typography color={'text.primary'} variant="h4" gutterBottom component="div">
                {t('reset_password_message_one')}
            </Typography>
            <Typography sx={{ mb: 2 }} color={'text.secondary'} variant="body1">
                {t('reset_password_email_message_tow')}
            </Typography>
            <LoadingButton sx={{ color: 'text.primary' }} loading={isPending} onClick={handleClick} variant="contained" color="primary">
                {t('resend')}
            </LoadingButton>
        </Box>
    )
}

export default SendResetPasswordEmail


