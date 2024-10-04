import request from "../Request"

const BASE_URL = "options"

const getAllOptions = () => {
    return request({
        url: BASE_URL,
        method: 'GET'
    })
}


export const optionService = {
    getAllOptions,
}