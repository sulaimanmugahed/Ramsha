import { useQuery } from "@tanstack/react-query"
import { brandService } from "../api/services/brandService"
import { BRANDS_QUERY_KEY } from "../constants/queriesKey"
import { BrandDto } from "../models/products/product"

export const useBrands = () => {
    const { data, isLoading, isError } = useQuery<BrandDto[]>({
        queryKey: [BRANDS_QUERY_KEY],
        queryFn: async () => await brandService.getBrands(),

    })

    return {
        brands: data,
        isBrandsLoading: isLoading,
        isBrandsError: isError
    }
}