import { Box, Typography } from "@mui/material"
import AppDialog from "../../app/components/AppDialog"
import AppDivider from "../../app/components/AppDivider"
import AppGridDetail from "../../app/components/ui/AppGridDetail"



type Props = {
    supplierId: string,
    handleCloseSupplierDetails: () => void,
    openSupplierDetails: boolean
}

const CatalogSupplierInfoDialog = ({ handleCloseSupplierDetails, openSupplierDetails, supplierId }: Props) => {
    const supplierInfo = {
        id: supplierId,
        firstName: "Sulaiman",
        lastName: "Mugahed",
        email: "sulaimanmugahed@gmail.com",
        phone: "00967773050577",
        returnPolicy: "30-day return policy.",
    };

    return (
        <AppDialog maxWidth='md' onClose={handleCloseSupplierDetails} open={openSupplierDetails}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold">Supplier Details</Typography>
                <AppDivider />
                <AppGridDetail grid={4} items={[
                    { label: 'Name: ', value: supplierInfo.firstName + ' ' + supplierInfo.lastName },
                    { label: 'Email: ', value: supplierInfo.email },
                    { label: 'Phone number: ', value: supplierInfo.phone },
                    { label: 'Return Policy: ', value: supplierInfo.returnPolicy },
                ]} />
            </Box>
        </AppDialog>
    )
}

export default CatalogSupplierInfoDialog