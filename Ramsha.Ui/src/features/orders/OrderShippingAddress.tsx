import { Box, Typography } from '@mui/material'
import { Address } from '../../app/models/account'


type Props = {
    address: Address
}

const OrderShippingAddress = ({ address }: Props) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <Typography variant="body2">{address.fullName}</Typography>
            <Typography variant="body2">
                {`${address.display}, ${address.description}`}
            </Typography>
            <Typography variant="body2">
                {`${address.city}, ${address.state} ${address.zip}, ${address.country}`}
            </Typography>
        </Box>
    )
}

export default OrderShippingAddress