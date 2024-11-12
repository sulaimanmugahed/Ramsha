import { Currency, CurrencyCode } from "../../models/common/currency"
import request from "../Request"


const BASE_URL = 'currencies'

const getAll = async () => {
    return request<Currency[]>({
        url: `${BASE_URL}`
    })
}
const get = async (currencyCode: CurrencyCode) => {
    return request<Currency>({
        url: `${BASE_URL}/${currencyCode}`
    })
}


export const currencyService = {
    getAll,
    get
}