import { useOrders } from "../../../app/hooks/orderHooks"
import OrdersTable from "../../orders/OrdersTable"

const AdminOrdersPage = () => {

    const { orders } = useOrders()

    return (
        orders &&
        <OrdersTable orders={orders}  />
    )
}

export default AdminOrdersPage