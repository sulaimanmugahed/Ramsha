import { isErrored } from "stream";
import { useInventoryItems } from "../../../app/hooks/invenroyHooks";
import { usePagination } from "../../../app/hooks/paginationHooks";
import { useSorting } from "../../../app/hooks/sortingHooks";
import { useColumnVisibility, useServerDataTable, useTableRowSelection } from "../../../app/hooks/tableHooks";
import { useMemo, useState } from "react";
import { getInventoryItemColumns } from "./inventoryItemColumns";
import { InventoryItemDto } from "../../../app/models/inventories/inventory";
import { useFiltering } from "../../../app/hooks/filteringHooks";
import { useExportExcel, useExportPDF } from "../../../app/hooks/exportHooks";
import { mapRowWithColumns } from "../../../app/utils/util";
import { Button, Box, Grid } from "@mui/material";
import AppPagination from "../../../app/components/AppPagination";
import AppSearch from "../../../app/components/AppSearch";
import AppTable from "../../../app/components/AppTable";
import AppTablePageSizer from "../../../app/components/AppTablePageSizer";
import AppTableSelectionActions from "../../../app/components/AppTableSelectionActions";
import FilterDropdown from "../../../app/components/FilterDropdown";
import ColumnVisibilityComponent from "../../../app/hooks/ColumnVisibilityComponent";
import { useCategories } from "../../../app/hooks/categoryHooks";



const InventoryPage = () => {

    const { paginationParams,
        handleUpdatePageSize,
        handleUpdatePageNumber } = usePagination()

    const { sortingParams,
        handleSortChange } = useSorting()


    const { filterParams } = useFiltering()

    const { onAllRowsSelectionChange,
        onRowSelectionChange,
        selectedRows } = useTableRowSelection<InventoryItemDto>()

    const { metaData,
        items,
        isItemsError,
        isItemsLoading } = useInventoryItems({
            paginationParams,
            sortingParams,
            filterParams
        })

    const handleEdit = (inventoryItem: InventoryItemDto) => {
    }

    const columns = useMemo(() =>
        getInventoryItemColumns(
            onAllRowsSelectionChange,
            onRowSelectionChange,
            handleEdit
        ), [onAllRowsSelectionChange, onRowSelectionChange])

    const { columnVisibility,
        getExportableAndVisibleColumn,
        getHidableColumns,
        getIsColumnVisible,
        toggleColumnVisibility,
        handleColumnVisibilityChange } = useColumnVisibility(columns)

    const { exportPdf, isExportingPdf } = useExportPDF({})

    const { exportExcel, isExportingExcel } = useExportExcel()

    const handleExcelExport = () => {
        const columns = getExportableAndVisibleColumn()
        const headers = columns.map(c => c.header?.toString() || '')
        const rowsData = mapRowWithColumns(selectedRows, columns);
        exportExcel({ headers, rowsData })
    }

    const handlePdfExport = async () => {
        const columns = getExportableAndVisibleColumn()
        const headers = columns.map(c => c.header?.toString() || '')
        const rowsData = mapRowWithColumns(selectedRows, columns);
        await exportPdf({ headers, rowsData })
    }

    const [dialogOpen, setDialogOpen] = useState(false);


    const hidableColumn = getHidableColumns()
    const isRemovingAll = false;

    const { categories, isCategoriesLoading } = useCategories()


    const onRemoveRange = () => {

    }

    const handleSearchSubmit = () => {

    }

    const {
        getHeaderGroups,
        getRows
    } = useServerDataTable({
        data: items,
        columns,
        rowIdAccessor: 'id',
        columnVisibility,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        enableSorting: true,
        sorting: sortingParams.columnsSort.map(sort => ({ id: sort.sortColumn, desc: sort.descending })),
    })


    return (
        isItemsLoading ? (
            <h1>loading..</h1>
        ) :
            isItemsError ? (
                <h1>error..</h1>

            ) : metaData && items &&
            <Box sx={{ p: 6 }}>
                <Grid sx={{ mb: 2 }} container columnSpacing={2}>
                    <Grid item sm={3}>
                        <ColumnVisibilityComponent
                            columns={hidableColumn}
                            toggleColumnVisibility={toggleColumnVisibility}
                            isColumnVisible={getIsColumnVisible}
                        />
                    </Grid>
                    <Grid item sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AppTableSelectionActions
                            isExportingPdf={isExportingPdf}
                            isExportingExcel={isExportingExcel}
                            isRemovingRange={isRemovingAll}
                            onRemoveRange={onRemoveRange}
                            onPdfExport={handlePdfExport}
                            onExcelExport={handleExcelExport}
                            isVisible={true}
                        />
                        <Button onClick={() => setDialogOpen(true)}>Filter</Button>
                        <FilterDropdown categories={categories} isLoading={isCategoriesLoading} onClose={() => setDialogOpen(false)} open={dialogOpen} columns={hidableColumn.map(c => ({ header: c.header?.toString()!, id: c.id!, variant: c.meta?.filterVariant, options: c.meta?.options, allowedOperators: c.meta?.allowedOperators }))} />
                    </Grid>

                    <Grid item sm={4}>
                        <AppSearch
                            onSubmit={handleSearchSubmit}
                            placeholder="Search .."
                        />
                    </Grid>
                </Grid>
                <AppTable
                    headerGroups={getHeaderGroups()}
                    rows={getRows()}
                    onColumnSort={handleSortChange}
                />
                <Grid container columnSpacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                    <Grid item sm={2}>
                        <AppTablePageSizer
                            onPageSizeChange={handleUpdatePageSize}
                            options={[5, 10, 20, 50]}
                            pageSize={metaData.pageSize}
                            allowAll
                            totalCount={metaData.totalCount}
                        />
                    </Grid>

                    <Grid item sm={10}>
                        <AppPagination
                            metaData={metaData}
                            onPageChange={handleUpdatePageNumber}
                        />
                    </Grid>
                </Grid>
            </Box >
    )
}

export default InventoryPage