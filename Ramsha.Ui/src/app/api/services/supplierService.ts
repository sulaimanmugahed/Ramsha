import { PagedParams } from "../../models/common/commonModels"
import request from "../Request"


const BASE_URL = 'suppliers'

const getSupplies = async (params: PagedParams) => {
    return await request({
        url: `${BASE_URL}/supplies`,
        method: 'POST',
        data: params
    })
}



const addSupplyRequestItem = async (data: any) => {
    return await request({
        url: `${BASE_URL}/addSupplyRequestItem`,
        method: 'POST',
        data
    })
}


const getSupplyRequest = async () => {
    return await request({
        url: `${BASE_URL}/supply-request`,
        method: 'GET'
    })
}




export const supplierService = {
    getSupplies,
    addSupplyRequestItem,
    getSupplyRequest
}