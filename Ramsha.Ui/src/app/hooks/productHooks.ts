import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productService } from "../api/services/productService"
import { BrandDto, ProductDto, ProductTag, ProductVariantDto } from "../models/products/product"
import { toast } from "sonner"
import { BRANDS_QUERY_KEY, PRODUCT_TAGS_QUERY_KEY, PRODUCTS_QUERY_KEY, PRODUCT_VARIANTS_QUERY_KEY } from "../constants/queriesKey"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"



const initialProducts: PaginationResponse<ProductDto[]> = {
    items: []
}

export const useProducts = (params: PagedParams) => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<ProductDto[]>, Error>({
        queryKey: [PRODUCTS_QUERY_KEY, params],
        queryFn: () => productService.getProductsPaged(params),
        initialData: initialProducts
    })

    return {
        products: data.items,
        metaData: data.metaData,
        isProductsLoading: isLoading,
        isProductsError: isError
    }
}

const initialTags: ProductTag[] = []

export const useProductTags = () => {
    const { data, isLoading, isError } = useQuery<ProductTag[], Error>({
        queryKey: [PRODUCT_TAGS_QUERY_KEY],
        queryFn: async () => await productService.getTags(),
        initialData: initialTags
    })

    return {
        tags: data,
        isTagsLoading: isLoading,
        isTagsError: isError
    }
}


const initialBrands: BrandDto[] = []


export const useProductBrands = () => {
    const { data, isLoading, isError } = useQuery<BrandDto[], Error>({
        queryKey: [BRANDS_QUERY_KEY],
        queryFn: async () => await productService.getBrands(),
        initialData: initialBrands
    })

    return {
        brands: data,
        isBrandsLoading: isLoading,
        isBrandsError: isError
    }
}

const initialVariants: ProductVariantDto[] = []


export const useProductVariants = (productId: string) => {
    const { data, isLoading, isError } = useQuery<ProductVariantDto[], Error>({
        queryKey: [PRODUCT_VARIANTS_QUERY_KEY, productId],
        queryFn: async () => await productService.getProductVariants(productId),
        initialData: initialVariants
    })

    return {
        variants: data,
        isVariantsLoading: isLoading,
        isVariantsError: isError
    }
}

export const useProductVariant = (productId: string, variantId: string) => {
    const { data, isLoading, isError } = useQuery<ProductVariantDto, Error>({
        queryKey: [PRODUCT_VARIANTS_QUERY_KEY, productId, variantId],
        queryFn: async () => await productService.getProductVariant(productId, variantId),
    })

    return {
        variant: data,
        isVariantLoading: isLoading,
        isVariantError: isError
    }
}

export const useDeleteVariant = () => {
    const { mutateAsync } = useMutation({
        mutationFn: async ({ productId, variantId }: { productId: string, variantId: string }) =>
            await productService.removeVariant({ productId, variantId })
    })

    return {
        deleteVariant: mutateAsync,
    }
}

export const useUpdateVariant = (productId: string, variantId: string) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: any) =>
            await productService.updateVariant({ productId, variantId, data })
    })

    return {
        updateVariant: mutateAsync,
    }
}


export const useCreateProduct = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: any) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return await productService.createProduct(data)
        },
        onError: () => toast.error("couldn't create the product"),
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
            toast.success("create the product success")
        },
    })
    return {
        submitProductBasic: mutateAsync,
        isPending
    }
}

export const useDeleteProducts = () => {

    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (productsIds: string[]) => await productService.removeRange(productsIds),
        onError: () => toast.error("couldn't delete the products"),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCTS_QUERY_KEY] })
            toast.success("Created the products success")
        }
    })
    return {
        deleteProducts: mutateAsync,
        isDeleteProductsPending: isPending
    }
}

export const useProductForm = (id?: string) => {
    const { mutateAsync } = useMutation({
        mutationFn: async (data: any) => {
            return id ?
                await productService.editProduct(data, id) :
                await productService.createProduct(data);
        },
    })
    return {
        submitProduct: mutateAsync
    }
}

export const useAddVariants = () => {
    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, productId }: { data: any, productId: string }) => {
            return await productService.addVariants(data, productId)
        },
    })
    return {
        addProductVariants: mutateAsync
    }
}

export const useAddVariant = () => {
    const queryClient = useQueryClient()

    const { mutateAsync } = useMutation({
        mutationFn: async ({ data, productId }: { data: any, productId: string }) => {
            return await productService.addVariant(data, productId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PRODUCT_VARIANTS_QUERY_KEY] })
            toast.success("success")
        },
        onError: () => toast.error("error")
    })
    return {
        addVariant: mutateAsync
    }
}