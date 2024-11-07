import { Address } from "../account";
import { FulfillmentRequest } from "./fulfillmentRequest";

type orderStatus =
    'Pending' |
    'PaymentReceived' |
    'PaymentFailed';


export type Order = {
    id: string;
    subtotal: number,
    deliveryFee: number,
    total: number,
    status: orderStatus,
    orderDate: string
}


export type OrderDetailType = {
    id: string;
    subtotal: number,
    deliveryFee: number,
    total: number,
    status: orderStatus,
    fulfillmentRequests: FulfillmentRequest[],
    shippingAddress: Address,
    orderDate: string
}


export type OrderItem = {
    inventoryItemId: string,
    name: string,
    sku: string,
    imageUrl: string,
    price: number,
    quantity: number
}

export type ShippingAddress = {
    fullName: string
    address1: string
    address2: string
    city: string
    country: string
    state: string
    zip: string
}