import { PagedParams } from "../../models/common/commonModels";
import request from "../Request";


const BASE_URL = "inventory"

const getInventoryItems = async (params: PagedParams) =>
    await request({
        url: BASE_URL,
        method: 'POST',
        data: params
    })



export const inventoryService = {
    getInventoryItems
}