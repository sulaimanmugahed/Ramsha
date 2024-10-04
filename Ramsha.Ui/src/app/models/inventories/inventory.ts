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
