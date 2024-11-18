import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { Discount, InventoryItemDto } from "../../models/inventories/inventory";
import request from "../Request";


const BASE_URL = "inventory"

const getInventoryItems = async (params: PagedParams) =>
    await request<PaginationResponse<InventoryItemDto[]>>({
        url: BASE_URL,
        method: 'POST',
        data: params
    })


const applyDiscount = async (itemId: string, data: Discount) => {
    return await request({
        url: `${BASE_URL}/${itemId}/discount`,
        method: 'POST',
        data
    })
}



export const inventoryService = {
    getInventoryItems,
    applyDiscount
}