export interface StockPrice {
    wholesalePrice: number;
    retailPrice: number;      // Recommended retail price
    finalPrice: number;       // Final price the product will be sold at
    currency: string;         // Currency for the prices (e.g., USD, EUR)
}

export interface SupplierInventoryItem {
    id: string;      // UUID for the inventory item
    productName: string;          // Name of the product
    sku: string;                  // Stock Keeping Unit (SKU)
    availableQuantity: number;    // Quantity available for sale
    totalQuantity: number;        // Total quantity in inventory (available + reserved)
    activePrice: StockPrice;   // Active pricing details (wholesale, retail, final prices)
    imageUrl: string;             // URL for the product image
    averageRating: number;        // Average rating of the product
    numberOfRatings: number;      // Total number of ratings the product has received
}
