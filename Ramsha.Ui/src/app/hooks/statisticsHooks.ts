import { useQuery } from "@tanstack/react-query"
import { statisticsService } from "../api/services/statisticsService"
import { STATISTICS_ADMIN_QUERY_KEY, STATISTICS_SUPPLIER_QUERY_KEY } from "../constants/queriesKey"
import { SupplierStatistics } from "../models/statistics/SupplierStatistics"
import { AdminStatistics } from "../models/statistics/adminStatistics"

export const useSupplierStatistics = () => {
    const { data, isError, isLoading } = useQuery<SupplierStatistics>({
        queryKey: [STATISTICS_SUPPLIER_QUERY_KEY],
        queryFn: async () => await statisticsService.getSupplierStatistics()
    })


    return {
        supplierStatistics: data,
        isError,
        isLoading
    }
}

export const useAdminStatistics = () => {
    const { data, isError, isLoading } = useQuery<AdminStatistics>({
        queryKey: [STATISTICS_ADMIN_QUERY_KEY],
        queryFn: async () => await statisticsService.getAdminStatistics()
    })


    return {
        adminStatistics: data,
        isError,
        isLoading
    }
}