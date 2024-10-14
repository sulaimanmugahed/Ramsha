import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef } from 'react';

type ResponsiveSetting = {
    breakpoint: number;
    settings: {
        slidesToShow?: number;
        slidesToScroll?: number;
        dots?: boolean;
        infinite?: boolean;
    };
};

type Props<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode; // Render function for the item
    slidesToShow?: number;
    responsive?: ResponsiveSetting[];
    arrows?: boolean
    dots?: boolean

};

interface CustomDotProps {
    index: number;
    active: boolean;
    goToSlide: (index: number) => void;

}

const CustomDot: React.FC<CustomDotProps> = ({ index, active, goToSlide }) => {
    const theme = useTheme();

    return (
        <Box
            onClick={() => goToSlide(index)}
            sx={{
                width: active ? 14 : 8,
                height: active ? 14 : 8,
                borderRadius: '50%',
                backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[400],
                transition: 'background-color 0.3s, transform 0.3s',
                cursor: 'pointer',
                mx: 0.5,
                '&:hover': {
                    transform: active ? 'scale(1.1)' : 'scale(1.3)',
                },
            }}
        />
    );
};

const AppSlider = <T,>({
    items,
    renderItem,
    slidesToShow = 3,
    responsive = [],
    arrows = false,
    dots = false
}: Props<T>) => {
    const theme = useTheme();
    const sliderRef = useRef<Slider>(null); // Create a ref for the slider

    // Default responsive settings
    const defaultResponsiveSettings: ResponsiveSetting[] = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                dots: true,
            },
        },
    ];

    // Combine default and custom responsive settings
    const combinedResponsiveSettings = [
        ...defaultResponsiveSettings,
        ...responsive.map((setting) => ({
            breakpoint: setting.breakpoint,
            settings: {
                slidesToShow: setting.settings.slidesToShow ?? 1,
                slidesToScroll: setting.settings.slidesToScroll ?? 1,
                dots: setting.settings.dots ?? true,
                infinite: setting.settings.infinite ?? false,
            },
        })),
    ];

    const sliderSettings = {
        dots,
        infinite: items.length > slidesToShow,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        arrows,
        autoplaySpeed: 3000,
        appendDots: (dots: React.ReactNode) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                {React.Children.map(dots, (dot, index) => {
                    if (React.isValidElement(dot)) {
                        return (
                            <div key={index}>
                                <CustomDot
                                    index={index}
                                    active={dot.props.className.includes('slick-active')}
                                    goToSlide={(index) => sliderRef.current?.slickGoTo(index)}
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        ),

        cssEase: 'ease-in-out',
        responsive: combinedResponsiveSettings, // Use combined responsive settings
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        // <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
        <Slider ref={sliderRef} {...sliderSettings}>
            {items.map((item, index) => renderItem(item, index))}
        </Slider>
        // </Box>
    );
};

export default AppSlider;

// Custom arrows
const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    const theme = useTheme();
    return (
        <IconButton
            size='medium'
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '0',
                opacity: 0.5,
                transform: 'translateY(-50%)',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: `0px 4px 15px ${theme.palette.grey[600]}`,
                    opacity: 1,

                },
                // width: 48,
                // height: 48,
                borderRadius: '50%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                zIndex: 1000,
            }}
        >
            <ArrowBackIosIcon
                sx={{
                    color: theme.palette.common.white,
                    fontSize: '1.1rem',
                }}
            />
        </IconButton>
    );
};

const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    const theme = useTheme();
    return (
        <IconButton
            size='medium'
            onClick={onClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: '0',
                opacity: 0.5,

                transform: 'translateY(-50%)',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: `0px 4px 15px ${theme.palette.grey[600]}`,
                    opacity: 1,
                },
                // width: 48,
                // height: 48,
                borderRadius: '50%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                zIndex: 1000,
            }}
        >
            <ArrowForwardIosIcon
                sx={{
                    color: theme.palette.common.white,
                    fontSize: '1.1rem',
                }}
            />
        </IconButton>
    );
};
