import { ColumnDef, ColumnFiltersState, getCoreRowModel, OnChangeFn, PaginationState, Row, RowSelectionState, SortingState, Table, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";


interface UseServerDataTableProps<TData> {
    data: TData[]
    columns: ColumnDef<TData, any>[],
    totalCount?: number,
    rowIdAccessor: keyof TData;
    columnVisibility?: VisibilityState,
    onColumnVisibilityChange?: OnChangeFn<VisibilityState>
    sorting?: SortingState
    onSortingChange?: OnChangeFn<SortingState>
    enableSorting?: boolean
    enableSortingRemoval?: boolean
}

export const useServerDataTable = <TData extends object>({
    data,
    columns,
    columnVisibility,
    onColumnVisibilityChange,
    rowIdAccessor,
    enableSorting,
    sorting,
    enableSortingRemoval = false,
    onSortingChange
}: UseServerDataTableProps<TData>) => {

    const filteredColumn = useMemo(() => columns.filter(column => !(column.meta?.excludeFromTable)), [columns])

    const {
        getRowModel,
        getHeaderGroups,

    } = useReactTable({
        data,
        columns: filteredColumn,
        getCoreRowModel: getCoreRowModel(),
        enableMultiSort: true,
        enableMultiRemove: true,
        maxMultiSortColCount: 3,
        manualPagination: true,
        manualFiltering: true,
        getRowId: (row) => row[rowIdAccessor] as unknown as string,
        state: {
            columnVisibility,
            sorting
        },
        onColumnVisibilityChange,
        enableSorting,
        manualSorting: true,
        enableSortingRemoval,
        onSortingChange

    })

    const getRows = () => getRowModel().rows;
    return {
        getRows,
        getHeaderGroups
    }
}


export function useTableRowSelection<T>() {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const onRowSelectionChange = useCallback(
        (row: Row<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
            row.getToggleSelectedHandler()(event);
            if (!row.getIsSelected()) {
                setSelectedRows((prev) => [...prev, row.original]);
            } else {
                setSelectedRows((prev) => prev.filter((item) => item !== row.original));
            }
        },
        [],
    );

    const onAllRowsSelectionChange = useCallback(
        (table: Table<T>) => (event: React.ChangeEvent<HTMLInputElement>) => {
            table.getToggleAllRowsSelectedHandler()(event);
            if (table.getIsAllRowsSelected()) {
                setSelectedRows([]);
            } else {
                setSelectedRows(table.getPreSelectedRowModel().rows.map((row) => row.original));
            }
        },
        [],
    );

    return {
        selectedRows,
        onRowSelectionChange,
        onAllRowsSelectionChange,
    };
}




type VisibilityState = Record<string, boolean>;

export const useColumnVisibility = <TData>(columns: ColumnDef<TData, any>[], initialVisibility: VisibilityState = {}) => {
    const initialVisibilityState = useMemo(() => {
        const state: VisibilityState = {};
        columns.forEach(column => {
            const columnId = column.id as string;
            if (initialVisibility[columnId] === undefined) {
                state[columnId] = column.meta?.defaultVisibility ?? true;
            } else {
                state[columnId] = initialVisibility[columnId];
            }
        });
        return state;
    }, [columns, initialVisibility]);

    // Use a ref to track whether the initial state has been applied
    const hasInitialized = useRef(false);

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => ({
        ...initialVisibilityState
    }));

    useEffect(() => {
        if (!hasInitialized.current) {
            // Only set the initial state once
            hasInitialized.current = true;
            setColumnVisibility(initialVisibilityState);
        }
    }, [initialVisibilityState]);


    const handleColumnVisibilityChange = useCallback(
        (updaterOrValue: VisibilityState | ((old: VisibilityState) => VisibilityState)) => {
            if (typeof updaterOrValue === 'function') {
                setColumnVisibility(prevVisibility => updaterOrValue(prevVisibility));
            } else {
                setColumnVisibility(updaterOrValue);
            }
        },
        []
    );


    // Toggle a specific column visibility
    const toggleColumnVisibility = useCallback((id: string) => {
        setColumnVisibility(prevVisibility => {
            const newVisibility = {
                ...prevVisibility,
                [id]: !prevVisibility[id] // Toggle visibility
            };

            // Ensure at least one column is visible
            const anyColumnVisible = Object.values(newVisibility).some(visible => visible);
            if (!anyColumnVisible) {
                return prevVisibility; // Keep the previous state if no columns are visible
            }

            return newVisibility;
        });
    }, []);


    // Check if a column is visible
    const getIsColumnVisible = useCallback((id: string) => {
        return !!columnVisibility[id];
    }, [columnVisibility]);

    const getVisibleColumns = useCallback(() => {
        return columns.filter(column => getIsColumnVisible(column.id as string));
    }, [columns, getIsColumnVisible]);

    const getExportableAndVisibleColumn = useCallback(() => {
        return getVisibleColumns().filter(column => !column.meta?.excludeFromExport || false);
    }, [columns, getVisibleColumns]);

    const getHidableColumns = useCallback(() => {
        return columns.filter(column => column.meta?.hidable ?? true);
    }, [columns]);

    return {
        columnVisibility,
        toggleColumnVisibility,
        handleColumnVisibilityChange,
        getIsColumnVisible,
        getVisibleColumns,
        getHidableColumns,
        getExportableAndVisibleColumn
    };
};




