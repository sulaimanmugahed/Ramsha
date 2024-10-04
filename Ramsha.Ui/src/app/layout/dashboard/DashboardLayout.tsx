import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Container, CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";


const DashboardLayout = () => (

    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Box sx={{ flexGrow: 1, pt: 6 }}>
            <Outlet />
        </Box>
    </Box>
)

export default DashboardLayout