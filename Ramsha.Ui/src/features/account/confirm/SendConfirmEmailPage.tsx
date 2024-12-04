import LoadingButton from "@mui/lab/LoadingButton"
import { Box, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"
import { useAccount, useSendConfirmEmail } from "../../../app/hooks/accountHooks"


export const SendConfirmEmailPage = () => {

    const { userEmail } = useParams()
    if (!userEmail) return null;

    const { account } = useAccount()

    const { t } = useTranslation()

    const { send, isPending } = useSendConfirmEmail()

    const handleClick = async () => {
        await send(userEmail)
    }
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
            <Typography color={'text.primary'} variant="h4" gutterBottom component="div">
                {t('confirm_email_message_one')}
            </Typography>
            <Typography sx={{ mb: 2 }} color={'text.secondary'} variant="body1">
                {t('confirm_email_message_tow')}
            </Typography>
            <LoadingButton sx={{ color: 'text.primary' }} loading={isPending} disabled={!!account} onClick={handleClick} variant="contained" color="primary">
                {t('resend')}
            </LoadingButton>
        </Box>


    )
}
