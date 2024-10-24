import { CatalogCategory } from "../../models/catalog/catalogCategory";
import { CatalogProductDetailType } from "../../models/catalog/catalogProduct";
import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import request from "../Request";

const BASE_URL = "catalog"


const getProducts = async (params: PagedParams) =>
    await request<PaginationResponse<any[]>>({
        url: `${BASE_URL}/products`,
        method: 'POST',
        data: params
    })


const getProductDetail = async (productId: string) =>
    await request<CatalogProductDetailType>({
        url: `${BASE_URL}/products/${productId}`,
        method: 'GET'
    })


const getInventoryItems = async (productId: string, productVariantId: string, params: PagedParams) =>
    await request<any>({
        url: `${BASE_URL}/${productId}/${productVariantId}/inventoryItems`,
        method: 'POST',
        data: params
    })


const getCategories = async () =>
    await request<CatalogCategory[]>({
        url: `${BASE_URL}/categories`,
        method: 'GET',
    })

export const catalogService = {
    getProducts,
    getCategories,
    getProductDetail,
    getInventoryItems
}