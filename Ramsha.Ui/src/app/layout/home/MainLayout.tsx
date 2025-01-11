import { Container, CssBaseline } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../../../features/home/HomePage'
import Footer from '../footer/Footer'
import Header from './Header'

const MainLayout = () => {
    const location = useLocation()

    return (
        <div>
            <CssBaseline />
            <Header />
            {
                location.pathname === "/" ? <HomePage />
                    : (
                        <Container sx={{ p: 15 }}>
                            <Outlet />
                        </Container>
                    )
            }
            <Footer />

        </div>
    )
}

export default MainLayout