import { PagedParams } from "../../models/common/commonModels";
import { createFormData } from "../../utils/util";
import request from "../Request";

const BASE_URL = "products"

const getProduct = (id: string) =>
    request({
        url: `${BASE_URL}/${id}`,
        method: 'GET',
    })

const getProductsPaged = (params: PagedParams) =>
    request({
        url: `${BASE_URL}/paged`,
        method: 'POST',
        data: params
    })



const createProduct = async (data: any) => {
    return await request({
        url: BASE_URL,
        method: 'POST',
        data
    })
}


const editProduct = async (data: any, id: string) => {
    const formData = createFormData(data);
    return await request({
        url: `${BASE_URL}/${id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
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
    return await request({
        url: `${BASE_URL}/tags`,
        method: 'GET',

    })
}

const getBrands = async () => {
    return await request({
        url: `${BASE_URL}/brands`,
        method: 'GET',

    })
}

const getProductVariants = async (productId: string) => {
    return await request({
        url: `${BASE_URL}/${productId}/variants`,
        method: 'GET',

    })
}
const getProductVariant = async (productId: string, variantId: string) => {
    return await request({
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



export const productService = {
    getProduct,
    createProduct,
    editProduct,
    getProductsPaged,
    addVariants,
    addVariant,
    getTags,
    getBrands,
    removeRange,
    getProductVariants,
    removeVariant,
    getProductVariant,
    updateVariant
}
