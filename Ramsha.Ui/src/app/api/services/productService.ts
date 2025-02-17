import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { ProductDetail, ProductDto, ProductOption, ProductVariantDto, ProductVariantSelection } from "../../models/products/product";

import request from "../Request";

const BASE_URL = "products"

const getProduct = (id: string) =>
    request({
        url: `${BASE_URL}/${id}`,
        method: 'GET',
    })

const getProductsPaged = (params: PagedParams) =>
    request<PaginationResponse<ProductDto[]>>({
        url: `${BASE_URL}/paged`,
        method: 'POST',
        data: params
    })

const getProductDetail = (productId: string) =>
    request<ProductDetail>({
        url: `${BASE_URL}/${productId}/detail`,
        method: 'GET',
    })





const createProduct = async (data: any) => {
    return await request({
        url: BASE_URL,
        method: 'POST',
        data
    })
}


const addVariant = async (data: any, productId: string) => {
    return await request({
        url: `${BASE_URL}/${productId}/variants`,
        method: 'POST',
        data
    })

}

const getTags = async () => {
    return await request<string[]>({
        url: `${BASE_URL}/tags`,
        method: 'GET'
    })
}


const getProductVariants = async (productId: string) => {
    return await request<ProductVariantDto[]>({
        url: `${BASE_URL}/${productId}/variants`
    })
}

const getDefaultVariant = async (productId: string) => {
    return await request<ProductVariantDto>({
        url: `${BASE_URL}/${productId}/variants/default`
    })
}

const getProductOptions = async (productId: string) => {
    return await request<ProductOption[]>({
        url: `${BASE_URL}/${productId}/options`,
        method: 'GET',
    })
}
const getProductVariant = async (productId: string, variantId: string) => {
    return await request<ProductVariantDto>({
        url: `${BASE_URL}/${productId}/variants/${variantId}`,
        method: 'GET',
    })
}

const removeRange = async (products: string[]) => {
    return await request({
        url: `${BASE_URL}`,
        method: 'DELETE',
        data: { products }

    })
}

const removeVariant = async ({ productId, variantId }: { productId: string, variantId: string }) => {
    return await request({
        url: `${BASE_URL}/${productId}/variants/${variantId}`,
        method: 'DELETE',
    })
}

const updateVariant = async ({ productId, variantId, data }: { productId: string, variantId: string, data: any }) => {
    return await request({
        url: `${BASE_URL}/${productId}/variants/${variantId}`,
        method: 'PUT',
        data
    })
}

const updateProduct = async ({ productId, data }: { productId: string, data: any }) => {
    return await request({
        url: `${BASE_URL}/${productId}`,
        method: 'PUT',
        data
    })
}


const changeProductStatus = async (productId: string, status: string) => {
    return await request({
        url: `${BASE_URL}/${productId}/status?statusValue=${status}`,
        method: 'PUT',
    })
}


const getProductVariantSelection = async (productId: string, isCatalog: boolean = false) =>
    await request<ProductVariantSelection>({
        url: `${BASE_URL}/${productId}/selection/?isCatalog=${isCatalog}`,
    })




export const productService = {
    getProduct,
    createProduct,
    updateProduct,
    getProductDetail,
    getProductsPaged,
    addVariant,
    getTags,
    removeRange,
    getProductVariants,
    removeVariant,
    getProductVariant,
    updateVariant,
    changeProductStatus,
    getProductOptions,
    getProductVariantSelection,
    getDefaultVariant
}
