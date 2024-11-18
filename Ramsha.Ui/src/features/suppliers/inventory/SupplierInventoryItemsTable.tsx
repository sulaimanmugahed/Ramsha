import { createColumnHelper } from "@tanstack/react-table"
import AppTable from "../../../app/components/AppTable"
import AppActionsMenu from "../../../app/components/table/AppActionsMenu"
import { useServerDataTable } from "../../../app/hooks/tableHooks"
import { SupplierInventoryItem } from "../../../app/models/suppliers/supplierInventoryItem"

type Props = {
    items: SupplierInventoryItem[],
    onSupplyButtonClick: (item: SupplierInventoryItem) => void,
    onShowDetailsButtonClick: (item: SupplierInventoryItem) => void,
    onApplyDiscountButtonClick: (item: SupplierInventoryItem) => void,
}

const SupplierInventoryItemsTable = ({ items, onApplyDiscountButtonClick, onSupplyButtonClick, onShowDetailsButtonClick }: Props) => {

    const columnHelper = createColumnHelper<SupplierInventoryItem>();

    const columns = [
        columnHelper.accessor('id', {
            meta: {
                excludeFromTable: true,
                excludeFromExport: true,
                hidable: false
            },
        }),


        columnHelper.accessor('productName', {
            id: 'productName',
            cell: info => info.getValue(),
            header: "Product Name",
            meta: {
                allowedOperators: ['Equals', 'Contains']
            }
        }),
        columnHelper.accessor('sku', {
            id: 'sku',
            cell: info => info.getValue(),
            header: "SKU",
            meta: {
                allowedOperators: ['Equals', 'Contains']
            }
        }),


        columnHelper.accessor(row => `${row.activePrice.wholesalePrice} ${row.activePrice.currency}`, {
            id: 'wholesalePrice',
            header: "Wholesale Price",
            cell: info => info.getValue(),

        }),
        columnHelper.accessor(row => `${row.activePrice.retailPrice} ${row.activePrice.currency}`, {

            id: 'retailPrice',
            header: "Retail Price",
            cell: info => info.getValue(),

        }),
        columnHelper.accessor(row => `${row.activePrice.finalPrice} ${row.activePrice.currency}`, {
            id: 'finalPrice',
            header: "Final Price",
            cell: info => info.getValue(),
        }),


        columnHelper.accessor('availableQuantity', {
            id: 'availableQuantity',
            cell: info => info.getValue(),
            header: "Available Quantity",
            meta: {
                allowedOperators: ['Equals', 'Contains']
            }
        }),
        columnHelper.accessor('totalQuantity', {
            id: 'totalQuantity',
            cell: info => info.getValue(),
            header: "Total Quantity",
            meta: {
                allowedOperators: ['Equals', 'Contains']
            }
        }),
        columnHelper.display({
            id: 'actions',
            cell: props => <AppActionsMenu
                row={props.row.original}
                menuItems={[
                    {
                        label: 'Supply',
                        action: onSupplyButtonClick
                    },
                    {
                        action: onShowDetailsButtonClick,
                        label: 'Show Details',
                    },
                    {
                        action: onApplyDiscountButtonClick,
                        label: 'Apply Discount',
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


    const { getRows, getHeaderGroups } = useServerDataTable({
        data: items,
        columns,
        rowIdAccessor: 'id'
    })


    return (


        <AppTable
            headerGroups={getHeaderGroups()}
            rows={getRows()}
        />

    )
}

export default SupplierInventoryItemsTable