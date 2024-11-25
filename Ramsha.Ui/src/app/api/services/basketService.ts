import { Basket, BasketDetail, BasketItem } from "../../models/baskets/basket"
import request from "../Request"


const BASE_URL = 'baskets'


const getBasket = async () =>
    await request<Basket>({
        url: `${BASE_URL}`,
        method: 'GET',
    })



const removeBasket = async () =>
    await request<Basket>({
        url: `${BASE_URL}`,
        method: 'DELETE',
    })

const addBasketItem = async (data: { inventoryItemId: string, quantity: number }) =>
    await request<BasketItem>({
        url: `${BASE_URL}/addItemToBasket`,
        method: 'POST',
        data
    })

const removeBasketItem = async (data: { inventoryItemId: string, quantity: number }) =>
    await request({
        url: `${BASE_URL}/removeItemFromBasket`,
        method: 'DELETE',
        data
    })

const getBasketDetail = async () => {
    return await request<BasketDetail>({
        url: `${BASE_URL}/detail`,
        method: 'GET',
    })
}

export const basketService = {
    getBasket,
    addBasketItem,
    removeBasketItem,
    getBasketDetail,
    removeBasket
}

