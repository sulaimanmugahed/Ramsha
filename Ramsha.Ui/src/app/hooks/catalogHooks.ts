import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { CatalogCategory } from "../models/catalog/catalogCategory"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"

import { catalogService } from "../api/services/catalogService"
import { INVENTORY_ITEMS_QUERY_KEY } from "../constants/queriesKey"
import { CatalogProduct, CatalogProductDetailType, CatalogVariant } from "../models/catalog/catalogProduct"
import { CurrencyCode } from "../models/common/currency"



export const useCatalogProducts = (params: PagedParams, preferredCurrency: CurrencyCode = 'SAR') => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<CatalogProduct[]>>({
        queryKey: ["catalogProducts", params],
        queryFn: async () => await catalogService.getProducts(params, preferredCurrency),
    })

    return {
        products: data?.items,
        isProductsLoading: isLoading,
        isProductsError: isError
    }
}

export const useCatalogProductVariant = (productId: string, variantId?: string | null) => {
    const { data, isLoading, isError } = useQuery<CatalogVariant>({
        queryKey: ["catalogProductVariant", productId, variantId],
        queryFn: async () => await catalogService.getProductVariant(productId, variantId),
    })

    return {
        variant: data,
        isVariantLoading: isLoading,
        isVariantError: isError
    }
}



export const useInfiniteInventoryItems = (productId: string, params: PagedParams, enabled: boolean = true) => {

    const {
        data,
        status,
        fetchNextPage,
        hasNextPage,
        error,
        isError,
        isLoading,
        isFetching,
        refetch,
        isFetchingNextPage } = useInfiniteQuery(
            {
                queryKey: [INVENTORY_ITEMS_QUERY_KEY, productId, { ...params }],
                enabled,
                queryFn: async ({ pageParam }: { pageParam: number }) => {
                    const { paginationParams, ...others } = params
                    return await catalogService.getInventoryItems(productId, { paginationParams: { ...paginationParams, pageNumber: pageParam }, ...others })
                },
                initialPageParam: 1,

                getNextPageParam: (lastPage) => {

                    const nextPage = lastPage?.metaData?.pageNumber! + 1;
                    return nextPage;
                },
                meta: {
                    errorMessage: 'some_thing_went_wrong',
                },
            })

    return {
        items: data?.pages.flatMap((page) => page.items),
        fetchNextItemsPage: fetchNextPage,
        hasNextItemsPage: hasNextPage,
        isFetchingNextItemsPage: isFetchingNextPage,
        isLoadingItems: isLoading,
        isFetchingItems: isFetching,
        fetchingItemsStatus: status,
        fetchingItemsError: error,
        isFetchingItemsError: isError,
        refetch
    }

}


export const useCatalogProductDetail = (productId: string) => {
    const { data, isLoading, isError, isSuccess } = useQuery<CatalogProductDetailType, Error>({
        queryKey: ["catalogProducts", productId],
        queryFn: async () => await catalogService.getProductDetail(productId),
    })

    return {
        product: data,
        isProductLoading: isLoading,
        isProductError: isError,
        isProductSuccess: isSuccess
    }
}


export const useCatalogCategories = () => {
    const { data, isLoading, isError } = useQuery<CatalogCategory[]>({
        queryKey: ["catalogCategories"],
        queryFn: async () => await catalogService.getCategories(),
    })

    return {
        categories: data,
        isCategoriesLoading: isLoading,
        isCategoriesError: isError
    }
}