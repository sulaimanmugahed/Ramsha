
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AppTextInput from "../../app/components/AppTextInput";


export const ContactForm = () => {

    const { handleSubmit, formState: { errors }, reset, control } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    })



    const { t } = useTranslation()


    const onSubmit = (data: any) => {


    }
    return (

        <Box noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} component={'form'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                direction: 'rtl'
            }}>
            <AppTextInput
                label={t('name')}
                name="name"
                control={control}
                fullWidth
            />
            <AppTextInput
                label={t('email')}
                name="email"
                control={control}
                fullWidth />


            <AppTextInput
                label={t('subject')}
                name="subject"
                control={control}
                fullWidth />

            <AppTextInput
                rows={5}
                label={t('message')}
                name="message"
                control={control} fullWidth
            />


            <LoadingButton loading={false} type="submit" size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'inherit' }}>{t('send-email')}</LoadingButton>
        </Box>


    )
}
