import { useSearchParams } from "react-router-dom"
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPasswordPage = () => {

    const [params] = useSearchParams()
    const token = params.get('token')
    if (!token) return null


    return (
        <ResetPasswordForm token={token} />
    )
}

export default ResetPasswordPage