import { useQuery } from "@tanstack/react-query"
import { CATEGORIES_QUERY_KEY } from "../constants/queriesKey"
import { categoryService } from "../api/services/categoryService"
import { CategoryDto } from "../models/products/product"

const initialData: CategoryDto[] = []

export const useCategories = () => {
    const { data, isLoading, isError } = useQuery<CategoryDto[], Error>({
        queryKey: [CATEGORIES_QUERY_KEY],
        queryFn: async () => await categoryService.getCategories(),
        initialData
    })


    return {
        categories: data,
        isCategoriesLoading: isLoading,
        isCategoriesError: isError
    }
}