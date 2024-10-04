export type Basket = {
    items: BasketItem[];
    buyer: string
}


export type BasketItem = {
    quantity: number;
    productId: string;
    name: string;
    retailPrice: number;
    discountedPrice: number;
    categoryName: string;
    inventorySku: string;
    imageUrl: string;
}