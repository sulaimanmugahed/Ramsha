import { Card, Grid } from "@mui/material"

import { useAccount } from "../../app/hooks/accountHooks"
import { useCurrency } from "../../app/hooks/currencyHooks"
import { CatalogProductDetailType } from "../../app/models/catalog/catalogProduct"
import CatalogProductOverview from "./CatalogProductOverview"

type Props = {
    product: CatalogProductDetailType,
}

const CatalogProductDetail = ({ product }: Props) => {
    const { account } = useAccount()
    const { currency } = useCurrency(account?.preferredCurrency || 'USD')

    return (
        <Grid container>
            <Grid item xs={12} md={12}>
                <Card
                    elevation={1}
                    sx={{
                        borderRadius: 4,
                        padding: 3,
                        position: 'relative'
                    }}
                >
                    <CatalogProductOverview product={product} />

                </Card>
            </Grid>
        </Grid>
    )
}

export default CatalogProductDetail