import { Outlet, useNavigate } from "react-router-dom"
import { useMyOrders } from '../../app/hooks/orderHooks'
import OrdersTable from '../orders/OrdersTable'


const OrderHistory = () => {

    const { orders, isOrdersLoading } = useMyOrders()
    const navigate = useNavigate()

    return (
        isOrdersLoading ? (
            <h1>Loading ...</h1>
        ) : orders && (
            <>
                <OrdersTable onRowView={(order) => navigate(order.id)} orders={orders} />
                <Outlet />
            </>
        )
    );
}

export default OrderHistory;