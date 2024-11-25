import LoadingButton from "@mui/lab/LoadingButton"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import AppDialog from "../../../app/components/AppDialog"
import { useAccount, useUpdateAddress } from "../../../app/hooks/accountHooks"
import { useGoToParent } from "../../../app/hooks/routeHooks"
import AddressFormField from "../../common/AddressFormField"

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

        }
    })

    useEffect(() => {
        if (account?.address) {
            const { fullName, description, ...addressInfo } = account?.address
            form.reset({ ...form.getValues(), fullName, description, addressInfo })
        }


    }, [form, account])

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