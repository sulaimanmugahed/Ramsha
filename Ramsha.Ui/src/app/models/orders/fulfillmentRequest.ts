import { Address } from "../account"
import { OrderItem } from "./order"

export type FulfillmentRequestStatus ='Pending' | 'Approved' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Failed' | 'Completed'

export type FulfillmentRequest = {
    id: string,
    orderId: string,
    status:FulfillmentRequestStatus
    subtotal: number,
    deliveryFee: number
    received: string
}

export type FulfillmentRequestDetail = {
    id: string,
    orderId: string,
    status: string,
    subtotal: number,
    deliveryFee: number
    received: string,
    items: OrderItem[]
    shippingAddress: Address
}