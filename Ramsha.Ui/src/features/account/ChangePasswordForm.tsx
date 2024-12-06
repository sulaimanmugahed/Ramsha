import LoadingButton from "@mui/lab/LoadingButton"
import { Box } from "@mui/material"
import { t } from "i18next"
import { FieldValues, useForm } from "react-hook-form"
import AppTextInput from "../../app/components/AppTextInput"
import { useChangePassword } from "../../app/hooks/accountHooks"

export const ChangePasswordForm = () => {

    const { handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<FieldValues>({
        defaultValues: {
            currentPassword: '',
            newPassword: ''
        },
    })


    const { change } = useChangePassword()


    const onSubmit = async (formData: any) => {
        await change(formData)
    }

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            component={'form'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
            }}>

            <AppTextInput
                name='currentPassword'
                label={t('currentPassword')}
                type='password'
                control={control}
                fullWidth
            />
            <AppTextInput
                name='newPassword'
                label={t('newPassword')}
                type='password'
                control={control}
                fullWidth
            />

            <LoadingButton loading={isSubmitting} type='submit' size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary' }}>{t('change')}</LoadingButton>

        </Box>
    )
}
