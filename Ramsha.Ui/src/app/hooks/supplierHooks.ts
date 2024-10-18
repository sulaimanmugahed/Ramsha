import { useMutation, useQuery } from "@tanstack/react-query"
import { SUPPLIES_QUERY_KEY, SUPPLY_REQUEST_QUERY_KEY } from "../constants/queriesKey"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { Supply } from "../models/suppliers/supply"
import { supplierService } from "../api/services/supplierService"
import { useAccount } from "./accountHooks"
import { toast } from "sonner"
import { SupplyRequest } from "../models/suppliers/supplyRequest"



export const useSupplies = (params: PagedParams) => {

    const { account } = useAccount()

    const { data, isError, isLoading } = useQuery<PaginationResponse<Supply[]>>({
        queryKey: [SUPPLIES_QUERY_KEY, account?.username],
        queryFn: async () => await supplierService.getSupplies(params)
    })

    return {
        supplies: data?.items,
        suppliesMeta: data?.metaData,
        isSuppliesLoading: isLoading,
        isSuppliesError: isError
    }
}

export const useSupplyRequest = () => {

    const { account } = useAccount()

    const { data, isError, isLoading } = useQuery<SupplyRequest>({
        queryKey: [SUPPLY_REQUEST_QUERY_KEY, account?.username],
        queryFn: async () => await supplierService.getSupplyRequest()
    })

    return {
        supplyRequest: data,
        isSupplyRequestLoading: isLoading,
        isSupplyRequestError: isError
    }
}



export const useAddSupplyItem = () => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: any) => await supplierService.addSupplyRequestItem(data),
        onSuccess: () => toast.success("item added")
    })

    return {
        addItem: mutateAsync
    }
}