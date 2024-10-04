import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useAddVariant, useDeleteVariant, useProductVariants } from "../../../app/hooks/productHooks";
import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import ProductVariantList from "../../products/variants/ProductVariantList";
import {  VariantScheme } from "../../products/productFormValidations";

import { PreviewVariantType, UploadResponse } from "../../../app/models/common/commonModels";
import { ProductVariantDto } from "../../../app/models/products/product";
export type variantFormType = {
    variant: VariantScheme
}


const ProductVariantsPage = () => {



    const { productId } = useParams()
    if (!productId) return null;

    const { variants } = useProductVariants(productId)
    const { deleteVariant } = useDeleteVariant()


    const navigate = useNavigate()

    const handleUpdate = (variant: ProductVariantDto | PreviewVariantType) => {
        navigate(`edit/${variant.id}`)

    }

    const handleAdd = () => {
        navigate('create')
    }

    return (
        <>
            <Dialog open fullWidth maxWidth="lg"
                sx={{
                    "& .MuiDialog-paper": { backgroundColor: 'Background.default' },
                }}
            >
                <DialogTitle>
                    Product variants
                    <IconButton
                        aria-label="close"
                        onClick={() => navigate(-1)}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <ProductVariantList
                        onDeleteVariant={(variant) => deleteVariant({ productId, variantId: variant.id! })}
                        onAddVariant={handleAdd}
                        onUpdateVariant={handleUpdate}
                        cardPerRow={3} variants={variants} />
                </DialogContent>
            </Dialog>
            <Outlet />
        </>
    )
}

export default ProductVariantsPage