import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAccount } from "../hooks/accountHooks";


type PrivateRoutesPropsType = {
    allowedRoles?: string[]
}

export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesPropsType) => {

    const { account } = useAccount()
    const location = useLocation();

    return (
        allowedRoles?.some(r => r === account?.role)
            ? <Outlet />
            : account
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}