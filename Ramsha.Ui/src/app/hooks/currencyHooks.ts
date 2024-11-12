import { useQuery } from "@tanstack/react-query"
import { currencyService } from "../api/services/currencyService"
import { CURRENCIES_QUERY_KEY } from "../constants/queriesKey"
import { Currency, CurrencyCode } from "../models/common/currency"

export const useCurrencies = () => {
    const { data, isLoading } = useQuery<Currency[]>({
        queryKey: [CURRENCIES_QUERY_KEY],
        queryFn: async () => await currencyService.getAll(),
        staleTime: 1000 * 60 * 60 * 12
    })

    return {
        currencies: data,
        isLoading
    }
}

export const useCurrency = (code: CurrencyCode) => {
    const { data, isLoading } = useQuery<Currency>({
        queryKey: [CURRENCIES_QUERY_KEY, code],
        queryFn: async () => await currencyService.get(code),
        staleTime: 1000 * 60 * 60 * 12
    })

    return {
        currency: data,
        isLoading
    }
}