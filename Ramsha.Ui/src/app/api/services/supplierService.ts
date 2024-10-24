import { PagedParams, PaginationResponse } from "../../models/common/commonModels"
import { SupplierInventoryItem } from "../../models/suppliers/SupplierInventoryItem"
import { Supply } from "../../models/suppliers/supply"
import { SupplyRequest, SupplyRequestItem } from "../../models/suppliers/supplyRequest"
import request from "../Request"


const BASE_URL = 'suppliers'

const getSupplies = async (params: PagedParams) => {
    return await request<PaginationResponse<Supply[]>>({
        url: `${BASE_URL}/supplies`,
        method: 'POST',
        data: params
    })
}

const getInventoryItems = async () => {
    return await request<SupplierInventoryItem[]>({
        url: `${BASE_URL}/inventory/items`,
        method: 'GET',
    })
}

const addSupplyRequestItem = async (data: any) => {
    return await request({
        url: `${BASE_URL}/addSupplyRequestItem`,
        method: 'POST',
        data
    })
}

const removeSupplyRequestItem = async (itemId: string) => {
    return await request({
        url: `${BASE_URL}/supply-request/items/${itemId}`,
        method: 'DELETE'
    })
}

const updateSupplyRequestItem = async (data: any) => {
    const { itemId } = data
    return await request({
        url: `${BASE_URL}/supply-request/items/${itemId}`,
        method: 'PUT',
        data
    })
}
const getSupplyRequestItem = async (id: string) => {
    return await request<SupplyRequestItem>({
        url: `${BASE_URL}/supply-request/items/${id}`,
        method: 'GET',
    })
}

const sendSupplyRequest = async (data: any) => {
    return await request({
        url: `${BASE_URL}/supply-request/send`,
        method: 'POST',
        data
    })
}


const getSupplyRequest = async () => {
    return await request<SupplyRequest>({
        url: `${BASE_URL}/supply-request`,
        method: 'GET'
    })
}


export const supplierService = {
    getInventoryItems,
    getSupplies,
    getSupplyRequestItem,
    addSupplyRequestItem,
    getSupplyRequest,
    removeSupplyRequestItem,
    updateSupplyRequestItem,
    sendSupplyRequest
}