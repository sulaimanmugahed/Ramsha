import { useQuery } from "@tanstack/react-query"
import { deliveryAgentService } from "../api/services/deliveryAgentService"

export const useDeliveryAgents = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["deliveryAgent"],
        queryFn: async () => await deliveryAgentService.getAll()
    })

    return {
        deliveryAgents: data,
        isLoading,
        isError
    }
}