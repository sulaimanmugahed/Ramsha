import { Outlet, useNavigate } from "react-router-dom"
import { useOrders } from "../../../app/hooks/orderHooks"
import OrdersTable from "../../orders/OrdersTable"

const AdminOrdersPage = () => {

    const { orders } = useOrders()
    const navigate = useNavigate()

    return (
        <>
            {
                orders &&
                <OrdersTable orders={orders} onRowView={(order) => navigate(order.id)} />
            }
            <Outlet />
        </>

    )
}

export default AdminOrdersPage