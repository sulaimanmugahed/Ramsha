export type Basket = {
    items: BasketItem[];
    buyer: string
}


export type BasketItem = {
    quantity: number;
    inventoryItemId: string;
    name: string;
    basePrice: number;
    finalPrice: number;
    categoryName: string;
    inventorySku: string;
    imageUrl: string;
}