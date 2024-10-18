export type SupplyRequest = {
    currency: string,
    items: SupplyRequestItem[]
}

export type SupplyRequestItem = {
    id: string,
    productId: string,
    productVariantId: string,
    sku: string,
    quantity: number,
    wholesalePrice: number
}