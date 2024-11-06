import { FulfillmentRequest, FulfillmentRequestDetail } from "../../models/orders/fulfillmentRequest";
import { Order, OrderDetailType } from "../../models/orders/order";
import request from "../Request";


const BASE_URL = "orders"

const createOrder = async (data: any) =>
    await request({
        url: `${BASE_URL}`,
        method: 'POST',
        data
    })

const getOrderDetail = async (orderId: string) => {
    return await request<OrderDetailType>({
        url: `${BASE_URL}/${orderId}/detail`
    })
}

const getMyOrders = async () => {
    return await request<Order[]>({
        url: `${BASE_URL}`
    })
}

const getMyFulfillmentRequests = async () =>
    await request<FulfillmentRequest[]>({
        url: `${BASE_URL}/supplier-fulfillment-requests`
    })


const getFulfillmentRequestDetail = async (id: string) => {
    return await request<FulfillmentRequestDetail>({
        url: `${BASE_URL}/fulfillment-requests/${id}/detail`
    })
}

export const orderService = {
    createOrder,
    getMyOrders,
    getOrderDetail,
    getMyFulfillmentRequests,
    getFulfillmentRequestDetail
}

