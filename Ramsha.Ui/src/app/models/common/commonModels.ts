

export enum ExportType {
    Excel,
    PDF
}


export type PreviewImageType = {
    url: string;
}

export type FormFileType = {
    preview?: string;
    file?: File

}


export type PreviewVariantType = {
    id?: string
    name: string;
    description: string;
    basePrice: number;
    variantValues: {
        optionName: string
        valueName: string
        optionId: string
        optionValueId: string
    }[]
    variantImages: {
        url: string;
    }[]
}

export type PagedMetaData = {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    globalFilterValue: string;
    columnsFilter: ColumnFilter[];
    columnsSort: ColumnSort[];
}



export class PaginationResponse<T> {
    items: T;
    metaData?: PagedMetaData;

    constructor(items: T, metaData: PagedMetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}

export type ColumnFilter = {
    filterColumn: string;
    value: string;
    valueTo?: string;
    operation: string;
}

export type ComparisonOperator = {
    value: 'Equal' | 'LessThan' | 'GreaterThan' | 'Between' | 'Contains'
}


export interface PaginationParams {
    pageNumber: number;
    pageSize: number;
}



export interface SortingParams {
    columnsSort: ColumnSort[];
}

export interface ColumnSort {
    sortColumn: string;
    descending: boolean;
}

export interface CategoryFilter {
    value: string;
}

export interface FilterParams {
    columnsFilter?: ColumnFilter[];
    categories?: CategoryFilter[];
    globalFilterValue?: string | null;
}



export interface PagedParams {
    paginationParams: PaginationParams;
    sortingParams?: SortingParams;
    filterParams?: FilterParams;
    variantParams?: { [key: string]: string };
    variantId?: string | null
    sku?: string | null
}

export type UploadRequest = {
    file: File,
    path: string
}

export type UploadRangeRequest = {
    files: File[],
    path: string
}

export type UploadResponse = {
    url: string
    fullPath: string
}


