import { Column, ColumnDef } from '@tanstack/react-table'

export type FilterOperator = 'Equals' | 'LessThan' | 'GreaterThan' | 'Between' | 'Contains'
export type FilterVariant = 'Input' | 'NumberInput' | 'DatePicker' | 'Select'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: FilterVariant;
        options?: string[]
        allowedOperators?: FilterOperator[]
        excludeFromTable?: boolean;
        excludeFromExport?: boolean;
        defaultVisibility?: boolean;
        hidable?: boolean;
        type?:'image'
    }
}