import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"
import AppTable from "../../../app/components/AppTable"
import AppActionsMenu from "../../../app/components/table/AppActionsMenu"
import { useServerDataTable } from "../../../app/hooks/tableHooks"
import { FulfillmentRequest } from "../../../app/models/orders/fulfillmentRequest"
import { displayDateTime } from "../../../app/utils/dateTimeUtils"

type Props = {
  fulfillmentRequests: FulfillmentRequest[]
  actions?: Array<{ label: string; action: ((row: FulfillmentRequest) => void) | undefined }>
}

const FulfillmentRequestsTable = ({ actions, fulfillmentRequests }: Props) => {


  const columnHelper = createColumnHelper<FulfillmentRequest>()


  const columns = useMemo(() => {
    const baseColumns = [
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
      })
    ]
    if (actions && actions.length > 0) {
      baseColumns.push(
        columnHelper.display({
          id: 'actions',
          cell: props => (
            <AppActionsMenu
              row={props.row.original}
              menuItems={actions}
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

  }, [actions])

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