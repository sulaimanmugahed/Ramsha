import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { inventoryService } from "../api/services/inventoryService"
import { INVENTORY_ITEMS_QUERY_KEY } from "../constants/queriesKey"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { Discount, InventoryItemDto } from "../models/inventories/inventory"


const initialState: PaginationResponse<InventoryItemDto[]> = {
    items: [

    ]
}



export const useApplyDiscount = (itemId: string) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: Discount) => await inventoryService.applyDiscount(itemId, data),
        onSuccess: () => toast.success("discount applied"),
        onError: () => toast.error("discount failed"),
    })


    return {
        apply: mutateAsync
    }
}



export const useInventoryItems = (params: PagedParams) => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<InventoryItemDto[]>>({
        queryKey: [INVENTORY_ITEMS_QUERY_KEY, params],
        queryFn: async () => {
            console.log('Fetching data with params:', params);
            return await inventoryService.getInventoryItems(params)
        },
        initialData: initialState
    })

    return {
        items: data?.items,
        metaData: data?.metaData,
        isItemsLoading: isLoading,
        isItemsError: isError
    }
}


