import Header from './Header'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";


const DashboardLayout = () => (

    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Box sx={{ flexGrow: 1, mt: 8, p: 2 }}>
            <Outlet />
        </Box>
    </Box>
)

export default DashboardLayout