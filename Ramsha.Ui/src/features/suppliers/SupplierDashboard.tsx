import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { LineChart, PieChart } from '@mui/x-charts';
import React from 'react';
import AppHomeIcon from '../../app/components/icons/AppHomeIcon';
import { AppOrderIcon } from '../../app/components/icons/AppOrderIcon';
import { useSupplierStatistics } from '../../app/hooks/statisticsHooks';
import './SupplierDashboard.css';



const SupplierDashboard: React.FC = () => {
    const theme = useTheme();



    const { supplierStatistics, isLoading } = useSupplierStatistics()
    if (isLoading) return (<h1>loading ...</h1>)
    if (!supplierStatistics) return null;



    const { productStockDistribution, salesPerformance, totalFulfillments, totalRevenue, totalSuppliedProducts, topSellingProduct } = supplierStatistics

    const salesData = salesPerformance.map((performance) => performance.revenue);

    const months = salesPerformance.map((performance) => performance.month);



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Total Fulfillments Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppOrderIcon width={35} height={35} />
                                <Typography variant="h6">Total Fulfillments</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {totalFulfillments}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Total Revenue Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <MoneyOffIcon sx={{ fontSize: 35 }} />
                                <Typography variant="h6">Total Revenue</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                ${totalRevenue.toLocaleString()}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Total Supplied Products Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppHomeIcon size={35} />
                                <Typography variant="h6">Total Products</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {totalSuppliedProducts}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Average Rating Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppHomeIcon size={35} />
                                <Typography variant="h6">Top Selling Product</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">
                                {topSellingProduct.length > 15 ? `${topSellingProduct.slice(0, 15)}...` : topSellingProduct}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Sales Performance Over Time Chart */}
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

                {/* Product Stock Distribution Chart */}
                <Grid item xs={12} md={5.5}>
                    <Paper elevation={3} className="chart-container" sx={{ padding: 2 }}>
                        <Typography variant="h6" className="chart-title">Product Stock Distribution</Typography>
                        <Box sx={{ width: '100%', height: { xs: 200, sm: 400, md: 300 } }}>
                            <PieChart
                                colors={[theme.palette.primary.light, theme.palette.primary.dark]}
                                series={[
                                    {
                                        data: productStockDistribution,
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
    );
};

export default SupplierDashboard;