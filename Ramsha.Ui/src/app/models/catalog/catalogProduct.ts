export type CatalogProduct = {
    id: string;
    name: string;
    category: string;
    imageUrl: string;
    totalQuantity: number;
    minPrice: number;
    maxPrice: number;
    brand: string;
    averageRating: number;
    numberOfRatings: number;
}



export interface CatalogInventoryItem {
    id: string;
    supplierId: string;
    variantId: string;
    availableQuantity: number;
    totalQuantity: number;
    sku: string;
    basePrice: number;
    finalPrice: number;
}

export interface CatalogVariantValue {
    optionName: string;
    valueName: string;
}

export interface CatalogVariant {
    id: string;
    name: string;
    description: string;
    sku: string;
    variantValues: CatalogVariantValue[];
}

export interface CatalogProductDetailType {
    id: string;
    name: string;
    minPrice: number;
    maxPrice: number;
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
    totalQuantity: number;
    availableQuantity: number;
    averageRating: number;
    numberOfRatings: number;
    totalVariants: number,
    totalSuppliers: number
}