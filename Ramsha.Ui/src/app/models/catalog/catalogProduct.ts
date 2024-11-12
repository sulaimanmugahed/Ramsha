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
    availableQuantity: number;
    sku: string;
    basePrice: number;
    finalPrice: number;
    images: { url: string; isHome: boolean; }[]
    supplierDetail: {
        firstName: string;
        lastName: string
    }
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
    description: string;
    category: string;
    brand: string;
    imageUrl: string;
    totalQuantity: number;
    averageRating: number;
    numberOfRatings: number;
}