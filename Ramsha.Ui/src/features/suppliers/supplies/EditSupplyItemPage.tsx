import { useNavigate, useParams } from "react-router-dom"
import { useSupplyRequestItem } from "../../../app/hooks/supplierHooks";
import SupplyRequestItemForm from "./SupplyRequestItemForm";
import AppDialog from "../../../app/components/AppDialog";
import { useGoToParent } from "../../../app/hooks/routeHooks";
import { Paper } from "@mui/material";

const EditSupplyItemPage = () => {

    const { itemId } = useParams()
    if (!itemId)
        return null;

    const { item } = useSupplyRequestItem(itemId)

    const navigate = useGoToParent(2)

    const handleCloseModal = () => {
        navigate()
    }

    return (
        <AppDialog open onClose={handleCloseModal} title="Edit Supply Request Item" fullWidth maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                {
                    item &&
                    <SupplyRequestItemForm item={item} onSubmitComplete={handleCloseModal} />
                }
            </Paper>
        </AppDialog>
    )
}

export default EditSupplyItemPage