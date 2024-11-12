import { useState } from "react";
import { useParams } from "react-router-dom";
import AppDialog from "../../app/components/AppDialog";
import { useGoToParent } from "../../app/hooks/routeHooks";
import { useSupplyDetail } from "../../app/hooks/supplyHooks";
import SupplyDetails from "./SupplyDetails";


const SupplyDetailsPage = () => {
    const [open, setOpen] = useState(true)
    const { supplyId } = useParams()
    if (!supplyId) return;

    const back = useGoToParent()

    const { supplyDetail } = useSupplyDetail(supplyId)


    const handleClose = () => {
        setOpen(false)
        back()
    }

    return (
        <AppDialog open={open} onClose={handleClose} title="Supply Details" fullWidth>
            {
                supplyDetail &&
                <SupplyDetails supplyDetail={supplyDetail} />
            }
        </AppDialog>
    )
}

export default SupplyDetailsPage