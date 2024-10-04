import { Box, Button, Grid, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import CreateProductPage from '../../products/CreateProductPage';
import { usePagination } from "../../../app/hooks/paginationHooks";
import { useFiltering } from "../../../app/hooks/filteringHooks";
import { useSorting } from "../../../app/hooks/sortingHooks";
import { useColumnVisibility, useServerDataTable, useTableRowSelection } from "../../../app/hooks/tableHooks";
import { useDeleteProducts, useProducts } from "../../../app/hooks/productHooks";
import { getProductsColumns } from "./productsColumns";
import { ProductDto } from "../../../app/models/products/product";
import { useExportExcel, useExportPDF } from "../../../app/hooks/exportHooks";
import { mapRowWithColumns } from "../../../app/utils/util";
import AppPagination from "../../../app/components/AppPagination";
import AppSearch from "../../../app/components/AppSearch";
import AppTable from "../../../app/components/AppTable";
import AppTablePageSizer from "../../../app/components/AppTablePageSizer";
import AppTableSelectionActions from "../../../app/components/AppTableSelectionActions";
import FilterDropdown from "../../../app/components/FilterDropdown";
import ColumnVisibilityComponent from "../../../app/hooks/ColumnVisibilityComponent";
import { useCategories } from "../../../app/hooks/categoryHooks";
import AddIcon from '@mui/icons-material/Add';
import { AppFilterIcon } from "../../../app/components/icons/AppFilterIcon";
import useAdminProductStore from "../../../app/store/adminProductStore";




export type ProductDialogType = 'createProduct' | 'filter' | 'showVariants'
const AdminProductPage = () => {
    //  const [dialog, setDialog] = useState<ProductDialogType | null>(null);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const navigate = useNavigate();

    const { paginationParams, handleUpdatePageNumber, handleUpdatePageSize } = usePagination()
    const { filterParams } = useFiltering()
    const { sortingParams, handleSortChange } = useSorting()

    const { categories, isCategoriesLoading } = useCategories()

    const { products, metaData, isProductsError, isProductsLoading } = useProducts({
        paginationParams,
        sortingParams,
        filterParams
    })

    const { openDialog, dialogState, closeDialog } = useAdminProductStore()


    const { deleteProducts, isDeleteProductsPending } = useDeleteProducts()

    const { onAllRowsSelectionChange,
        onRowSelectionChange,
        selectedRows } = useTableRowSelection<ProductDto>()

    const handleEdit = (product: ProductDto) => {
    }
    const handleShow = (product: ProductDto) => {
        console.log('show: ', product)
    }

    const handleDelete = (product: ProductDto) => {
    }

    const handleShowVariants = (product: ProductDto) => {
        navigate(`/admin/products/${product.id}/variants`)
    }

    const handleImageClick = (imageUrl?: string) => {
        if (!imageUrl) return;
        setSelectedImage(imageUrl); 
        setOpenImageModal(true);
    };

    const columns = useMemo(() =>
        getProductsColumns(
            onAllRowsSelectionChange,
            onRowSelectionChange,
            handleEdit,
            handleImageClick,
            handleShow,
            handleDelete,
            handleShowVariants
        ), [onAllRowsSelectionChange, onRowSelectionChange])

    const { columnVisibility,
        getExportableAndVisibleColumn,
        getHidableColumns,
        getIsColumnVisible,
        toggleColumnVisibility,
        handleColumnVisibilityChange } = useColumnVisibility(columns)


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

    const {
        getHeaderGroups,
        getRows,
    } = useServerDataTable({
        data: products,
        columns,
        rowIdAccessor: 'id',
        columnVisibility,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        enableSorting: true,
        enableSortingRemoval: true,
        sorting: sortingParams.columnsSort.map(c => ({ id: c.sortColumn, desc: c.descending }))
    })

    const hidableColumn = getHidableColumns()

    const onRemoveRange = async () => {
        var selectedProductsIds = selectedRows.map(p => p.id);
        await deleteProducts(selectedProductsIds)
    }

    const handleSearchSubmit = () => {

    }

    return (
        isProductsLoading ? (
            <h1>loading..</h1>
        ) :
            isProductsError ? (
                <h1>error..</h1>

            ) :
                <Box sx={{ p: 8 }}>
                    <Grid item>
                    </Grid>
                    <Grid item>
                        <Grid sx={{ mb: 2 }} container columnSpacing={2}>

                            <Grid item sm={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Grid spacing={2} container sx={{ display: 'flex', alignItems: 'center' }} >
                                    <Grid item>
                                        <AppTableSelectionActions
                                            isExportingPdf={isExportingPdf}
                                            isExportingExcel={isExportingExcel}
                                            isRemovingRange={isDeleteProductsPending}
                                            onRemoveRange={onRemoveRange}
                                            onPdfExport={handlePdfExport}
                                            onExcelExport={handleExcelExport}
                                            isVisible={selectedRows.length > 0}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                endIcon={<AddIcon />}
                                onClick={() => navigate('/admin/products/create')}
                                variant="contained"
                                size="small"
                                sx={{ m: 1, borderRadius: 2 }}
                            >
                                Create Product
                            </Button>

                            <IconButton disableFocusRipple disableRipple disableTouchRipple onClick={() => openDialog('filter')}><AppFilterIcon color="inherit" /></IconButton>
                            <FilterDropdown categories={categories} isLoading={isCategoriesLoading} onClose={closeDialog} open={dialogState?.type === 'filter'} columns={hidableColumn.map(c => ({ header: c.header?.toString()!, id: c.id!, variant: c.meta?.filterVariant, options: c.meta?.options, allowedOperators: c.meta?.allowedOperators }))} />

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
                        {
                            metaData && (
                                <Grid container columnSpacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Grid item alignItems={'center'} justifyContent={'space-between'} sm={8}>
                                        <AppPagination
                                            metaData={metaData}
                                            onPageChange={handleUpdatePageNumber}
                                        />
                                    </Grid>
                                    <Grid item display={'flex'} justifyContent={'space-between'} sm={4}>
                                        <Grid spacing={1} container>
                                            <Grid item sm={4}>
                                                <AppTablePageSizer
                                                    onPageSizeChange={handleUpdatePageSize}
                                                    options={[5, 10, 20, 50]}
                                                    pageSize={metaData.pageSize}
                                                    allowAll
                                                    totalCount={metaData.totalCount}
                                                />
                                            </Grid>
                                            <Grid item sm={8}>
                                                <ColumnVisibilityComponent
                                                    columns={hidableColumn}
                                                    toggleColumnVisibility={toggleColumnVisibility}
                                                    isColumnVisible={getIsColumnVisible}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>

                    {/* Image Modal */}
                    <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)} maxWidth="md" fullWidth>
                        <DialogContent>
                            {selectedImage && (
                                <img src={selectedImage} alt="Enlarged" style={{ width: '100%', height: 'auto' }} />
                            )}
                        </DialogContent>
                    </Dialog>
                    <Outlet />
                </Box>
    );
}

export default AdminProductPage;
