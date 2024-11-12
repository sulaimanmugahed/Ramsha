import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { Supply, SupplyDetail } from "../../models/supplies/supply";
import request from "../Request";



const BASE_URL = "supplies"

const getSupplies = async (params: PagedParams) => {
    return await request<PaginationResponse<Supply[]>>({
        url: `${BASE_URL}/paged`,
        method: 'POST',
        data: params
    })
}

const getSupplyDetail = async (id: string) => {
    return await request<SupplyDetail>({
        url: `${BASE_URL}/${id}/detail`,
    })
}

const approveSupply = async (id: string) =>
    await request({
        url: `${BASE_URL}/${id}/approve`,
        method: 'POST'
    })



export const supplyService = {
    getSupplies,
    approveSupply,
    getSupplyDetail
}