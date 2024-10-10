import { useQuery } from "@tanstack/react-query"
import { PagedParams, PaginationResponse } from "../models/common/commonModels"
import { catalogService } from "../api/services/catalogService"



export const useCatalogProducts = (params: PagedParams) => {
    const { data, isLoading, isError } = useQuery<PaginationResponse<any[]>, Error>({
        queryKey: ["catalogProducts", params],
        queryFn: () => catalogService.getProducts(params),
    })

    return {
        products: data?.items,
        isProductsLoading: isLoading,
        isProductsError: isError
    }
}