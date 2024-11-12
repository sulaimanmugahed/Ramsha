import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { supplierService } from "../api/services/supplierService"
import {
    SUPPLIER_SUPPLIES_QUERY_KEY,
    SUPPLIERS_INVENTORY_ITEMS_QUERY_KEY,
    SUPPLIERS_MY_PRODUCTS_QUERY_KEY,
    SUPPLIERS_MY_VARIANTS_QUERY_KEY,
    SUPPLY_REQUEST_QUERY_KEY
} from "../constants/queriesKey"
import { PagedParams, PaginationParams, PaginationResponse } from "../models/common/commonModels"
import { SupplierInventoryItem } from "../models/suppliers/supplierInventoryItem"
import { SupplierProduct, SupplierVariant } from "../models/suppliers/supplierProduct"
import { SupplyRequest, SupplyRequestItem } from "../models/suppliers/supplyRequest"
import { Supply } from "../models/supplies/supply"



export const useSupplies = (params: PagedParams) => {


    const { data, isError, isLoading } = useQuery<PaginationResponse<Supply[]>>({
        queryKey: [SUPPLIER_SUPPLIES_QUERY_KEY],
        queryFn: async () => await supplierService.getSupplies(params)
    })

    return {
        supplies: data?.items,
        suppliesMeta: data?.metaData,
        isSuppliesLoading: isLoading,
        isSuppliesError: isError
    }
}


export const useMyProducts = (requestData: { paginationParams: PaginationParams }) => {

    const { data, isError, isLoading } = useQuery<PaginationResponse<SupplierProduct[]>>({
        queryKey: [SUPPLIERS_MY_PRODUCTS_QUERY_KEY],
        queryFn: async () => await supplierService.getMyProducts(requestData)
    })

    return {
        products: data?.items,
        productsMeta: data?.metaData,
        isProductsLoading: isLoading,
        isProductsError: isError
    }
}

export const useMyVariants = (productId?: string) => {

    const { data, isError, isLoading } = useQuery<SupplierVariant[]>({
        enabled: !!productId,
        queryKey: [SUPPLIERS_MY_VARIANTS_QUERY_KEY, productId],
        queryFn: async () => await supplierService.getMyVariants(productId)
    })

    return {
        variants: data,
        isVariantsLoading: isLoading,
        isVariantsError: isError
    }
}

export const useMyVariant = (productId?: string, variantId?: string) => {

    const { data, isError, isLoading } = useQuery<SupplierVariant>({
        enabled: !!productId && !!variantId,
        queryKey: [SUPPLIERS_MY_VARIANTS_QUERY_KEY, productId, variantId],
        queryFn: async () => await supplierService.getMyVariant(productId!, variantId!)
    })

    return {
        variant: data,
        isVariantLoading: isLoading,
        isVariantError: isError
    }
}

export const useUpdateMyVariant = (productId: string, variantId: string) => {
    const queryClient = useQueryClient()


    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: any) => await supplierService.updateMyVariant({ ...data, productId, variantId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUPPLIERS_MY_VARIANTS_QUERY_KEY, productId, variantId] })
            toast.success("variant Updated")
        },
    })

    return {
        updateVariant: mutateAsync,
        isUpdateVariantPending: isPending
    }
}

export const useSupplyRequest = () => {

    const { data, isError, isLoading } = useQuery<SupplyRequest>({
        queryKey: [SUPPLY_REQUEST_QUERY_KEY],
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

export const useMyInventoryItems = () => {
    const { data, isLoading, isError } = useQuery<SupplierInventoryItem[]>({
        queryKey: [SUPPLIERS_INVENTORY_ITEMS_QUERY_KEY],
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


export const useAddVariant = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (data: any) => await supplierService.addSupplierVariant(data),
        onSuccess: () => {
            toast.success("product added")
            queryClient.invalidateQueries({ queryKey: [SUPPLIERS_MY_VARIANTS_QUERY_KEY, SUPPLIERS_MY_PRODUCTS_QUERY_KEY] })

        },
        meta: {
            ERROR_SOURCE: 'Add Supplier product Item',
        }
    })

    return {
        addVariant: mutateAsync,
        addVariantError: error,
        isAddVariantPending: isPending
    }
}


export const useAddOrUpdateSupplyItem = () => {

    const queryClient = useQueryClient()
    const { mutateAsync, error } = useMutation({
        mutationFn: async (data: any) => await supplierService.addOrUpdateSupplyRequestItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SUPPLY_REQUEST_QUERY_KEY] })
            toast.success("item added")
        },
        meta: {
            ERROR_SOURCE: 'Add Supply Item',
        }
    })

    return {
        addOrUpdateItem: mutateAsync,
        addItemError: error
    }
}

