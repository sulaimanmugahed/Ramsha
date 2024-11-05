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

export const orderService = {
    createOrder,
    getMyOrders,
    getOrderDetail
}

