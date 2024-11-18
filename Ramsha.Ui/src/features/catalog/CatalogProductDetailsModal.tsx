import { useNavigate, useParams } from "react-router-dom"

import { Card, Grid } from "@mui/material"
import { useCatalogProductDetail } from "../../app/hooks/catalogHooks"
import CatalogProductDetail from "./CatalogProductDetail"


const CatalogProductDetailsModal = () => {

    const { productId } = useParams()
    if (!productId) return null;


    const { product } = useCatalogProductDetail(productId)


    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/catalog');
    }
    return (

        <Grid container>
            <Grid item xs={12} md={12}>
              
                    {
                        product && (
                            <CatalogProductDetail product={product} />
                        )
                    }
                
            </Grid>
        </Grid>

    )
}

export default CatalogProductDetailsModal