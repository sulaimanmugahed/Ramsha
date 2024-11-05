import { Order } from '../../app/models/orders/order'
import { createColumnHelper } from '@tanstack/react-table'
import { useServerDataTable } from '../../app/hooks/tableHooks'
import AppTable from '../../app/components/AppTable'
import { displayDateTime } from '../../app/utils/dateTimeUtils'
import AppActionsMenu from '../../app/components/table/AppActionsMenu'

type Props = {
    orders: Order[],
    onRowView?: (order: Order) => void
}

const OrdersTable = ({ orders, onRowView }: Props) => {

    const columnHelper = createColumnHelper<Order>()

    const columns = [
        columnHelper.accessor('id', {
            meta: {
                excludeFromTable: true,
                excludeFromExport: true,
                hidable: false
            },
        }),
        columnHelper.accessor('status', {
            id: 'status',
            header: 'Status',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('orderDate', {
            id: 'orderDate',
            header: 'Ordered At',
            cell: info => displayDateTime(info.getValue())
        }),
        columnHelper.accessor('subtotal', {
            id: 'subtotal',
            header: 'Subtotal',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('deliveryFee', {
            id: 'deliveryFee',
            header: 'Delivery Fee',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('total', {
            id: 'total',
            header: 'Total',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            cell: props => <AppActionsMenu
                row={props.row.original}
                menuItems={[
                    {
                        label: 'Show Details',
                        action: onRowView
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

    const {
        getHeaderGroups,
        getRows
    } = useServerDataTable({
        data: orders,
        columns,
        rowIdAccessor: 'id'
    })

    return (
        <AppTable headerGroups={getHeaderGroups()} rows={getRows()} />
    )
}

export default OrdersTable