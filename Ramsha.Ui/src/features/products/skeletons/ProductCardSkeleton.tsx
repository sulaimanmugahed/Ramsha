import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Card, CardContent, IconButton, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
    return (
        <Card
            sx={{
                width: { xs: '90%', sm: 250, md: 280 },
                borderRadius: "1rem",
                transition: "all 0.3s ease",
                p: 0,
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Box sx={{ position: "relative" }}>
                <Skeleton variant="rectangular" height={200} />
            </Box>

            <CardContent sx={{ px: { xs: 1.5, sm: 2 } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="30%" />
                </Box>
                <Skeleton variant="text" width="70%" sx={{ mt: 1 }} />
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                    <Box display="flex" alignItems="center">
                        <Skeleton variant="text" width="50%" sx={{ mr: 1 }} />
                        <Skeleton variant="text" width="30%" />
                    </Box>
                    <IconButton
                        aria-label="add to favorites"
                        sx={{
                            padding: 0,
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                        }}
                    >
                        <FavoriteIcon sx={{ color: 'error.main', fontSize: '1.5rem' }} />
                    </IconButton>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Skeleton variant="text" width="50%" />
                    <Skeleton variant="text" width="30%" />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCardSkeleton;
