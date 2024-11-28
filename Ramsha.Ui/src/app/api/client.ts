import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ACCOUNT_QUERY_KEY } from "../constants/queriesKey";
import { Account } from "../models/account";
import { BaseResult, PaginationResponse } from "../models/common/commonModels";
import { queryClient } from "../providers/AppQueryProvider";
import { router } from "../router/Routes";
import { sleep } from "../utils/util";

export const refresh = async () => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/account/refresh`,
            {},
            { withCredentials: true }
        );
        const responseAccount = response.data.data;

        const { basket, ...account } = responseAccount;
        setTokenToHeader(account.accessToken);
        queryClient.setQueryData([ACCOUNT_QUERY_KEY], account);
        //  queryClient.setQueryData([BASKET_QUERY_KEY], basket);
        return account.accessToken;
    } catch (error) {
        queryClient.setQueryData([ACCOUNT_QUERY_KEY], null);
        throw error;
    }
};

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
};

const client = (() => {
    const clientInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });

    clientInstance.interceptors.request.use(
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

    clientInstance.interceptors.response.use(
        async (response: AxiosResponse<BaseResult<any>>) => {
            if (import.meta.env.DEV) await sleep(4000);

            const pagination = response.headers['pagination'];
            if (pagination) {
                response.data.data = new PaginationResponse(response.data.data, JSON.parse(pagination));
                console.log('paginationMeta ', pagination);
            }

            return response;
        },
        async (error: AxiosError) => {
            const { data, status } = error.response as AxiosResponse;

            console.log("error data from client:  ", data);
            const originalRequest = error.config as CustomAxiosRequestConfig;

            if (status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return clientInstance(originalRequest);
                    }).catch((err) => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newAccessToken = await refresh();
                    processQueue(null, newAccessToken);
                    return clientInstance(originalRequest);
                } catch (refreshError: any) {
                    processQueue(refreshError, null);
                    router.navigate('/login', { replace: true });
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error)
        }
    );

    return clientInstance;
})();

export const setTokenToHeader = (token: string) => {
    console.log("setToheader ", token);
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default client;
