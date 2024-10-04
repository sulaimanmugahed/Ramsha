import { CategoryFilter, ColumnFilter, FilterParams } from '../models/common/commonModels';
import { usePagedParams } from './routeHooks';

export const useFiltering = () => {
    const [params, setParams] = usePagedParams();
    const filterParams = params.filterParams || { columnsFilter: [], categories: [], globalFilterValue: null };

    // Function to update the column filters
    
    // Common function to update filterParams
    const updateFilterParams = (newFilters: Partial<FilterParams>) => {
        setParams({
            filterParams: {
                columnsFilter: newFilters.columnsFilter ?? filterParams.columnsFilter,
                categories: newFilters.categories ?? filterParams.categories,
                globalFilterValue: newFilters.globalFilterValue ?? filterParams.globalFilterValue,
            },
        });
    };

    const clearFilterParams = () => {
        setParams({
            filterParams: {
                columnsFilter: [],
                categories: [],
                globalFilterValue: null,
            },
        });
    };

    // Function to update the column filters
    const updateColumnsFilterParams = (newFilters: ColumnFilter[]) => {
        updateFilterParams({ columnsFilter: newFilters });
    };

    // Function to update categories
    const updateCategoryParams = (newCategories: CategoryFilter[]) => {
        updateFilterParams({ categories: newCategories });
    };

    // Function to update the global search value
    const updateGlobalFilterValue = (newGlobalFilterValue: string | null) => {
        updateFilterParams({ globalFilterValue: newGlobalFilterValue });
    };



    return {
        updateGlobalFilterValue,
        updateCategoryParams,
        updateColumnsFilterParams,
        updateFilterParams,
        clearFilterParams, // Expose the helper to update filters in bulk
        filterParams,
    };
};

