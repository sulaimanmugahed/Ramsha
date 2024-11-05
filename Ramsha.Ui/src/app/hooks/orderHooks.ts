import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { orderService } from "../api/services/orderService"
import { toast } from "sonner"
import { BASKET_QUERY_KEY, MY_ORDERS_QUERY_KEY, ORDERS_QUERY_KEY } from "../constants/queriesKey"
import { Order, OrderDetailType } from "../models/orders/order"

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


export const useMyOrders = () => {
    const { data, isLoading } = useQuery<Order[]>({
        queryKey: [ORDERS_QUERY_KEY, MY_ORDERS_QUERY_KEY],
        queryFn: async () => await orderService.getMyOrders()
    })

    return {
        orders: data,
        isOrdersLoading: isLoading
    }
}

export const useOrderDetail = (orderId: string) => {
    const { data, isLoading } = useQuery<OrderDetailType>({
        queryKey: [ORDERS_QUERY_KEY, ORDERS_QUERY_KEY, orderId],
        queryFn: async () => await orderService.getOrderDetail(orderId)
    })

    return {
        order: data,
        isOrderLoading: isLoading
    }
}