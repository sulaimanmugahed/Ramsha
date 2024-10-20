import { PagedParams, PaginationResponse } from "../../models/common/commonModels";
import { InventoryItemDto } from "../../models/inventories/inventory";
import request from "../Request";


const BASE_URL = "inventory"

const getInventoryItems = async (params: PagedParams) =>
    await request<PaginationResponse<InventoryItemDto[]>>({
        url: BASE_URL,
        method: 'POST',
        data: params
    })



export const inventoryService = {
    getInventoryItems
}