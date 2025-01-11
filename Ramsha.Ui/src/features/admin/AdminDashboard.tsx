import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { LineChart, PieChart } from "@mui/x-charts";
import { User } from "react-flaticons";
import AppHomeIcon from "../../app/components/icons/AppHomeIcon";
import { AppOrderIcon } from "../../app/components/icons/AppOrderIcon";
import { useAdminStatistics } from "../../app/hooks/statisticsHooks";


const AdminDashboard = () => {


    const theme = useTheme();



    const { adminStatistics, isLoading } = useAdminStatistics()
    if (isLoading) return (<h1>loading ...</h1>)
    if (!adminStatistics) return null;



    const { salesPerformance, totalCompletedOrders, totalCustomers, totalProducts, totalSuppliers, totalCategoriesProducts } = adminStatistics

    const salesData = salesPerformance.map((performance) => performance.revenue);

    const months = salesPerformance.map((performance) => performance.month);



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppOrderIcon width={35} height={35} />
                                <Typography variant="h6">Completed Orders</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {totalCompletedOrders}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <User size={35} />
                                <Typography variant="h6">Total Customers</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                ${totalCustomers}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppHomeIcon size={35} />
                                <Typography variant="h6">Total Products</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {totalProducts}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <User size={35} />
                                <Typography variant="h6">Total Suppliers</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {totalSuppliers}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6.5}>
                    <Paper elevation={3} className="chart-container" sx={{ padding: 2 }}>
                        <Typography variant="h6" className="chart-title">Sales Performance Over Time</Typography>
                        <Box sx={{ width: '100%', height: { xs: 200, sm: 400, md: 300 } }}>
                            <LineChart
                                xAxis={[
                                    {
                                        scaleType: 'point',
                                        data: months
                                    },
                                ]}
                                series={[
                                    {
                                        data: salesData,
                                        label: 'Revenue',
                                        color: theme.palette.primary.main,
                                    },
                                ]}
                                height={300}
                                tooltip={{ trigger: 'item' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={5.5}>
                    <Paper elevation={3} className="chart-container" sx={{ padding: 2 }}>
                        <Typography variant="h6" className="chart-title">Total Categories Products</Typography>
                        <Box sx={{ width: '100%', height: { xs: 200, sm: 400, md: 300 } }}>
                            <PieChart
                                colors={[theme.palette.primary.light, theme.palette.primary.dark]}
                                series={[
                                    {
                                        data: totalCategoriesProducts,
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: -45,
                                        endAngle: 225,
                                        cx: 150,
                                        cy: 150,
                                    },
                                ]}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminDashboard