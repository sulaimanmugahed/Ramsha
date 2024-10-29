import { useQuery } from "@tanstack/react-query"
import { CUSTOMERS_MY_ADDRESS } from "../constants/queriesKey"
import { customerService } from "../api/services/customerService"

export const useMyAddress = () => {
    const { data, isLoading } = useQuery({
        queryKey: [CUSTOMERS_MY_ADDRESS],
        queryFn: async () => await customerService.getMyAddress()
    })


    return {
        myAddress: data,
        isAddressLoading: isLoading
    }
}