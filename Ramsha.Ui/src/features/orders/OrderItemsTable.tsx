import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { OrderItem } from "../../app/models/orders/order"

type Props = {
    items: OrderItem[]
}

const OrderItemsTable = ({ items }: Props) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.inventoryItemId}>
                            <TableCell>
                                <Avatar src={item.imageUrl} alt={item.name} variant="square" sx={{ width: 48, height: 48, borderRadius: '50%' }} />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderItemsTable