import { Card, Grid, Typography } from "@mui/material"

import AppGridDetail from "../../app/components/ui/AppGridDetail"
import { useAccount } from "../../app/hooks/accountHooks"
import { useCurrency } from "../../app/hooks/currencyHooks"
import { CatalogProductDetailType } from "../../app/models/catalog/catalogProduct"
import { formatCurrency } from "../../app/utils/formatUtils"


type Props = {
    product: CatalogProductDetailType,
}
const CatalogProductOverview = ({ product: { id, maxPrice, minPrice, availableQuantity, totalQuantity, totalSuppliers, totalVariants, name, description, brand, category, imageUrl } }: Props) => {
    const { account } = useAccount()
    const { currency } = useCurrency(account?.preferredCurrency || 'USD')

    const formattedMinPrice = currency && formatCurrency(currency?.rate * minPrice, currency?.code).toString() || ''
    const formattedMaxPrice = currency && formatCurrency(currency?.rate * maxPrice, currency?.code).toString() || ''
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
                <Card sx={{
                    borderRadius: '10px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'visible',
                    p: 2,
                    '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                }}>
                    <Typography gutterBottom color={'primary.main'} fontWeight={'bold'} variant='h5'>Product Overview</Typography>
                    <AppGridDetail grid={4} items={[
                        { label: 'Name', value: name },
                        { label: 'Category', value: category },
                        { label: 'Brand', value: brand },
                        { label: 'Min Price', value: formattedMinPrice },
                        { label: 'Max Price', value: formattedMaxPrice },
                        { label: 'Available Quantity', value: availableQuantity.toString() },
                        { label: 'Total Quantity', value: totalQuantity.toString() },
                        { label: 'Total Variants', value: totalVariants.toString() },
                        { label: 'Total Suppliers', value: totalSuppliers.toString() },
                    ]} />
                </Card>
            </Grid>

        </Grid>
    )
}

export default CatalogProductOverview