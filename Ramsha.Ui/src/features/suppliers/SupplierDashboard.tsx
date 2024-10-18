import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { PieChart, LineChart } from '@mui/x-charts';
import './SupplierDashboard.css';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import AppHomeIcon from '../../app/components/icons/AppHomeIcon';
import { AppOrderIcon } from '../../app/components/icons/AppOrderIcon';
import { alpha } from '@mui/material/styles';


const SupplierDashboard: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>

            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppOrderIcon width={35} height={35} />
                                <Typography variant="h6">Total Orders</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">150</Typography>
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
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">$12,000</Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Total Products Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <AppHomeIcon size={35} />
                                <Typography variant="h6">Total Products</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">80</Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Average Rating Card */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} className="card" sx={{ border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
                        <div className="card-container">
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <FavoriteBorder sx={{ fontSize: 35 }} />
                                <Typography variant="h6">Average Rating</Typography>
                            </Box>
                            <Typography color={'primary'} fontWeight={'bold'} variant="h4">4.5</Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6.5}>
                    <Paper elevation={3} className="chart-container" sx={{ padding: 2 }}>
                        <Typography variant="h6" className="chart-title">Sales Performance Over Time</Typography>
                        <Box sx={{
                            width: '100%',
                            height: {
                                xs: 200,
                                sm: 400,
                                md: 300
                            }
                        }}>
                            <LineChart
                                series={[{
                                    data: [2000, 4000, 3000, 5000, 6000],
                                    color: theme.palette.primary.main
                                }]}
                                width={520}
                                height={300}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5.5}>
                    <Paper elevation={3} className="chart-container" sx={{ padding: 2 }}>
                        <Typography variant="h6" className="chart-title">Product Stock Distribution</Typography>
                        <Box sx={{
                            width: '100%',
                            height: {
                                xs: 200,
                                sm: 400,
                                md: 300
                            }
                        }}>
                            <PieChart
                                colors={[theme.palette.primary.light, theme.palette.primary.dark]}
                                series={[
                                    {
                                        data: [
                                            { label: 'In Stock', value: 120 },
                                            { label: 'Out of Stock', value: 30 },
                                        ],
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: -45,
                                        endAngle: 225,
                                        cx: 150,
                                        cy: 150
                                    }
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




// // src/SupplierDashboard.tsx
// import React from 'react';
// import { Box, Grid, Paper, Typography, CircularProgress, useTheme } from '@mui/material';
// import { BarChart, PieChart } from '@mui/x-charts';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { alpha } from '@mui/material/styles';


// const supplierData = {
//     name: 'Supplier A',
//     totalProducts: 150,
//     inStock: 120,
//     sales: 10000,
//     averageRating: 4.5,
//     averageDeliveryTime: 2,
//     onTimeDeliveryRate: 95,
// };

// const SupplierDashboard: React.FC = () => {
//     const loading = false;
//     const theme = useTheme()

//     return (
//         <Box sx={{ flexGrow: 1, padding: 2 }}>
//             <Grid container spacing={2} sx={{ my: 2 }}>
//                 <Grid item xs={12} md={4}>
//                     <Paper elevation={1} sx={{ padding: 2, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
//                         <Typography variant="h5">Total Revenue</Typography>
//                         <Typography variant="h6">$12,000</Typography>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Paper elevation={1} sx={{ padding: 2, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
//                         <Typography variant="h5">Total Orders</Typography>
//                         <Typography variant="h6">150</Typography>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Paper elevation={1} sx={{ padding: 2, textAlign: 'center', borderRadius: 2, border: '1px solid', borderColor: (theme) => alpha(theme.palette.primary.main, 0.5) }}>
//                         <Typography variant="h5">Total Products</Typography>
//                         <Typography variant="h6">80</Typography>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6.5}>
//                     <Paper elevation={3} sx={{ padding: 2 }}>
//                         <Typography variant="h6">Sales Performance Over Time</Typography>
//                         <Box sx={{
//                             width: '100%',
//                             height: {
//                                 xs: 200,
//                                 sm: 400,
//                                 md: 300
//                             }
//                         }}>
//                             <LineChart
//                                 series={[{
//                                     data: [2000, 4000, 3000, 5000, 6000],
//                                     color: theme.palette.primary.main
//                                 }]}
//                                 width={520}
//                                 height={300}
//                             />
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={5.5}>
//                     <Paper elevation={3} sx={{ padding: 2 }}>
//                         <Typography variant="h6">Product Stock Distribution</Typography>
//                         <Box sx={{
//                             width: '100%',
//                             height: {
//                                 xs: 200,
//                                 sm: 400,
//                                 md: 300
//                             }
//                         }}>
//                             <PieChart
//                                 colors={[theme.palette.primary.light, theme.palette.primary.dark]}

//                                 series={[
//                                     {
//                                         data: [
//                                             { label: 'In Stock', value: 120 },
//                                             { label: 'Out of Stock', value: 30 },
//                                         ],


//                                         innerRadius: 30,
//                                         outerRadius: 100,
//                                         paddingAngle: 5,
//                                         cornerRadius: 5,
//                                         startAngle: -45,
//                                         endAngle: 225,
//                                         cx: 150,
//                                         cy: 150
//                                     }
//                                 ]}
//                             />
//                         </Box>

//                     </Paper>
//                 </Grid>
//             </Grid>

//         </Box >
//     );
// };

// export default SupplierDashboard;
