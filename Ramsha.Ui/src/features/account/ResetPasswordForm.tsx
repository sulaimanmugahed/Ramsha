import LoadingButton from "@mui/lab/LoadingButton"
import { Box } from "@mui/material"
import { t } from "i18next"
import { FieldValues, useForm } from "react-hook-form"
import AppTextInput from "../../app/components/AppTextInput"
import { useResetPassword } from "../../app/hooks/accountHooks"


type Props = {
    token: string
}

const ResetPasswordForm = ({ token }: Props) => {


    const { handleSubmit,
        control,
        formState: { isSubmitting }
    } = useForm<FieldValues>({
        defaultValues: {
            newPassword: ''
        },
    })

    const { reset } = useResetPassword()

    const onSubmit = async (formData: any) => {
        await reset({ token, newPassword: formData.newPassword })
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
                name='newPassword'
                label={t('newPassword')}
                type='password'
                control={control}
                fullWidth
            />

            <LoadingButton loading={isSubmitting} type='submit' size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary' }}>{t('reset')}</LoadingButton>
        </Box>
    )
}

export default ResetPasswordForm;
