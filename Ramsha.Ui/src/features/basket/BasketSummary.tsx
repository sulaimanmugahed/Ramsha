import {
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';

import { useCurrency } from '../../app/hooks/currencyHooks';
import { CurrencyCode } from '../../app/models/common/currency';
import { formatCurrency } from '../../app/utils/formatUtils';



type Props = {
    subtotal: number,
    totalDeliveryFees: number
    currencyCode?: CurrencyCode

}

const BasketSummary = ({ totalDeliveryFees, subtotal, currencyCode }: Props) => {

    const { currency } = useCurrency(currencyCode)

    const formattedSubtotal = currency && formatCurrency(currency?.rate * subtotal, currency?.code).toString() || ''
    const formattedFees = currency && formatCurrency(currency?.rate * totalDeliveryFees, currency?.code).toString() || ''
    const formattedTotal = currency && formatCurrency(currency?.rate * subtotal + totalDeliveryFees, currency?.code).toString() || ''

    return (
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
                <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Subtotal
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formattedSubtotal}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Total Delivery Fees
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formattedFees}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Total
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formattedTotal}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default BasketSummary