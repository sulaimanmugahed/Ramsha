import React from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";



const colorMap: { [key: string]: string } = {
    Yellow: "yellow",
    Red: "#FF5733",
    Blue: "#3357FF",
    Grey: "#7D7D7D",
    Pink: "#FF69B4",
    Black: "#000000",
    Beige: "#F5F5DC",
    Green: "#33FF57",
    "Light Blue": "#ADD8E6",
    "Orange Striped": "#FFA500",
};

type ColorSelectProps = {
    selectedColor: string;
    onColorChange: (color: string) => void;
    colors: string[]
};

const ColorSelect: React.FC<ColorSelectProps> = ({ selectedColor, onColorChange, colors }) => {

    const { t } = useTranslation();


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid lightgray',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: 2,
                maxHeight: '200px',
                overflow: 'hidden',
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 1,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    width: '100%',
                    p: 2
                }}
            >
                {colors.map((colorName) => {
                    const hex = colorMap[colorName] || "#FFFFFF";
                    return (
                        <Box
                            key={colorName}
                            onClick={() => onColorChange(colorName)}
                            sx={{
                                width: selectedColor === colorName ? '35px' : '30px',
                                height: selectedColor === colorName ? '35px' : '30px',
                                backgroundColor: hex,
                                borderRadius: 20,
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: 3,
                                },
                            }}
                            title={t(`color.${colorName}`)}
                        />
                    );
                })}
            </Box>
            {/* <Box sx={{ mt: 2, textAlign: 'center' }}>
                <span>{t('color.selectedColor')} {t(`color.${selectedColor}`) || 'None'}</span>
            </Box> */}
        </Box>
    );
};

export default ColorSelect;
