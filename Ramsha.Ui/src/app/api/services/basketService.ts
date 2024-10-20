import { Basket, BasketItem } from "../../models/basket"
import request from "../Request"


const BASE_URL = 'baskets'


const getBasket = async () =>
    await request<Basket>({
        url: `${BASE_URL}`,
        method: 'GET',
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

export const basketService = {
    getBasket,
    addBasketItem,
    removeBasketItem
}

