import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { basketService } from "../api/services/basketService"
import { BASKET_DELIVERY_DETAIL_QUERY_KEY, BASKET_QUERY_KEY } from "../constants/queriesKey"
import { Basket, BasketDetail, BasketItem } from "../models/baskets/basket"
import AppError from "../utils/appError"
import { getCookie } from "../utils/util"
import { useAccount } from "./accountHooks"

export const useBasketItemCommands = () => {

    const queryClient = useQueryClient()
    const { mutateAsync: addItem, isPending: isAddPending } = useMutation<BasketItem, AppError, { inventoryItemId: string, quantity: number }>({
        mutationFn: async (data) => await basketService.addBasketItem(data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData([BASKET_QUERY_KEY], (oldBasket: Basket) => {
                if (!oldBasket) return;

                const existingItemIndex = oldBasket.items.findIndex(
                    (item) => item.inventoryItemId === variables.inventoryItemId
                );

                let updatedItems: BasketItem[] = [...oldBasket.items];
                if (existingItemIndex >= 0) {
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + variables.quantity
                    };
                } else {
                    updatedItems.push(data)
                }

                return {
                    ...oldBasket,
                    items: updatedItems
                };
            })
        },
        onError: () => toast.error("item failed to add")
    })

    const { mutateAsync: removeItem, isPending: isRemovePending } = useMutation<any, Error, { inventoryItemId: string, quantity: number }>({
        mutationFn: async (data: { inventoryItemId: string, quantity: number }) => await basketService.removeBasketItem(data),
        onSuccess: (_, variables) => {
            queryClient.setQueryData([BASKET_QUERY_KEY], (oldBasket: Basket | undefined) => {
                if (!oldBasket) return;

                const existingItemIndex = oldBasket.items.findIndex(
                    (item) => item.inventoryItemId === variables.inventoryItemId
                );

                if (existingItemIndex >= 0) {
                    let updatedItems: BasketItem[] = [...oldBasket.items];

                    const updatedQuantity = updatedItems[existingItemIndex].quantity - variables.quantity;

                    if (updatedQuantity > 0) {
                        updatedItems[existingItemIndex] = {
                            ...updatedItems[existingItemIndex],
                            quantity: updatedQuantity,
                        };
                    } else {
                        updatedItems.splice(existingItemIndex, 1);
                    }

                    return { ...oldBasket, items: updatedItems };
                }

                return oldBasket;
            });
        },

        onError: () => toast.error("item failed to add")
    })

    return {
        addItem,
        isAddPending,
        isRemovePending,
        removeItem
    }
}


export const useBasketDetail = () => {
    const { data, isLoading } = useQuery<BasketDetail>({
        queryKey: [BASKET_DELIVERY_DETAIL_QUERY_KEY, 'detail'],
        queryFn: async () => await basketService.getBasketDetail()
    })

    return {
        basketDetail: data,
        isLoading
    }
}


export const useBasket = () => {
    const { account } = useAccount()
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery<Basket>({
        queryKey: [BASKET_QUERY_KEY],
        queryFn: async () => await basketService.getBasket(),
        enabled: !!getCookie('buyer') || account?.role === 'Customer'
    })


    const clearBasket = () => {
        queryClient.setQueryData([BASKET_QUERY_KEY], null)
    }

    return {
        basket: data,
        isBasketLoading: isLoading,
        isBasketError: isError,
        clearBasket
    }
}





