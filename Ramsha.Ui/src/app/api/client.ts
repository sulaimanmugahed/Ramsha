import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { router } from "../router/Routes";
import { toast } from "sonner";
import { PaginationResponse } from "../models/common/commonModels";
import { sleep } from "../utils/util";
import { queryClient } from "../providers/AppQueryProvider";
import { ACCOUNT_QUERY_KEY, BASKET_QUERY_KEY } from "../constants/queriesKey";
import { Account } from "../models/account";


export const refresh = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/account/refresh`,
            {},
            { withCredentials: true }
        );
        const responseAccount = response.data.data;

        const { basket, ...account } = responseAccount;
        setTokenToHeader(account.accessToken)
        queryClient.setQueryData([ACCOUNT_QUERY_KEY], account)

        queryClient.setQueryData([BASKET_QUERY_KEY], basket)
        return account.accessToken;
    } catch (error) {
        queryClient.setQueryData([ACCOUNT_QUERY_KEY], null)
        throw error;
    }
}


interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
}

export const client = (() => {
    const client = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    })


    client.interceptors.request.use(
        async (config: CustomAxiosRequestConfig) => {

            const account = queryClient.getQueryData([ACCOUNT_QUERY_KEY]) as Account;
            const accessToken = account?.accessToken;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        async (response) => {

            if (import.meta.env.DEV)
                await sleep(2000);
            const pagination = response.headers['pagination']
            if (pagination) {
                response.data.data = new PaginationResponse(response.data.data, JSON.parse(pagination));
                console.log('paginationMeta ', pagination)
                return response.data;
            }
            return response.data;
        },
        async (error: AxiosError) => {
            const { data, status } = error.response as AxiosResponse


            const originalRequest = error.config as CustomAxiosRequestConfig;

            if (status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return client(originalRequest);
                    }).catch((err) => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newAccessToken = await refresh();
                    processQueue(null, newAccessToken);
                    return client(originalRequest);
                } catch (refreshError: any) {
                    processQueue(refreshError, null);
                    router.navigate('/login', { replace: true });
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }


            switch (status) {
                case 400:
                    if (data.errors) {
                        const modelStateErrors: string[] = []
                        for (const key in data.errors) {
                            if (data.errors[key]) {
                                modelStateErrors.push(data.error[key])
                            }
                        }
                        throw modelStateErrors.flat();
                    }
                    toast.error(data.title);
                    break;
                case 404:
                    router.navigate('/not-found', { replace: true });
                    break;
                case 401:
                    toast.error(data?.title || 'UnAuthorized');
                    break;
                case 403:
                    toast.error('You are not allowed to do that');
                    break;
                case 500:
                    router.navigate('/server-error', { state: { error: data } });
                    break;
                default: break;


            }
            return Promise.reject(error.response);
        }
    )

    return client;
})()


export const setTokenToHeader = (token: string) => {
    console.log("setToheder ", token)
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

