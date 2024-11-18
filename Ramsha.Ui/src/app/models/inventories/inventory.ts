export type InventoryItemDto = {
    id: string;
    productName: string;
    wholePrice: number;
    retailPrice: number;
    inventorySKU: string;
    quantity: number;
    status: string;
    imageUrl?: string;
};

export type DiscountType = 'Percentage' | 'FixedAmount'


export type Discount = {
    type: DiscountType;
    value: number;
    startDate: string;
    endDate: string;
}
