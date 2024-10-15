import { useMutation, useQueryClient } from "@tanstack/react-query"
import { accountService } from "../api/services/accountService"
import { toast } from "sonner"
import { Account, loginRequest } from "../models/account"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useTranslation } from "react-i18next"
import { BASKET_QUERY_KEY } from "../constants/queriesKey"

export const useLogOut = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { clearAccount } = useAuthStore()
    const { mutateAsync } = useMutation({
        mutationFn: async () => await accountService.logout(),
        onSuccess: () => {
            clearAccount()
            queryClient.removeQueries({ queryKey: [BASKET_QUERY_KEY] })
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
        onSuccess: (account) => {
            navigate('/', { replace: true })
            return toast(t('register_success_message'))
        }
    })

    return {
        registerUser: mutateAsync
    }
}


export const useLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setAccount } = useAuthStore()
    const from = location.state?.from?.pathname || '/'
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation<Account, Error, loginRequest>({
        mutationFn: async (data: loginRequest) => await accountService.login(data),
        onError: () => toast.error("could not login"),
        onSuccess: (account) => {
            setAccount(account)
            if (account.basket) {
                queryClient.setQueryData([BASKET_QUERY_KEY], account.basket)
            }
            navigate(from, { replace: true })
            return toast(t('welcome_message', { name: account.email }))
        }
    })

    return {
        login: mutateAsync
    }
}




