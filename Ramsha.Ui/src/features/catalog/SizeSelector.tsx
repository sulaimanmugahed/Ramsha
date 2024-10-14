// SizeSelect.tsx
import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

type SizeSelectProps = {
    selectedSize: string;
    onSizeChange: (size: string) => void;
    sizes: string[];
};

const SizeSelect: React.FC<SizeSelectProps> = ({ selectedSize, onSizeChange, sizes }) => {
    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <Select
                size="small"
                value={selectedSize}
                onChange={(e) => onSizeChange(e.target.value)}
                displayEmpty
            >
                <MenuItem value="" disabled>
                    Select Size
                </MenuItem>
                {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SizeSelect;
