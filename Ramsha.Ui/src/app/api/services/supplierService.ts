import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { SupplierInventoryItem } from "../../models/suppliers/supplierInventoryItem";
import { SupplierProduct, SupplierVariant } from "../../models/suppliers/supplierProduct";
import { Supply } from "../../models/suppliers/supply";
import { SupplyRequest, SupplyRequestItem } from "../../models/suppliers/supplyRequest";
import request from "../Request";


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

const addOrUpdateSupplyRequestItem = async (data: any) => {
    return await request({
        url: `${BASE_URL}/supply-request/items`,
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


const getMyProducts = async (data: any) => {
    return await request<PaginationResponse<SupplierProduct[]>>({
        url: `${BASE_URL}/products/paged`,
        method: 'POST',
        data
    })
}

const getMyVariants = async (productId: any) => {
    return await request<SupplierVariant[]>({
        url: `${BASE_URL}/products/${productId}/variants`,
        method: 'GET'
    })
}

const getMyVariant = async (productId: string, productVariantId: string) => {
    return await request<SupplierVariant>({
        url: `${BASE_URL}/products/${productId}/variants/${productVariantId}`,
        method: 'GET'
    })
}



const addSupplierVariant = async (data: any) => {
    const { productId, productVariantId } = data
    return await request({
        url: `${BASE_URL}/products/${productId}/variants/${productVariantId}`,
        method: 'POST',
        data
    })
}

const updateMyVariant = async (data: any) => {
    const { productId, variantId } = data
    return await request({
        url: `${BASE_URL}/products/${productId}/variants/${variantId}`,
        method: 'PUT',
        data
    })
}




export const supplierService = {
    getInventoryItems,
    getSupplies,
    getSupplyRequestItem,
    addOrUpdateSupplyRequestItem,
    getSupplyRequest,
    removeSupplyRequestItem,
    updateSupplyRequestItem,
    sendSupplyRequest,
    addSupplierVariant,
    getMyProducts,
    getMyVariants,
    getMyVariant,
    updateMyVariant
}