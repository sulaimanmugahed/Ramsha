import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SUPPLIES_QUERY_KEY, SUPPLY_REQUEST_QUERY_KEY } from "../constants/queriesKey"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { Supply } from "../models/suppliers/supply"
import { supplierService } from "../api/services/supplierService"
import { useAccount } from "./accountHooks"
import { toast } from "sonner"
import { SupplyRequest, SupplyRequestItem } from "../models/suppliers/supplyRequest"
import AppError from "../utils/appError"
import { SupplierInventoryItem } from "../models/suppliers/SupplierInventoryItem"



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


export const useRemoveSupplyItem = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, error } = useMutation({
        mutationFn: async (itemId: string) => await supplierService.removeSupplyRequestItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUPPLY_REQUEST_QUERY_KEY] })
            toast.success("item Removed")
        },
        meta: {
            ERROR_SOURCE: 'Remove Supply Item',
        }
    })

    return {
        removeItem: mutateAsync,
        removeItemError: error
    }
}

export const useUpdateSupplyItem = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, error } = useMutation({
        mutationFn: async (itemId: string) => await supplierService.updateSupplyRequestItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUPPLY_REQUEST_QUERY_KEY] })
            toast.success("item Updated")
        },
        meta: {
            ERROR_SOURCE: 'Update Supply Item',
        }
    })

    return {
        updateItem: mutateAsync,
        updateItemError: error
    }
}

export const useSupplyRequestItem = (itemId: string) => {
    const { data, isLoading, isError } = useQuery<SupplyRequestItem>({
        queryKey: ['supplyRequest', itemId],
        queryFn: async () => await supplierService.getSupplyRequestItem(itemId),

    })

    return {
        item: data,
        isItemLoading: isLoading,
        isItemError: isError
    }
}

export const useSupplierInventoryItems = () => {
    const { data, isLoading, isError } = useQuery<SupplierInventoryItem[]>({
        queryKey: ['suppliersInventoryItems'],
        queryFn: async () => await supplierService.getInventoryItems(),
    })

    return {
        items: data,
        isItemLoading: isLoading,
        isItemError: isError
    }
}

export const useSendSupplyRequest = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (data: any) => await supplierService.sendSupplyRequest(data),
        onSuccess: () => {
            toast.success("Supply Request Sent Successfully")
            queryClient.removeQueries({ queryKey: [SUPPLY_REQUEST_QUERY_KEY] })
        },
        meta: {
            ERROR_SOURCE: 'Send Supply Request',
        }
    })

    return {
        send: mutateAsync,
        sendError: error,
        isSendPending: isPending
    }
}


export const useAddSupplyItem = () => {

    const queryClient = useQueryClient()
    const { mutateAsync, error } = useMutation<any>({
        mutationFn: async (data: any) => await supplierService.addSupplyRequestItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUPPLY_REQUEST_QUERY_KEY] })
            toast.success("item added")
        },
        meta: {
            ERROR_SOURCE: 'Add Supply Item',
        }
    })

    return {
        addItem: mutateAsync,
        addItemError: error
    }
}