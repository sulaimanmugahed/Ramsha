import { createColumnHelper } from "@tanstack/react-table";
import { ProductDto, ProductStatus } from "../../../app/models/products/product";
import { Box, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import AppActionsMenu from "../../../app/components/table/AppActionsMenu";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columnHelper = createColumnHelper<ProductDto>();

export const getProductsColumns = (
    onAllRowsSelectionChange: (table: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRowSelectionChange: (row: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEditButtonClick: (product: ProductDto) => void,
    handleImageClick: (imageUrl: string) => void,
    onViewButtonClick: (product: ProductDto) => void,  
    onDeleteButtonClick: (product: ProductDto) => void,
    onShowVariants: (product: ProductDto) => void 
) => [
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
        columnHelper.accessor('name', {
            id: 'name',
            cell: info => info.getValue(),
            header: "Name",
            meta: {
                allowedOperators: ['Equals', 'Contains']
            }
        }),
        columnHelper.accessor('category', {
            id: 'category',
            cell: info => info.getValue(),
            header: "Category",
        }),
        columnHelper.accessor('brand', {
            id: 'brand.name',
            cell: info => info.getValue(),
            header: "Brand",
        }),
        columnHelper.accessor('status', {
            id: 'status',
            cell: info => info.getValue(),
            header: "Status",
            meta: {
                filterVariant: 'Select',
                options: Object.values(ProductStatus)
            }

        }),
        columnHelper.accessor('created', {
            id: 'created',
            cell: info => dayjs(new Date(info.getValue())).format('DD/MM/YYYY'),
            header: "Created",
            meta: {
                filterVariant: 'DatePicker',
                allowedOperators: ['Between', 'Equals', 'GreaterThan', 'LessThan']
            }
        }),
        columnHelper.accessor('imageUrl', {
            id: 'imageUrl',
            header: "Image",
            cell: props => (
                <Box
                    onClick={() => handleImageClick(props.row.original.imageUrl)} 
                    sx={{
                        cursor: 'pointer',
                        width: '50px',
                        height: '50px',
                        overflow: 'hidden',
                        borderRadius: '50%', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',  
                    }}
                    
                >
                    <img
                        src={props.row.original.imageUrl}
                        alt="Image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%', 
                            filter: 'blur(10px)', 
                            transition: 'filter 0.5s ease',
                            position: 'absolute', 
                            top: 0,
                            left: 0,
                        }}
                        onLoad={(e) => (e.currentTarget.style.filter = 'none')}  
                        loading="lazy"
                    />
                </Box>
            ),
            enableSorting: false,
            meta: {
                excludeFromExport: true
            }
        }),
        columnHelper.display({
            id: 'actions',
            cell: props => <AppActionsMenu
                row={props.row.original}
                menuItems={[
                    {
                        label: 'View',
                        icon: <VisibilityIcon fontSize="small" />,
                        action: onViewButtonClick
                    },
                    {
                        label: 'Edit',
                        icon: <EditIcon fontSize="small" />,
                        action: onEditButtonClick
                    },
                    {
                        label: 'Delete',
                        icon: <DeleteIcon fontSize="small" />,
                        action: onDeleteButtonClick
                    },
                    {
                        action: onShowVariants,
                        label: 'Show Variants',

                    }
                ]} />,
            enableSorting: false,
            enableHiding: false,
            meta: {
                excludeFromExport: true,
                hidable: false
            }
        })


    ]