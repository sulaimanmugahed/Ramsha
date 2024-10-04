import { RouterProvider } from "react-router-dom"
import { router } from "../router/Routes"

export const AppRouteProvider = () => {
    return <RouterProvider router={router} />
}