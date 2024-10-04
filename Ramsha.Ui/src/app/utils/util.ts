import { ColumnDef } from "@tanstack/react-table";
import dayjs from 'dayjs';
import { PagedParams, PaginationParams, CategoryFilter, FilterParams, SortingParams, ColumnSort, ColumnFilter } from "../models/common/commonModels";




export function serializeParams(params: PagedParams): string {
    const { paginationParams, sortingParams, filterParams } = params;

    const serializedPagination = paginationParams
        ? `pageNumber=${paginationParams.pageNumber}&pageSize=${paginationParams.pageSize}`
        : '';

    const serializedSorting = sortingParams
        ? sortingParams.columnsSort
            .map(
                (sort) =>
                    `sortColumn=${encodeURIComponent(sort.sortColumn)}&descending=${sort.descending}`
            )
            .join('&')
        : '';

    const serializedFilters = filterParams
        ? [
            filterParams.columnsFilter?.map((filter) => {
                const base = `filterColumn=${encodeURIComponent(filter.filterColumn)}&value=${encodeURIComponent(filter.value)}`;
                const operator = filter.operation ? `&operation=${encodeURIComponent(filter.operation)}` : '';
                const valueTo = filter.valueTo ? `&valueTo=${encodeURIComponent(filter.valueTo)}` : '';
                return base + operator + valueTo;
            }).join('&'),
            filterParams.categories?.map(category => `categories=${encodeURIComponent(category.value)}`).join('&'),
            filterParams.globalFilterValue ? `globalFilterValue=${encodeURIComponent(filterParams.globalFilterValue)}` : ''
        ].filter(Boolean).join('&')
        : '';

    return `${serializedPagination}&${serializedSorting}&${serializedFilters}`.replace(/^&/, '');
}




export function deserializeParams(searchParams: URLSearchParams): PagedParams {
    const paginationParams: PaginationParams = {
        pageNumber: parseInt(searchParams.get('pageNumber') || '1', 10),
        pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    };

    const columnsSort: ColumnSort[] = searchParams.getAll('sortColumn').map((column, index) => ({
        sortColumn: decodeURIComponent(column),
        descending: searchParams.getAll('descending')[index] === 'true',
    }));

    const columnsFilter: ColumnFilter[] = searchParams.getAll('filterColumn').map((column, index) => ({
        filterColumn: decodeURIComponent(column),
        value: decodeURIComponent(searchParams.getAll('value')[index]),
        operation: decodeURIComponent(searchParams.getAll('operation')[index]),
        valueTo: decodeURIComponent(searchParams.getAll('valueTo')[index]),
    }));

    const categories: CategoryFilter[] = searchParams.getAll('categories').map(cat => ({
        value: decodeURIComponent(cat)
    }));

    const globalFilterValue: string | null = searchParams.get('globalFilterValue') || null;

    const filterParams: FilterParams | undefined = columnsFilter.length || categories.length || globalFilterValue
        ? { columnsFilter, categories, globalFilterValue }
        : undefined;

    const sortingParams: SortingParams | undefined = columnsSort.length
        ? { columnsSort }
        : undefined;


    return {
        paginationParams,
        sortingParams,
        filterParams,
    };
}








function serializeParamsShort(params: PagedParams): string {
    const { paginationParams, sortingParams, filterParams } = params;

    const serializedPagination = paginationParams
        ? `p=${paginationParams.pageNumber}&ps=${paginationParams.pageSize}`
        : '';

    const serializedSorting = sortingParams
        ? sortingParams.columnsSort
            .map(
                (sort) =>
                    `sc=${encodeURIComponent(sort.sortColumn)}&desc=${sort.descending}`
            )
            .join('&')
        : '';

    const serializedFilters = filterParams
        ? [
            filterParams.columnsFilter?.map((filter) => {
                const base = `fc=${encodeURIComponent(filter.filterColumn)}&value=${encodeURIComponent(filter.value)}`;
                const operator = filter.operation ? `&op=${encodeURIComponent(filter.operation)}` : '';
                const valueTo = filter.valueTo ? `&valueTo=${encodeURIComponent(filter.valueTo)}` : '';
                return base + operator + valueTo;
            }).join('&'),
            filterParams.categories?.map(category => `cat=${encodeURIComponent(category.value)}`).join('&'),
            filterParams.globalFilterValue ? `gf=${encodeURIComponent(filterParams.globalFilterValue)}` : ''
        ].filter(Boolean).join('&')
        : '';

    return `${serializedPagination}&${serializedSorting}&${serializedFilters}`.replace(/^&/, '');
}


function deserializeParamsShort(searchParams: URLSearchParams): PagedParams {
    const paginationParams: PaginationParams = {
        pageNumber: parseInt(searchParams.get('p') || '1', 10),
        pageSize: parseInt(searchParams.get('ps') || '10', 10),
    };

    const columnsSort: ColumnSort[] = searchParams.getAll('sc').map((column, index) => ({
        sortColumn: decodeURIComponent(column),
        descending: searchParams.getAll('desc')[index] === 'true',
    }));

    const columnsFilter: ColumnFilter[] = searchParams.getAll('fc').map((column, index) => ({
        filterColumn: decodeURIComponent(column),
        value: decodeURIComponent(searchParams.getAll('value')[index]),
        operation: decodeURIComponent(searchParams.getAll('op')[index]),
        valueTo: decodeURIComponent(searchParams.getAll('valueTo')[index]),
    }));

    const categories: CategoryFilter[] = searchParams.getAll('cat').map(cat => ({
        value: decodeURIComponent(cat)
    }));

    const globalFilterValue: string | null = searchParams.get('gf') || null;

    const filterParams: FilterParams | undefined = columnsFilter.length || categories.length || globalFilterValue
        ? { columnsFilter, categories, globalFilterValue }
        : undefined;

    const sortingParams: SortingParams | undefined = columnsSort.length
        ? { columnsSort }
        : undefined;

    return {
        paginationParams,
        sortingParams,
        filterParams,
    };
}











export const checkDuplicateVariants = (variants: any[]) => {
    return variants.some((variant, index) => {
        const currentOptions = variant.variantValues.map((v: any) => `${v.option}:${v.value}`).join(',');
        return variants.slice(0, index).some(prevVariant => {
            const previousOptions = prevVariant.variantValues.map((v: any) => `${v.option}:${v.value}`).join(',');
            return currentOptions === previousOptions;
        });
    });
};


export const createFormData = <T extends Record<string, any>>(data: T): FormData => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value instanceof File || value instanceof Blob) {
            formData.append(key, value); 
        }
        else if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item instanceof File || item instanceof Blob) {
                    formData.append(key, item); 
                } else {
                    formData.append(`${key}[]`, item); 
                }
            });
        }
        else if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });

    return formData;
};



export function mapRowWithColumns<T extends object>(
    rows: T[],
    columns: ColumnDef<T, any>[]
): any[][] {
    return rows.map(row => {
        return columns.flatMap(columnId => row[columnId.id as keyof T]);
    });

}






export const flattenObject = (obj: Record<string, any>, prefix = ''): Record<string, string> => {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value === 'object') {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    Object.assign(result, flattenObject(item, `${newKey}[${index}]`));
                });
            } else {
                Object.assign(result, flattenObject(value, newKey));
            }
        } else {
            result[newKey] = value === null ? '' : value.toString();
        }
    }

    return result;
};

export const unFlattenObject = (data: Record<string, string>): Record<string, any> => {
    const result: Record<string, any> = {};

    Object.keys(data).forEach(key => {
        const value = data[key];
        const keys = key.split(/[\.\[\]]+/).filter(Boolean); // Split by dot or brackets
        keys.reduce((acc, part, i) => {
            if (i === keys.length - 1) {
                acc[part] = value;
            } else {
                if (!acc[part]) {
                    const nextKey = keys[i + 1];
                    acc[part] = isNaN(Number(nextKey)) ? {} : [];
                }
                return acc[part];
            }
        }, result);
    });

    return result;
};


