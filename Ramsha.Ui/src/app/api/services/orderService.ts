import request from "../Request";


const BASE_URL = "orders"

const createOrder = async (data: any) =>
    await request({
        url: `${BASE_URL}`,
        method: 'POST',
        data
    })

export const orderService = {
    createOrder
}

