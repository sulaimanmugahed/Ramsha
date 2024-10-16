import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { CatalogCategory } from "../models/catalog/catalogCategory"

import { catalogService } from "../api/services/catalogService"
import { CatalogProductDetailType } from "../models/catalog/catalogProduct"
import { INVENTORY_ITEMS_QUERY_KEY } from "../constants/queriesKey"



export const useCatalogProducts = (params: PagedParams) => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<any[]>, Error>({
        queryKey: ["catalogProducts", params],
        queryFn: async () => await catalogService.getProducts(params),
    })

    return {
        products: data?.items,
        isProductsLoading: isLoading,
        isProductsError: isError
    }
}

export const useInfiniteInventoryItems = (productId: string, productVariantId: string, params: PagedParams, enabled: boolean = true) => {

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
                queryKey: [INVENTORY_ITEMS_QUERY_KEY, productId, productVariantId, params],
                enabled,
                queryFn: async ({ pageParam }: { pageParam: number }) => {
                    const { paginationParams, ...others } = params
                    return await catalogService.getInventoryItems(productId, productVariantId, { paginationParams: { ...paginationParams, pageNumber: pageParam }, ...others })
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
    const { data, isLoading, isError } = useQuery<CatalogCategory[], Error>({
        queryKey: ["catalogCategories"],
        queryFn: async () => await catalogService.getCategories(),
    })

    return {
        categories: data,
        isCategoriesLoading: isLoading,
        isCategoriesError: isError
    }
}