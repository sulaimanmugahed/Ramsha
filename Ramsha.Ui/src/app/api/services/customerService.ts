import request from "../Request"

const BASE_URL = "customers"

const getMyAddress = () =>
    request({
        url: `${BASE_URL}/address`
    })


export const customerService = {
    getMyAddress
}