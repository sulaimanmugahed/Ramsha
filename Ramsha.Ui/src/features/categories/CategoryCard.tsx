import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { CatalogCategory } from "../../app/models/catalog/catalogCategory";



type Props = {
    category: CatalogCategory
}
const CategoryCard = ({ category }: Props) => {
    return (

        <Card
            sx={{
                width: { md: 200, sm: 200, xs: 200 },
                borderRadius: 5,
                border: '1px solid',
                zIndex: 1000,
                transition: "all 0.3s ease",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                    transform: "translateY(-5px)",
                },
                position: "relative",
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.5)

            }}
        >
            <Link to={`/catalog/products?category=${category.id}`}>

                <Box sx={{
                    height: { md: 180, sm: 180, xs: 180 },

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,

                }}>

                    <CardMedia
                        component={'img'}
                        src={category.imageUrl}
                        alt={category.label}
                        sx={{ borderRadius: 5, height: '100%', width: '100%' }}
                    />
                </Box>
            </Link>
            <CardContent sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography
                    variant="body1"
                    fontWeight={'bold'}
                >{category.label}
                </Typography>
                <Typography
                    variant='caption'
                    color={'text.secondary'}
                >

                    {
                        category.numberOfProducts === 0 ? " No product Available" :
                            `${category.numberOfProducts} ${category.numberOfProducts === 1 ? "product" : "products"}`
                    }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CategoryCard