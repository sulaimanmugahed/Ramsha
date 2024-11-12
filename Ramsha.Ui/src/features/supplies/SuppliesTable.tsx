import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { Supply } from "../../app/models/supplies/supply";

import { Checkbox, Grid } from "@mui/material";
import dayjs from "dayjs";
import AppPagination from "../../app/components/AppPagination";
import AppSearch from "../../app/components/AppSearch";
import AppTable from "../../app/components/AppTable";
import AppTablePageSizer from "../../app/components/AppTablePageSizer";
import AppTableSelectionActions from "../../app/components/AppTableSelectionActions";
import AppActionsMenu from "../../app/components/table/AppActionsMenu";
import ColumnVisibilityComponent from "../../app/hooks/ColumnVisibilityComponent";
import { useExportExcel, useExportPDF } from "../../app/hooks/exportHooks";
import { usePagination } from "../../app/hooks/paginationHooks";
import { useSorting } from "../../app/hooks/sortingHooks";
import { useColumnVisibility, useServerDataTable, useTableRowSelection } from "../../app/hooks/tableHooks";
import { PagedMetaData } from "../../app/models/common/commonModels";
import { mapRowWithColumns } from "../../app/utils/util";


type Props = {
    suppliesMeta: PagedMetaData,
    supplies: Supply[]
    actions?: Array<{ label: string; action: ((row: Supply) => void) | undefined }>
}

const SuppliesTable = ({ actions = [], supplies, suppliesMeta }: Props) => {

    const { handleSortChange } = useSorting()
    const { handleUpdatePageNumber, handleUpdatePageSize } = usePagination()



    const columnHelper = createColumnHelper<Supply>();

    const { onAllRowsSelectionChange,
        onRowSelectionChange,
        selectedRows } = useTableRowSelection<Supply>()


    const columns = useMemo(() => {
        // Define the base columns (e.g., ID, selection, etc.)
        const baseColumns = [
            columnHelper.accessor('id', {
                meta: {
                    excludeFromTable: true,
                    excludeFromExport: true,
                    hidable: false
                },
            }),

            columnHelper.display({
                id: "selection",
                header: ({ table }) => (
                    <Checkbox
                        {
                        ...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: onAllRowsSelectionChange(table),
                        }
                        }
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        {
                        ...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: onRowSelectionChange(row),
                        }
                        }
                    />
                ),
                meta: {
                    excludeFromExport: true,
                    hidable: false
                },
                enableHiding: false,
                enableSorting: false,
            }),
            columnHelper.accessor('totalAmount', {
                id: 'totalAmount',
                cell: info => `$${info.getValue().toFixed(2)}`,
                header: "Total Amount",
            }),
            columnHelper.accessor('currency', {
                id: 'currency',
                cell: info => info.getValue(),
                header: "Currency",
            }),
            columnHelper.accessor('totalQuantity', {
                id: 'totalQuantity',
                cell: info => info.getValue(),
                header: "Total Quantity"
            }),
            columnHelper.accessor('status', {
                id: 'status',
                cell: info => info.getValue(),
                header: "Status",
            }),
            columnHelper.accessor('sent', {
                id: 'sent',
                cell: info => dayjs(new Date(info.getValue())).format('DD/MM/YYYY'),
                header: "Sent at",
            })
        ];

        if (actions && actions.length > 0) {
            baseColumns.push(
                columnHelper.display({
                    id: 'actions',
                    cell: props => (
                        <AppActionsMenu
                            row={props.row.original}
                            menuItems={actions} // Pass actions here
                        />
                    ),
                    enableSorting: false,
                    enableHiding: false,
                    meta: {
                        excludeFromExport: true,
                        hidable: false
                    }
                })
            );
        }


        return baseColumns;
    }, [onAllRowsSelectionChange, onRowSelectionChange, actions]);


    const { columnVisibility,
        getExportableAndVisibleColumn,
        getHidableColumns,
        getIsColumnVisible,
        toggleColumnVisibility,
        handleColumnVisibilityChange } = useColumnVisibility(columns)


    const handleSearchSubmit = (data: any) => {

    }

    const {
        getHeaderGroups,
        getRows,
    } = useServerDataTable({
        data: supplies,
        columns,
        rowIdAccessor: 'id',
        columnVisibility,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        enableSorting: true,
        enableSortingRemoval: true,
        sorting: suppliesMeta.columnsSort.map(c => ({ id: c.sortColumn, desc: c.descending }))
    })


    const { exportExcel, isExportingExcel } = useExportExcel()

    const handleExcelExport = () => {
        const columns = getExportableAndVisibleColumn()
        const headers = columns.map(c => c.header?.toString() || '')
        const rowsData = mapRowWithColumns(selectedRows, columns);
        exportExcel({ headers, rowsData })
    }

    const { exportPdf, isExportingPdf } = useExportPDF({})


    const handlePdfExport = async () => {
        const columns = getExportableAndVisibleColumn()
        const headers = columns.map(c => c.header?.toString() || '')
        const rowsData = mapRowWithColumns(selectedRows, columns);
        await exportPdf({ headers, rowsData })
    }


    return (
        <Grid sx={{ p: 2, mt: 2 }} spacing={2} container>

            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <AppSearch
                            onSubmit={handleSearchSubmit}
                            placeholder="Search .."
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AppTableSelectionActions
                            isExportingPdf={isExportingPdf}
                            isExportingExcel={isExportingExcel}
                            onPdfExport={handlePdfExport}
                            onExcelExport={handleExcelExport}
                            isVisible={selectedRows.length > 0}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <AppTable
                    headerGroups={getHeaderGroups()}
                    rows={getRows()}
                    onColumnSort={handleSortChange}
                />
            </Grid>
            {
                suppliesMeta && (
                    <Grid item xs={12} >
                        <Grid container alignItems={'center'} justifyContent={'center'}>
                            <Grid item alignItems={'center'} justifyContent={'space-between'} sm={8}>
                                <AppPagination
                                    metaData={suppliesMeta}
                                    onPageChange={handleUpdatePageNumber}
                                />
                            </Grid>

                            <Grid item display={'flex'} justifyContent={'space-between'} sm={4}>
                                <Grid spacing={1} container>
                                    <Grid item sm={4}>
                                        <AppTablePageSizer
                                            onPageSizeChange={handleUpdatePageSize}
                                            options={[5, 10, 20, 50]}
                                            pageSize={suppliesMeta.pageSize}
                                            allowAll
                                            totalCount={suppliesMeta.totalCount}
                                        />
                                    </Grid>
                                    <Grid item sm={8}>
                                        <ColumnVisibilityComponent
                                            columns={getHidableColumns()}
                                            toggleColumnVisibility={toggleColumnVisibility}
                                            isColumnVisible={getIsColumnVisible}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}

export default SuppliesTable