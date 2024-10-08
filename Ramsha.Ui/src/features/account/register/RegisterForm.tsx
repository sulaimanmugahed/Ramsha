import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Chip, Grid } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { registerFormValidation } from './registerFormValidation'
import { useRegister } from '../../../app/hooks/accountHooks'
import AppTextInput from '../../../app/components/AppTextInput'
import { useTranslation } from 'react-i18next'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'


const registrationRoles = [
    {
        label: 'Customer',
        value: 'customers'
    },
    {
        label: 'Supplier',
        value: 'suppliers'
    },
]



const RegisterForm = () => {
    const [who, setWho] = useState<string>('customers');
    const { t } = useTranslation()

    const handleWho = (roleValue: string) => {
        setWho(roleValue)
    }

    const { registerUser } = useRegister()

    const { handleSubmit, control, formState: { isSubmitting } } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(registerFormValidation)
    })

    const onSubmit = async (userData: FieldValues) => {
        await registerUser({ ...userData, who })
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
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
                backgroundColor: 'background.default',
                borderRadius: 30,
                mb: 4
            }}>
                {
                    registrationRoles?.map(role => (
                        <Button
                            color={who === role.value ? 'primary' : 'inherit'}
                            variant={who === role.value ? 'contained' : 'text'}
                            sx={{ width: 250, borderRadius: 30 }}
                            onClick={() => handleWho(role.value)}
                        >{role.label}</Button>
                    ))
                }
            </Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='firstName'
                        fullWidth
                        label={t('firstName')}
                    />
                </Grid>

                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='lastName'
                        label={t('lastName')}
                        fullWidth
                    />
                </Grid>

                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='username'
                        label={t('username')}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='email'
                        label={t('email')}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='password'
                        label={t('password')}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={6}>
                    <AppTextInput
                        control={control}
                        name='confirmPassword'
                        label={t('confirmPassword')}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <LoadingButton loading={isSubmitting} type='submit' size='large' variant='contained' sx={{ borderRadius: '30px', width: '180px', color: 'text.primary', alignSelf: 'start', mb: 2 }}>{t('register')}</LoadingButton>

        </Box>
    )
}

export default RegisterForm