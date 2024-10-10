import { PagedParams } from "../../models/common/commonModels";
import request from "../Request";

const BASE_URL = "catalog"


const getProducts = (params: PagedParams) =>
    request({
        url: `${BASE_URL}/products`,
        method: 'POST',
        data: params
    })

export const catalogService = {
    getProducts
}