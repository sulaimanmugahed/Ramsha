// MaterialSelect.tsx
import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

type MaterialSelectProps = {
    selectedMaterial: string;
    onMaterialChange: (material: string) => void;
    materials: string[];
};

const MaterialSelect: React.FC<MaterialSelectProps> = ({ selectedMaterial, onMaterialChange, materials }) => {
    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <Select
                value={selectedMaterial}
                onChange={(e) => onMaterialChange(e.target.value)}
                displayEmpty
                sx={{ bgcolor: "lightcoral" }} // Example style for material select
            >
                <MenuItem value="" disabled>
                    Select Material
                </MenuItem>
                {materials.map((material) => (
                    <MenuItem key={material} value={material}>
                        {material}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MaterialSelect;
