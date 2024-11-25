import { Grid, Typography } from "@mui/material";
import { BasketDetail } from "../../app/models/baskets/basket";
import { CurrencyCode } from "../../app/models/common/currency";
import BasketSummary from "../basket/BasketSummary";
import BasketDetails from "../basket/BasketDetails";


type Props = {
    currencyCode?: CurrencyCode,
    basketDetail: BasketDetail
}

const CheckoutReview = ({ currencyCode, basketDetail }: Props) => {

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    {basketDetail && < BasketDetails basketDetail={basketDetail} currencyCode={currencyCode} />}
                </Grid>
            </Grid>
        </>

    )
}

export default CheckoutReview