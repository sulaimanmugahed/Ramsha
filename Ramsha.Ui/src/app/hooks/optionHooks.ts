import { useQuery } from "@tanstack/react-query"
import { OPTIONS_QUERY_KEY } from "../constants/queriesKey"
import { optionService } from "../api/services/optionService"
import { Option } from "../models/options/option"

const initialOptions: Option[] = []

export const useOptions = () => {

    const { data, isError, isLoading } = useQuery<Option[]>({
        queryKey: [OPTIONS_QUERY_KEY],
        queryFn: async () => await optionService.getAllOptions(),
        initialData: initialOptions
    })

    return {
        options: data,
        isOptionsError: isError,
        isOptionsLoading: isLoading
    }

}