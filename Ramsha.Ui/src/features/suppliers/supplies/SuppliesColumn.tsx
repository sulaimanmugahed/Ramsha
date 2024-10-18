import { Checkbox } from "@mui/material";
import { Supply } from "../../../app/models/suppliers/supply";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<Supply>();

export const getSuppliesColumns = (
    onAllRowsSelectionChange: (table: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onRowSelectionChange: (row: any) => (event: React.ChangeEvent<HTMLInputElement>) => void,
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

    ]