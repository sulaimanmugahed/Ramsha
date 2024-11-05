import { FormProvider, useForm } from "react-hook-form"
import AddressFormField from "../../common/AddressFormField"
import AppDialog from "../../../app/components/AppDialog"
import { useState } from "react"
import { useGoToParent } from "../../../app/hooks/routeHooks"
import LoadingButton from "@mui/lab/LoadingButton"
import { useAccount, useUpdateAddress } from "../../../app/hooks/accountHooks"

const ManageAddressPage = () => {
    const [open, SetOpen] = useState(true)
    const back = useGoToParent()
    const { account } = useAccount()
    const { updateAddress } = useUpdateAddress()

    const handleClose = () => {
        SetOpen(false)
        back()
    }

    const form = useForm({
        defaultValues: {
            fullName: account?.address?.fullName || '',
            description: account?.address?.description || '',
            addressInfo: account?.address
        }
    })

    const { handleSubmit, formState: { isSubmitting } } = form

    const onSubmit = async (data: any) => {
        const { fullName, description, addressInfo } = data
        await updateAddress({ fullName, description, ...addressInfo })
    }

    return (
        <AppDialog title="Manage Address" open={open} onClose={handleClose} fullWidth>
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AddressFormField />
                    <LoadingButton variant="outlined" sx={{ mt: 2, width: 40, borderRadius: 20 }} loading={isSubmitting} type="submit">Save</LoadingButton>
                </form>
            </FormProvider>
        </AppDialog>
    )
}

export default ManageAddressPage