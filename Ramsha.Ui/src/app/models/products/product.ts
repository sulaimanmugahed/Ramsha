


export type ProductTag = {
    value: string
}


export type BrandDto = {
    id: string;
    name: string
}

export type ProductDto = {
    id: string
    name: string;
    description: string;
    created: string;
    status: string;
    imageUrl: string;
    category: string;
    brand: string;
}

export interface ProductVariantDto {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    sku: string;
    variantValues: VariantValuesDto[];
    variantImages: ProductImageDto[];
}

export type ProductImageDto = {
    url: string;
    isHome: boolean;
};

export type VariantValuesDto = {
    optionId: string;
    optionValueId: string;
    optionName?: string;
    valueName?: string;
};

export type SeoSettings = {
    metaTitle: string;
    urlSlug: string;
    metaDescription: string;
}

export type ProductDetail = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    status: ProductStatus;
    category: CategoryDto;
    brand: BrandDto;
    imageUrl: string;
    variants: ProductVariantDto[];
    tags: string[]
    seoSettings: SeoSettings
}



export type VariantDetailDto = {
    id: string;
    sku: string;
    quantity: number;
    basePrice: number;
    discountedPrice: number;
    variantValues: VariantValuesDto[];
};




export type ProductDetailsDto = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    discountPrice: number;
    category: CategoryDto;
    quantity: number;
    images: ProductImageDto[];
    variants: VariantDetailDto[];
    rating?: number;
};


export type CategoryDto = {
    id: string;
    label: string;
    children: CategoryDto[];
};




// enums.ts
export enum ProductStatus {
    Draft = 'Draft',
    Active = 'Active',
    InActive = 'InActive'
}
