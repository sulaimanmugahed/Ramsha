import { PagedParams } from "../../models/common/commonModels";
import request from "../Request";

const BASE_URL = "catalog"


const getProducts = async (params: PagedParams) =>
    await request({
        url: `${BASE_URL}/products`,
        method: 'POST',
        data: params
    })


const getProductDetail = async (productId: string) =>
    await request({
        url: `${BASE_URL}/products/${productId}`,
        method: 'GET'
    })


const getInventoryItems = async (productId: string, productVariantId: string, params: PagedParams) =>
    await request({
        url: `${BASE_URL}/${productId}/${productVariantId}/inventoryItems`,
        method: 'POST',
        data: params
    })


const getCategories = async () =>
    await request({
        url: `${BASE_URL}/categories`,
        method: 'GET',
    })

export const catalogService = {
    getProducts,
    getCategories,
    getProductDetail,
    getInventoryItems
}