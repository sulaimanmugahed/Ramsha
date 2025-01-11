import { BrandDto } from "../../models/products/product";
import request from "../Request";

const BASE_URL = "brands"


const getBrands = async () => {
    return await request<BrandDto[]>({
        url: `${BASE_URL}`
    })
}

const getBrand = async (id: string) => {
    return await request<BrandDto>({
        url: `${BASE_URL}/${id}`,
    })
}

const createBrand = async (data: { name: string }) => {
    return await request({
        url: BASE_URL,
        method: 'POST',
        data
    })
}

const updateBrand = async (id: string, data: { name: string }) => {
    return await request({
        url: `${BASE_URL}/${id}`,
        method: 'PUT',
        data
    })
}

const deleteBrand = async (id: string) => {
    return await request({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
    })
}


export const brandService = {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}