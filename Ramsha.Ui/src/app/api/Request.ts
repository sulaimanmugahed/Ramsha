import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseResult, BaseError } from '../models/common/commonModels';
import ApiValidationError from '../utils/appError';
import client from './client';
import { toast } from 'sonner';
import { router } from '../router/Routes';

const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await client(options);
        const baseResult: BaseResult<T> = response.data
        return baseResult.data as T;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {

            const { data, status } = error.response as AxiosResponse

            const baseResult: BaseResult = data || { success: false, errors: [] };
            const errors: BaseError[] = (Array.isArray(baseResult.errors) ? baseResult.errors : [baseResult.errors])
                .filter((err): err is BaseError => err !== null);

            switch (status) {
                case 400:
                    if (baseResult.errors && baseResult.errors.length > 0) {
                        throw new ApiValidationError(errors);
                    }
                    toast.error(errors[0]?.description || 'Bad Request');
                    break;
                case 404:
                    router.navigate('/not-found', { replace: true });
                    break;
                case 500:
                    router.navigate('/server-error', { state: { error: errors[0]?.description || 'Something when wrong' } });
                    break;
                default: break;
            }
        }

        return Promise.reject(error)
    }
};

export default request;
