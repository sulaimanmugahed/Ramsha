import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
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

const getOrdersPaged = async (params: PagedParams) => {
    return await request<PaginationResponse<Order[]>>({
        url: `${BASE_URL}/paged`,
        method: 'POST',
        data: params
    })
}

const getMyOrders = async () => {
    return await request<Order[]>({
        url: `${BASE_URL}/my-orders`
    })
}

const getMyFulfillmentRequests = async (params: PagedParams) =>
    await request<PaginationResponse<FulfillmentRequest[]>>({
        url: `${BASE_URL}/supplier-fulfillment-requests/paged`,
        method: 'POST',
        data: params
    })

    const getDeliveryAgentFulfillmentRequests = async (params: PagedParams) =>
        await request<PaginationResponse<FulfillmentRequest[]>>({
            url: `${BASE_URL}/deliveryAgent-fulfillment-requests/paged`,
            method: 'POST',
            data: params
        })


const getFulfillmentRequestDetail = async (id: string) => {
    return await request<FulfillmentRequestDetail>({
        url: `${BASE_URL}/fulfillment-requests/${id}/detail`
    })
}


const getAllFulfillmentRequests = async (params: PagedParams) => {
    return await request<PaginationResponse<FulfillmentRequest[]>>({
        url: `${BASE_URL}/fulfillment-requests/paged`,
        method: 'POST',
        data: params
    })
}


const markFulfillmentRequest = async (markAs: 'ship' | 'deliver', id: string, orderId: string) => {
    return await request({
        url: `${BASE_URL}/${orderId}/fulfillment-requests/${id}/${markAs}`,
        method: 'POST'
    })
}

const shipFulfillmentRequest = async (id: string, orderId: string, deliveryAgentId: string) => {
    return await request({
        url: `${BASE_URL}/${orderId}/fulfillment-requests/${id}/ship?deliveryAgentId=${deliveryAgentId}`,
        method: 'POST'
    })
}


export const orderService = {
    createOrder,
    getMyOrders,
    getOrderDetail,
    getMyFulfillmentRequests,
    getFulfillmentRequestDetail,
    markFulfillmentRequest,
    getOrdersPaged,
    getAllFulfillmentRequests,
    shipFulfillmentRequest,
    getDeliveryAgentFulfillmentRequests
}

