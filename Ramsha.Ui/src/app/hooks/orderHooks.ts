import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { orderService } from "../api/services/orderService"
import { BASKET_QUERY_KEY, MY_ORDERS_QUERY_KEY, ORDERS_FULFILLMENT_REQUESTS, ORDERS_QUERY_KEY, ORDERS_SUPPLIER_FULFILLMENT_REQUESTS } from "../constants/queriesKey"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { FulfillmentRequest, FulfillmentRequestDetail } from "../models/orders/fulfillmentRequest"
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


export const useMyFulfillmentRequests = (params: PagedParams) => {
    const { data, isLoading } = useQuery<PaginationResponse<FulfillmentRequest[]>>({
        queryKey: [ORDERS_SUPPLIER_FULFILLMENT_REQUESTS, params],
        queryFn: async () => await orderService.getMyFulfillmentRequests(params)
    })

    return {
        fulfillmentRequests: data?.items,
        isFulfillmentRequestsLoading: isLoading
    }
}


export const useMyFulfillmentRequestDetail = (id: string) => {
    const { data, isLoading } = useQuery<FulfillmentRequestDetail>({
        queryKey: [ORDERS_FULFILLMENT_REQUESTS, id],
        queryFn: async () => await orderService.getFulfillmentRequestDetail(id)
    })

    return {
        fulfillmentRequestDetail: data,
        isLoading
    }
}


export const useMarkFulfillmentRequest = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: { markAs: "ship" | "deliver", id: string, orderId: string }) => await orderService.markFulfillmentRequest(data.markAs, data.id, data.orderId),
    })

    return {
        markAs: mutateAsync,
        isMarkAsPending: isPending
    }
}


