// types/api.ts

export enum ErrorCode {
    ModelStateNotValid = 0,
    ModelInvariantInvalid = 1,
    FieldDataInvalid = 2,
    MandatoryField = 3,
    InconsistentData = 4,
    RedundantData = 5,
    EmptyData = 6,
    LongData = 7,
    ShortData = 8,
    DataLengthInvalid = 9,
    BirthdateIsAfterNow = 10,
    RequestedDataNotExist = 11,
    DuplicateData = 12,
    DatabaseCommitException = 13,
    DatabaseCommitNotAffected = 14,
    NotFound = 15,
    ModelIsNull = 16,
    NotHaveAnyChangeInData = 17,
    InvalidOperation = 18,
    ThisDataAlreadyExist = 19,
    TamperedData = 20,
    NotInRange = 21,
    ErrorInApiIdentity = 22,
    AccessDenied = 23,
    ErrorInIdentity = 24,
    Exception = 25,
    LicenseException = 26,
    UnAuthorized = 27,
}

export interface BaseError {
    errorCode: ErrorCode;
    description?: string;
    fieldName?: string;
}

export interface BaseResult<TData = any> {
    success: boolean;
    errors: BaseError[] | null; // Allow errors to be null
    data?: TData;
}





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
    pageNumber?: number;
    pageSize?: number;
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
    productId?: string
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


