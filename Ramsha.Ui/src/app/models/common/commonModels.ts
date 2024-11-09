
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
    errors: BaseError[] | null;
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
    operation: FilterOperator;
}

export type FilterOperator = 'Equals' | 'LessThan' | 'GreaterThan' | 'Between' | 'Contains'



export type PaginationParams ={
    pageNumber?: number;
    pageSize?: number;
}



export type SortingParams = {
    columnsSort: ColumnSort[];
}

export type ColumnSort =  {
    sortColumn: string;
    descending: boolean;
}

export type CategoryFilter = {
    value: string;
}

export type BrandFilter = {

} & CategoryFilter

export type FilterParams  = {
    columnsFilter?: ColumnFilter[];
    categories?: CategoryFilter[];
    brands?: BrandFilter[];
    globalFilterValue?: string | null;
}



export type PagedParams  = {
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


