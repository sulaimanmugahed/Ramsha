import { createColumnHelper } from "@tanstack/react-table"
import AppTable from "../../../app/components/AppTable"
import AppActionsMenu from "../../../app/components/table/AppActionsMenu"
import { useServerDataTable } from "../../../app/hooks/tableHooks"
import { FulfillmentRequest } from "../../../app/models/orders/fulfillmentRequest"
import { displayDateTime } from "../../../app/utils/dateTimeUtils"

type Props = {
  fulfillmentRequests: FulfillmentRequest[]
  onRowView: (request: FulfillmentRequest) => void,
  onShip: (request: FulfillmentRequest) => void
}

const FulfillmentRequestsTable = ({ onShip, onRowView, fulfillmentRequests }: Props) => {


  const columnHelper = createColumnHelper<FulfillmentRequest>()

  const columns = [
    columnHelper.accessor('id', {
      meta: {
        excludeFromTable: true,
        excludeFromExport: true,
        hidable: false
      },
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
    columnHelper.display({
      id: 'total',
      header: 'Total Amount',
      cell: info => info.row.original.subtotal + info.row.original.deliveryFee
    }),
    columnHelper.accessor('received', {
      id: 'received',
      header: 'Received At',
      cell: info => displayDateTime(info.getValue())
    }),
    columnHelper.display({
      id: 'actions',
      cell: props => <AppActionsMenu
        row={props.row.original}
        menuItems={[
          {
            label: 'Detail',
            action: onRowView
          },
          {
            label: 'Ship',
            disable: props.row.original.status !== 'Approved',
            action: onShip
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
    data: fulfillmentRequests,
    columns,
    rowIdAccessor: 'id'
  })

  return (
    <AppTable headerGroups={getHeaderGroups()} rows={getRows()} />
  )
}

export default FulfillmentRequestsTable