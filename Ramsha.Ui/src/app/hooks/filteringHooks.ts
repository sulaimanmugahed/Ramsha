import { CategoryFilter, ColumnFilter, FilterParams } from '../models/common/commonModels';
import { usePagedParams } from './routeHooks';

type FilteringHookOptions = {
    defaultFilterParams?: FilterParams;
};

export const useFiltering = (options: FilteringHookOptions = {}) => {
    const [params, setParams] = usePagedParams();

    const defaultFilterParams: FilterParams = options.defaultFilterParams || {
        columnsFilter: [],
        categories: [],
        brands: [],
        globalFilterValue: null,
    };

    const filterParams = params.filterParams || defaultFilterParams;

    const updateFilterParams = (newFilters: Partial<FilterParams>) => {
        setParams({
            filterParams: {
                columnsFilter: newFilters.columnsFilter ?? filterParams.columnsFilter,
                categories: newFilters.categories ?? filterParams.categories,
                brands: newFilters.brands ?? filterParams.brands,
                globalFilterValue: newFilters.globalFilterValue ?? filterParams.globalFilterValue,
            },
        });
    };

    const clearFilterParams = () => {
        setParams({
            filterParams: {
                columnsFilter: [],
                categories: [],
                brands: [],
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

