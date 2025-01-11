import { AdminStatistics } from "../../models/statistics/adminStatistics"
import { SupplierStatistics } from "../../models/statistics/SupplierStatistics"
import request from "../Request"



const BASE_URL = "statistics"

const getSupplierStatistics = async () => {
    return await request<SupplierStatistics>({
        url: `${BASE_URL}/supplier`
    })
}

const getAdminStatistics = async () => {
    return await request<AdminStatistics>({
        url: `${BASE_URL}/admin`
    })
}


export const statisticsService = {
    getSupplierStatistics,
    getAdminStatistics
}