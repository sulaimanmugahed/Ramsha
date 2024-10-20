import request from "../Request"
import { Option } from '../../models/options/option'

const BASE_URL = "options"

const getAllOptions = () => {
    return request<Option[]>({
        url: BASE_URL,
        method: 'GET'
    })
}


export const optionService = {
    getAllOptions,
}