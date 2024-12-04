import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { accountService } from "../api/services/accountService"
import { ACCOUNT_QUERY_KEY, BASKET_QUERY_KEY } from "../constants/queriesKey"
import { Account, Address, loginRequest } from "../models/account"



export const useVerifyEmail = (email: string, token: string) => {

    const { isSuccess, isPending, isError } = useQuery({
        queryKey: ["verifyEmail", email],
        enabled: !!(email && token),
        queryFn: async () => await accountService.verifyEmail(email, token),
        meta: {
            errorMessage: "error"
        }
    })

    return {
        isSuccess,
        isPending,
        isError
    }
}

export const useSendConfirmEmail = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (userEmail: string) => await accountService.sendConfirmEmail(userEmail),
        onError: () => toast.error('some_thing_went_wrong'),
        onSuccess: () => toast.success('confirm_link_sent_success')
    })

    return {
        send: mutateAsync,
        isPending
    }
}

export const useLogOut = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutateAsync } = useMutation({
        mutationFn: async () => await accountService.logout(),
        onSuccess: () => {
            queryClient.setQueryData([ACCOUNT_QUERY_KEY], null);
            queryClient.removeQueries({ queryKey: [BASKET_QUERY_KEY] })
            navigate('/')
        }
    });

    return {

        logoutUser: mutateAsync
    }
}

export const useUpdateAddress = () => {
    const { mutateAsync } = useMutation({
        mutationFn: async (address: Address) => await accountService.updateAddress(address)
    })

    return {
        updateAddress: mutateAsync
    }
}


export const useRegister = () => {
   // const navigate = useNavigate()
    const { t } = useTranslation()

    const { mutateAsync, isSuccess } = useMutation({

        mutationFn: async (data: any) => await accountService.register(data),
        onError: () => toast.error("could not register"),
        onSuccess: (account) => {
            // navigate('/', { replace: true })
            return toast(t('register_success_message'))
        }
    })

    return {
        registerUser: mutateAsync,
        isSuccess
    }
}


export const useLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const { t } = useTranslation()
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation<any, Error, loginRequest>({
        mutationFn: async (data: loginRequest) => await accountService.login(data),
        onError: () => toast.error("could not login"),
        onSuccess: (res) => {
            const { basket, ...account } = res
            queryClient.setQueryData([ACCOUNT_QUERY_KEY], account)
            if (basket) {
                queryClient.setQueryData([BASKET_QUERY_KEY], basket)
            }
            navigate(from, { replace: true })
            return toast(t('welcome_message', { name: account.email }))
        }
    })

    return {
        login: mutateAsync
    }
}


export const useAccount = () => {
    const queryClient = useQueryClient()

    const { data: account } = useQuery<Account>({
        queryKey: [ACCOUNT_QUERY_KEY],
        enabled: false,
        initialData: () => queryClient.getQueryData([ACCOUNT_QUERY_KEY]),
    });

    return {
        account
    }
}





