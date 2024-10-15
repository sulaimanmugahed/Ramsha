import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { basketService } from "../api/services/basketService"
import { toast } from "sonner"
import { BASKET_QUERY_KEY } from "../constants/queriesKey"
import { Basket, BasketItem } from "../models/basket"
import { getCookie } from "../utils/util"

export const useBasketItemCommands = () => {

    const queryClient = useQueryClient()
    const { mutateAsync: addItem, isPending: isAddPending } = useMutation<BasketItem, Error, { inventoryItemId: string, quantity: number }>({
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


export const useBasket = () => {
    const { data, isLoading, isError } = useQuery<Basket, Error>({
        queryKey: [BASKET_QUERY_KEY],
        queryFn: async () => await basketService.getBasket(),
        enabled: !!getCookie('buyer')
    })

    return {
        basket: data,
        isBasketLoading: isLoading,
        isBasketError: isError
    }
}





