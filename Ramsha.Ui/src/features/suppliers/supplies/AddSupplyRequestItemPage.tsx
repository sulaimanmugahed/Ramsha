import { useNavigate, useParams } from "react-router-dom";
import { useProductVariants, useProductOptions } from '../../../app/hooks/productHooks';
import AppDialog from "../../../app/components/AppDialog";
import AddSupplyRequestItemForm from "./AddSupplyRequestItemForm";

const AddSupplyRequestItemPage = () => {
    const { productId } = useParams()
    if (!productId) return null;

    const navigate = useNavigate()

    const handleCloseModal = () => {
        navigate(-1)
    }

    const { variants } = useProductVariants(productId)

    const { productOptions } = useProductOptions(productId)

    return (
        <AppDialog open onClose={handleCloseModal} dynamicBreadcrumb title="Add Supply Request Item" fullWidth maxWidth="sm">
            {
                variants && productOptions && (
                    <AddSupplyRequestItemForm
                        productId={productId}
                        variants={variants}
                        optionNames={productOptions.map(x => x.name)}
                        onSubmitComplete={handleCloseModal} />
                )
            }
        </AppDialog>
    )
}

export default AddSupplyRequestItemPage