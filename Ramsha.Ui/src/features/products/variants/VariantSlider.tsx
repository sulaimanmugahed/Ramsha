import React from 'react';
import { PreviewVariantType } from '../../../app/models/common/commonModels';
import VariantCard from './VariantCard';
import { ProductVariantDto } from '../../../app/models/products/product';
import AppSlider from '../../../app/components/ui/AppSlider';

type Props = {
    variants: (PreviewVariantType | ProductVariantDto)[];
    onEdit?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
    onDelete?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
};

const VariantSlider = ({ variants, onEdit, onDelete }: Props) => {
    const customResponsiveSettings = [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4, // Show 4 slides on large screens
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2, // Show 2 slides on medium screens
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1, // Show 1 slide on small screens
                dots: true,
            },
        },
    ];

    return (
        <AppSlider
            items={variants}
            renderItem={(variant, index) => (
                <VariantCard
                    key={index}
                    variant={variant}
                    onEdit={() => onEdit && onEdit(variant, index)}
                    onDelete={() => onDelete && onDelete(variant, index)}
                />
            )}
            slidesToShow={3}
            responsive={customResponsiveSettings}
        />
    );
};

export default VariantSlider;




// import Slider from 'react-slick';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import { PreviewVariantType } from '../../../app/models/common/commonModels';
// import { ProductVariantDto } from '../../../app/models/products/product';
// import VariantCard from './VariantCard';
// import IconButton from '@mui/material/IconButton';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React, { useRef } from 'react';

// type Props = {
//     variants: (PreviewVariantType | ProductVariantDto)[];
//     onEdit?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
//     onDelete?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
//     slidesToShow?: number;
// };

// interface CustomDotProps {
//     index: number;
//     active: boolean;
//     goToSlide: (index: number) => void; // Add this prop
// }

// const CustomDot: React.FC<CustomDotProps> = ({ index, active, goToSlide }) => {
//     const theme = useTheme();

//     return (
//         <Box
//             onClick={() => goToSlide(index)} // Use goToSlide function
//             sx={{
//                 width: active ? 16 : 10,
//                 height: active ? 16 : 10,
//                 borderRadius: '50%',
//                 backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
//                 transition: 'background-color 0.3s, transform 0.3s',
//                 cursor: 'pointer',
//                 mx: 0.5,
//                 '&:hover': {
//                     transform: active ? 'scale(1.1)' : 'scale(1.3)',
//                 },
//             }}
//         />
//     );
// };

// const VariantSlider = ({ variants, onEdit, onDelete, slidesToShow = 3 }: Props) => {
//     const theme = useTheme();
//     const sliderRef = useRef<Slider>(null); // Create a ref for the slider

//     const sliderSettings = {
//         dots: true,
//         infinite: false,
//         speed: 500,
//         slidesToShow,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         appendDots: (dots: React.ReactNode) => (
//             <div style={{ border: '2px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
//                 {React.Children.map(dots, (dot, index) => {
//                     if (React.isValidElement(dot)) {
//                         return (
//                             <div>
//                                 <CustomDot
//                                     key={index}
//                                     index={index}
//                                     active={dot.props.className.includes('slick-active')}
//                                     goToSlide={(index) => sliderRef.current?.slickGoTo(index)} // Pass the goToSlide method
//                                 />
//                             </div>
//                         );
//                     }
//                     return null;
//                 })}
//             </div>
//         ),
//         arrows: true,
//         cssEase: 'ease-in-out',
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     dots: true,
//                 },
//             },
//         ],
//         nextArrow: <CustomNextArrow />,
//         prevArrow: <CustomPrevArrow />,
//     };

//     return (
//         <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
//             <Slider ref={sliderRef} {...sliderSettings}> {/* Assign ref to Slider */}
//                 {variants.map((variant, index) => (
//                     <VariantCard
//                         key={index}
//                         variant={variant}
//                         onEdit={() => onEdit && onEdit(variant, index)}
//                         onDelete={() => onDelete && onDelete(variant, index)}
//                     />
//                 ))}
//             </Slider>
//         </Box>
//     );
// };

// export default VariantSlider;

// // Custom arrows remain unchanged
// const CustomPrevArrow = (props: any) => {
//     const { onClick } = props;
//     const theme = useTheme();
//     return (
//         <IconButton
//             onClick={onClick}
//             sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: 10,
//                 transform: 'translateY(-50%)',
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`, // Gradient background
//                 '&:hover': {
//                     transform: 'translateY(-50%) scale(1.1)', // Scale up on hover
//                     boxShadow: `0px 4px 15px ${theme.palette.grey[600]}`, // Increase shadow on hover
//                 },
//                 width: 48,
//                 height: 48,
//                 borderRadius: '50%', // Circular button
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
//                 zIndex: 1000, // Ensure the button is always on top
//             }}
//         >
//             <ArrowBackIosIcon
//                 sx={{
//                     color: theme.palette.common.white,
//                     fontSize: '1.5rem',
//                 }}
//             />
//         </IconButton>
//     );
// };

// const CustomNextArrow = (props: any) => {
//     const { onClick } = props;
//     const theme = useTheme();
//     return (
//         <IconButton
//             onClick={onClick}
//             sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 right: 10,
//                 transform: 'translateY(-50%)',
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`, // Gradient background
//                 '&:hover': {
//                     transform: 'translateY(-50%) scale(1.1)', // Scale up on hover
//                     boxShadow: `0px 4px 15px ${theme.palette.grey[600]}`, // Increase shadow on hover
//                 },
//                 width: 48,
//                 height: 48,
//                 borderRadius: '50%', // Circular button
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
//                 zIndex: 1000, // Ensure the button is always on top
//             }}
//         >
//             <ArrowForwardIosIcon
//                 sx={{
//                     color: theme.palette.common.white,
//                     fontSize: '1.5rem',
//                 }}
//             />
//         </IconButton>
//     );
// };
