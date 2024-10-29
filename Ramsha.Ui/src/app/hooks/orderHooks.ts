import { useMutation, useQueryClient } from "@tanstack/react-query"
import { orderService } from "../api/services/orderService"
import { toast } from "sonner"
import { BASKET_QUERY_KEY } from "../constants/queriesKey"

export const useCreateOrder = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, isError, isSuccess } = useMutation({
        mutationFn: async (data: any) => await orderService.createOrder(data),
        onSuccess: () => { queryClient.setQueryData([BASKET_QUERY_KEY], null), toast.success("order created") }
    })


    return {
        createOrder: mutateAsync,
        isCreateOrderPending: isPending,
        isCreateOrderError: isError,
        isCreateOrderSuccess: isSuccess,
    }
}