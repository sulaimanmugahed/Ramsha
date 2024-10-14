import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import {

    PagedParams,
} from '../models/common/commonModels';
import { deserializeParams, serializeParams } from '../utils/util';

export function usePagedParams(): [PagedParams, (partialParams: Partial<PagedParams>) => void] {
    const [searchParams, setSearchParams] = useSearchParams();


    const getParams = useCallback(() => {
        return deserializeParams(searchParams);
    }, [searchParams]);

    const setParams = useCallback((partialParams: Partial<PagedParams>) => {
        const currentParams = getParams();


        const updatedPaginationParams = {
            ...currentParams.paginationParams,
            ...(partialParams.paginationParams || {}),
        };


        const updatedSortingParams = partialParams.sortingParams
            ? {
                columnsSort: [
                    ...(partialParams.sortingParams?.columnsSort || []),
                ],
            }
            : currentParams.sortingParams;


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

        const updatedVariantParams = {
            ...currentParams.variantParams,
            ...(partialParams.variantParams || {}),
        };

        // Correctly access variantId from partialParams
        const updatedVariantId = partialParams.variantId || currentParams.variantId || undefined;


        const updatedSku = partialParams.sku || currentParams.sku || '';


        const updatedParams = {
            paginationParams: updatedPaginationParams,
            sortingParams: updatedSortingParams,
            filterParams: updatedFilterParams,
            variantParams: updatedVariantParams,
            variantId: updatedVariantId,
            sku: updatedSku
        };

        setSearchParams(serializeParams(updatedParams));
    }, [getParams, setSearchParams]);

    return [getParams(), setParams];
}


