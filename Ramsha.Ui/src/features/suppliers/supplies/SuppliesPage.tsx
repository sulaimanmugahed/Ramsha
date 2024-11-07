import { useMemo } from "react"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { useSupplies } from "../../../app/hooks/supplierHooks"
import { Supply } from "../../../app/models/suppliers/supply"
import { useColumnVisibility, useServerDataTable, useTableRowSelection } from "../../../app/hooks/tableHooks"
import { getSuppliesColumns } from "./SuppliesColumn"
import { useSorting } from "../../../app/hooks/sortingHooks"
import AppTable from "../../../app/components/AppTable"
import { Box, Button, Grid, IconButton } from "@mui/material"
import AppPagination from "../../../app/components/AppPagination"
import ColumnVisibilityComponent from "../../../app/hooks/ColumnVisibilityComponent"
import AppTablePageSizer from "../../../app/components/AppTablePageSizer"
import AppSearch from "../../../app/components/AppSearch"
import AppTableSelectionActions from "../../../app/components/AppTableSelectionActions"
import { useExportExcel, useExportPDF } from "../../../app/hooks/exportHooks"
import { mapRowWithColumns } from "../../../app/utils/util"
import { useNavigate } from "react-router-dom"


const fallBack: Supply[] = [];

const SuppliesPage = () => {

    const { paginationParams, handleUpdatePageNumber, handleUpdatePageSize } = usePagination()
    const { sortingParams, handleSortChange } = useSorting()


    const navigate = useNavigate()


    const { supplies, suppliesMeta } = useSupplies({
        paginationParams
    })

    const { onAllRowsSelectionChange,
        onRowSelectionChange,
        selectedRows } = useTableRowSelection<Supply>()

    const columns = useMemo(() => getSuppliesColumns(onAllRowsSelectionChange, onRowSelectionChange), [[onAllRowsSelectionChange, onRowSelectionChange]])

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
        data: supplies || fallBack,
        columns,
        rowIdAccessor: 'id',
        columnVisibility,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        enableSorting: true,
        enableSortingRemoval: true,
        sorting: sortingParams.columnsSort.map(c => ({ id: c.sortColumn, desc: c.descending }))
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

export default SuppliesPage