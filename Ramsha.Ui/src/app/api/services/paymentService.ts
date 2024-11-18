import { Basket } from "../../models/baskets/basket"
import request from "../Request"

const BASE_URL = "payments"


export const createOrUpdatePaymentIntent = async () => {
    return await request<Basket>({
        url: BASE_URL,
        method: 'POST',
        data: {}
    })
}


export const paymentService = {
    createOrUpdatePaymentIntent
}