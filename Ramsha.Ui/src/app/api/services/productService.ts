import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { BrandDto, ProductDetail, ProductDto, ProductOption, ProductVariantDto } from "../../models/products/product";

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





const addVariants = async (data: any, productId: string) => {
    return await request({
        url: `${BASE_URL}/${productId}/variants`,
        method: 'POST',
        data
    })
}
const addVariant = async (data: any, productId: string) => {
    return await request({
        url: `${BASE_URL}/${productId}/variant`,
        method: 'POST',
        data
    })

}

const getTags = async () => {
    return await request<string[]>({
        url: `${BASE_URL}/tags`,
        method: 'GET',

    })
}

const getBrands = async () => {
    return await request<BrandDto[]>({
        url: `${BASE_URL}/brands`,
        method: 'GET',

    })
}

const getProductVariants = async (productId: string) => {
    return await request<ProductVariantDto[]>({
        url: `${BASE_URL}/${productId}/variants`,
        method: 'GET',

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



export const productService = {
    getProduct,
    createProduct,
    updateProduct,
    getProductDetail,
    getProductsPaged,
    addVariants,
    addVariant,
    getTags,
    getBrands,
    removeRange,
    getProductVariants,
    removeVariant,
    getProductVariant,
    updateVariant,
    changeProductStatus,
    getProductOptions
}
