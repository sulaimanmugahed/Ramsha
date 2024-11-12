import { CatalogCategory } from "../../models/catalog/catalogCategory";
import { CatalogProduct, CatalogProductDetailType, CatalogVariant } from "../../models/catalog/catalogProduct";
import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { CurrencyCode } from "../../models/common/currency";
import request from "../Request";

const BASE_URL = "catalog"


const getProducts = async (params: PagedParams, preferredCurrency: CurrencyCode) =>
    await request<PaginationResponse<CatalogProduct[]>>({
        url: `${BASE_URL}/products`,
        method: 'POST',
        data: { ...params, preferredCurrency }
    })


const getProductDetail = async (productId: string) =>
    await request<CatalogProductDetailType>({
        url: `${BASE_URL}/products/${productId}`,
        method: 'GET'
    })


const getProductVariant = async (productId: string, productVariantId?: string | null) => {
    const url = productVariantId
        ? `${BASE_URL}/products/${productId}/variants/${productVariantId}`
        : `${BASE_URL}/products/${productId}/variants`;

    return await request<CatalogVariant>({
        url,
        method: 'GET'
    });
};


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
    getInventoryItems,
    getProductVariant
}