import { FieldValues, useForm } from "react-hook-form"
import AppTextInput from "../../../app/components/AppTextInput"
import { Box } from "@mui/material"
import { useLogin } from "../../../app/hooks/accountHooks"
import { useTranslation } from "react-i18next"
import { loginFormValidation } from "./loginFormValidation"
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequest } from "../../../app/models/account"
import LoadingButton from '@mui/lab/LoadingButton';





export const LoginForm = () => {
    const loginForm = useForm<FieldValues>({
        defaultValues: {
            username: 'SuperAdmin',
            password: 'Sulaiman@12345'
        },
        resolver: zodResolver(loginFormValidation)
    })

    const {
        handleSubmit,
        control,
        formState: { isSubmitting }
    } = loginForm


    const { login } = useLogin()

    const onSubmit = async (formData: FieldValues) => {
        await login(formData as loginRequest)
    }

    const { t } = useTranslation()

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
                label={t('username')}
                control={control}
                name="username"
                fullWidth
            />
            <AppTextInput
                name='password'
                label={t('password')}
                type='password'
                control={control}
                fullWidth
            />

            <LoadingButton loading={isSubmitting} type='submit' size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary' }}>{t('login')}</LoadingButton>

        </Box>

    )
}


