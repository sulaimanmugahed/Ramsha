import { createColumnHelper } from "@tanstack/react-table";
import { InventoryItemDto } from "../../../app/models/inventories/inventory";
import { Button, Checkbox } from "@mui/material";


const columnHelper = createColumnHelper<InventoryItemDto>()

export const getInventoryItemColumns = (
    onAllRowsSelectionChange: (table: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRowSelectionChange: (row: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onEditButtonClick: (inventoryItem: InventoryItemDto) => void

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

        columnHelper.accessor('productName', {
            id: 'productName',
            cell: info => info.getValue(),
            header: "Name",
        }),

        columnHelper.accessor('quantity', {
            id: 'quantity',
            cell: info => info.getValue(),
            header: "Quantity",
            meta: {
                allowedOperators: ['Equals', 'Between', 'LessThan', 'GreaterThan'],
                filterVariant: 'NumberInput'
            }
        }),
        columnHelper.accessor('status', {
            id: 'status',
            cell: info => info.getValue(),
            header: "Status",
            meta: {
                filterVariant: 'Select',
                options: ['InStock', 'OutOfStock'],
            }
        }),
        columnHelper.accessor('inventorySKU', {
            id: 'inventorySKU',
            cell: info => info.getValue(),
            header: "Inventory SKU",
        }),
        columnHelper.accessor('retailPrice', {
            id: 'retailPrice',
            cell: info => info.getValue(),
            header: "Retail Price",

        }),

        columnHelper.accessor('wholePrice', {
            id: 'wholePrice',
            cell: info => info.getValue(),
            header: "Wholesale Price",
        }),

        columnHelper.accessor('imageUrl', {
            id: 'imageUrl',
            header: "Image",
            cell: props => <img src={props.row.original.imageUrl} alt="image" />,
            enableSorting: false,
            meta: {
                excludeFromExport: true
            }
        }),

        columnHelper.display({
            id: 'actions',
            cell: props => <Button onClick={() => onEditButtonClick(props.row.original)}> Edit</Button>,
            enableSorting: false,
            enableHiding: false,
            meta: {
                excludeFromExport: true,
                hidable: false
            }
        })
    ]