import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import AppDialog from "../../app/components/AppDialog"
import { useMyOrders } from "../../app/hooks/orderHooks"
import { useGoToParent } from "../../app/hooks/routeHooks"
import OrdersTable from "./OrdersTable"

const MyOrdersPage = () => {
    const [open, SetOpen] = useState(true)

    const { orders, isOrdersLoading } = useMyOrders()

    const navigate = useNavigate()

    const back = useGoToParent()


    const handleClose = () => {
        SetOpen(false)
        back()
    }


    return (
        <AppDialog title="My Orders" open={open} onClose={handleClose} fullWidth>
            {
                isOrdersLoading ? (
                    <h1>Loading ...</h1>
                ) : orders &&
                <OrdersTable onRowView={(order) => navigate(order.id)} orders={orders} />
            }
            <Outlet />
        </AppDialog>
    )
}

export default MyOrdersPage