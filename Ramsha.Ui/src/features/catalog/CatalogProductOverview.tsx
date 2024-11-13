import { CardMedia, Grid, Typography } from "@mui/material"
import AppDivider from "../../app/components/AppDivider"

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
            <Grid item xs={12} md={6}>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={name}
                    sx={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 3,
                        objectFit: "cover",
                        boxShadow: (theme) => theme.shadows[2],
                    }}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography gutterBottom color={'primary.main'} fontWeight={'bold'} variant='h5'>{name}</Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    {description}
                </Typography>

                <AppDivider />

                <Typography gutterBottom color={'primary.main'} fontWeight={'bold'} variant='h5'>Product Overview</Typography>
                <AppGridDetail items={[
                    { label: 'Category', value: category },
                    { label: 'Brand', value: brand },
                    { label: 'Min Price', value: formattedMinPrice },
                    { label: 'Max Price', value: formattedMaxPrice },
                    { label: 'Available Quantity', value: availableQuantity.toString() },
                    { label: 'Total Quantity', value: totalQuantity.toString() },
                    { label: 'Total Variants', value: totalVariants.toString() },
                    { label: 'Total Suppliers', value: totalSuppliers.toString() },
                ]} />
            </Grid>
        </Grid>
    )
}

export default CatalogProductOverview