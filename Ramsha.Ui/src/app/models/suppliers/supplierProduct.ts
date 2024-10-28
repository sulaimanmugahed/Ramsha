import { ProductImageDto, VariantValuesDto } from "../products/product"

export type SupplierProduct = {
    productId: string,
    name: string,
    category: string,
    description: string,
    imageUrl: string,
    totalVariants: string
}


export type SupplierVariant = {
    variantId: string,
    sku: string,
    wholesalePrice: number,
    retailPrice: number,
    description: string,
    variantImages: ProductImageDto[];
    variantValues: VariantValuesDto[]
}