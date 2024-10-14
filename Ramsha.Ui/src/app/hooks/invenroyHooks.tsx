import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { INVENTORY_ITEMS_QUERY_KEY } from "../constants/queriesKey"
import { inventoryService } from "../api/services/inventoryService"
import { InventoryItemDto } from "../models/inventories/inventory"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"


const initialState: PaginationResponse<InventoryItemDto[]> = {
    items: [

    ]
}



export const useInventoryItems = (params: PagedParams) => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<InventoryItemDto[]>, Error>({
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


