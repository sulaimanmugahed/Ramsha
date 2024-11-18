export type Basket = {
    items: BasketItem[];
    buyer: string
    paymentIntentId: string
    clientSecret: string
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



export type BasketItemDetail = {
    inventoryItemId: string;
    name: string;
    sku: string;
    imageUrl?: string;
    basePrice: number;
    discountedPrice: number;
    totalPrice: number;
    quantity: number;
    deliveryFee: number;
};

export type BasketSupplierGroupDetail = {
    supplierId: string;
    name: string;
    totalPrice: number;
    totalDeliveryFees: number;
    items: BasketItemDetail[];
};

export type BasketDetail = {
    supplierGroups: BasketSupplierGroupDetail[];
    totalDeliveryFees: number;
    totalPrice: number;
};


