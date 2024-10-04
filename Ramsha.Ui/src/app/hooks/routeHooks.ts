import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import {
    ColumnFilter,
    PaginationParams,
    ColumnSort,
    SortingParams,
    FilterParams,
    PagedParams,
    CategoryFilter,
} from '../models/common/commonModels';
import { deserializeParams, serializeParams } from '../utils/util';

export function usePagedParams(): [PagedParams, (partialParams: Partial<PagedParams>) => void] {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParams = useCallback(() => {
        return deserializeParams(searchParams);
    }, [searchParams]);

    const setParams = useCallback((partialParams: Partial<PagedParams>) => {
        const currentParams = getParams();

        // Merge pagination params, replacing existing values
        const updatedPaginationParams = {
            ...currentParams.paginationParams,
            ...(partialParams.paginationParams || {}),
        };

        // Merge sorting params, replacing existing sorting columns
        const updatedSortingParams = partialParams.sortingParams
            ? {
                columnsSort: [
                    ...(partialParams.sortingParams?.columnsSort || []),
                ],
            }
            : currentParams.sortingParams;

       // Merge filter params, replacing existing filters
        const updatedFilterParams = partialParams.filterParams
            ? {
                columnsFilter: [
                    ...(partialParams.filterParams?.columnsFilter || []),
                ],
                categories: [
                    ...(partialParams.filterParams?.categories || []),
                ],
                globalFilterValue: partialParams.filterParams.globalFilterValue || null
            }
            : currentParams.filterParams;

    
         

        const updatedParams = {
            paginationParams: updatedPaginationParams,
            sortingParams: updatedSortingParams,
            filterParams: updatedFilterParams,
        };

        setSearchParams(serializeParams(updatedParams));
    }, [getParams, setSearchParams]);

    return [getParams(), setParams];
}


