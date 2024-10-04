import { useMutation } from "@tanstack/react-query"
import { accountService } from "../api/services/accountService"
import { toast } from "sonner"
import { Account, loginRequest } from "../models/account"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useTranslation } from "react-i18next"

export const useLogOut = () => {
    const navigate = useNavigate()
    const { clearAccount } = useAuthStore()
    const { mutateAsync } = useMutation({
        mutationFn: async () => await accountService.logout(),
        onSuccess: () => {
            clearAccount()
            navigate('/')
        }
    });

    return {
        logoutUser: mutateAsync
    }
}


export const useRegister = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { mutateAsync } = useMutation<Account, Error, any>({
        mutationFn: async (data: any) => await accountService.register(data),
        onError: () => toast.error("could not register"),
        onSuccess: () => {
            navigate('/', { replace: true })
            return toast(t('register_success_message'))
        }
    })

    return {
        registerUser: mutateAsync
    }
}

type AccountResponseHandleModel = {
    role: 'Customer' | 'Supplier' | 'SuperAdmin' | 'Admin',
    directionRoute: string,


}

// const accountResponseHandleModel: AccountResponseHandleModel[] = [
//     {
//         role: 'Customer',
//         directionRoute: '/',
//     },
//     {
//         role: 'Supplier',
//         directionRoute: '/supplier-dashboard',
//     },
//     {
//         role: 'SuperAdmin',
//         directionRoute: '/admin-dashboard',
//     },
//     {
//         role: 'Admin',
//         directionRoute: '/admin-dashboard',
//     },
// ]






export const useLogin = () => {


    const navigate = useNavigate()
    const location = useLocation()
    const { setAccount } = useAuthStore()
    const from = location.state?.from?.pathname || '/'
    const { t } = useTranslation()


    const { mutateAsync } = useMutation<Account, Error, loginRequest>({
        mutationFn: async (data: loginRequest) => await accountService.login(data),
        onError: () => toast.error("could not login"),
        onSuccess: (account) => {
            setAccount(account)
            navigate(from, { replace: true })
            return toast(t('welcome_message', { name: account.email }))
        }
    })

    return {
        login: mutateAsync
    }
}




