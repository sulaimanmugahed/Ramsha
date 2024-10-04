import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";


type PrivateRoutesPropsType = {
    allowedRoles?: string[]
}

export const PrivateRoutes = ({ allowedRoles }: PrivateRoutesPropsType) => {

    const { account } = useAuthStore()
    const location = useLocation();

    return (
        allowedRoles?.some(r => r === account?.role)
            ? <Outlet />
            : account
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}