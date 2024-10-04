import { AppDeleteIcon } from '../../../app/components/icons/AppDeleteIcon';
import { AppEditIcon } from '../../../app/components/icons/AppEditIcon';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Box, CardContent, Typography, Chip, IconButton, CardMedia, Stack } from '@mui/material';
import { PreviewVariantType } from '../../../app/models/common/commonModels';
import { ProductVariantDto } from '../../../app/models/products/product';

type Props = {
    variant: PreviewVariantType|ProductVariantDto;
    onEdit: () => void;
    onDelete: () => void;
}

const VariantCard = ({
    variant,
    onEdit,
    onDelete,
}: Props) => {

    const sliderSettings = {
        dots: true,
        infinite: false, 
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, 
        responsive: [
            {
                breakpoint: 600, 
                settings: {
                    dots: true,
                },
            },
        ],
    };

    return (
        <Card
            variant="outlined"
            sx={{
                mb: 1,
                borderRadius: 1,
                boxShadow: 1,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 2,
                },
                maxWidth: 250,
                height: 350 
            }}
        >
            <CardContent>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem' }}>
                    {'sku' in variant ? variant.sku : variant.name}
                </Typography>

                <Typography variant="body1"  gutterBottom sx={{  }}>
                    ${variant.basePrice}
                </Typography>

                <Stack
                    direction="row"
                    spacing={0.5}
                    mt={0.5}
                    mb={0.5}
                    sx={{
                        maxHeight: 50,
                        overflowY: 'auto',
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {variant.variantValues.length > 0 ? (
                        variant.variantValues.map((value) => (
                            <Chip
                                key={value.optionName}
                                label={`${value.optionName}: ${value.valueName}`}
                                size="small"
                                variant="outlined"
                                sx={{
                                    fontSize: { xs: "0.6rem", sm: "0.7rem" },
                                    borderRadius: "12px", 
                                }}
                            />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            No values available
                        </Typography>
                    )}
                </Stack>

                <Box
                    sx={{
                        mb: 1,
                        height: 170, 
                        overflow: 'hidden',
                    }}
                >
                    {variant.variantImages?.length > 0 ? (
                        <Slider {...sliderSettings}>
                            {variant.variantImages.map((image) => (
                                <Box
                                    key={image.url}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={image.url}
                                        alt={`Variant ${1}`}
                                        loading="lazy" 
                                        sx={{
                                            width: '100%',
                                            height: '100%', 
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                No images available
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box display="flex" mt={1}>
                    <IconButton
                        onClick={onEdit}
                        color="primary"
                        sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}
                    >
                        <AppEditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        onClick={onDelete}
                        color="error"
                        sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}
                    >
                        <AppDeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default VariantCard;
