import { useMutation, useQuery } from "@tanstack/react-query";
import { supplyService } from "../api/services/supplyService";
import { SUPPLIES_QUERY_KEY } from '../constants/queriesKey';
import { PagedParams, PaginationResponse } from "../models/common/commonModels";
import { Supply, SupplyDetail } from "../models/supplies/supply";

export const useSupplies = (params: PagedParams) => {

    const { data, isError, isLoading } = useQuery<PaginationResponse<Supply[]>>({
        queryKey: [SUPPLIES_QUERY_KEY, params],
        queryFn: async () => await supplyService.getSupplies(params)
    })

    return {
        supplies: data?.items,
        suppliesMeta: data?.metaData,
        isSuppliesLoading: isLoading,
        isSuppliesError: isError
    }

}

export const useSupplyDetail = (id: string) => {

    const { data, isError, isLoading } = useQuery<SupplyDetail>({
        queryKey: [SUPPLIES_QUERY_KEY, id],
        queryFn: async () => await supplyService.getSupplyDetail(id)
    })

    return {
        supplyDetail: data,
        isLoading,
        isError
    }

}




export const useApproveSupply = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: string) => await supplyService.approveSupply(id),
    })

    return {
        approve: mutateAsync,
        isApprovePending: isPending
    }
}