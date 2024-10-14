import { Remove, Add } from '@mui/icons-material'
import { IconButton, Box, Typography } from '@mui/material'


type Props = {
    availableQuantity: number
    selectedQuantity: number
    onChange: (selected: number) => void
}

const AppQuantitySelector = ({ availableQuantity, onChange, selectedQuantity }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                borderRadius: 2,
                padding: '4px',
            }}
        >

            <IconButton
                onClick={() => onChange(Math.max(selectedQuantity - 1, 1))}
                sx={{
                    padding: "3px",
                }}
                disabled={selectedQuantity <= 1}
            >
                <Remove />
            </IconButton>


            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", minWidth: 40, textAlign: 'center' }}>
                {selectedQuantity}
            </Typography>
            <IconButton
                onClick={() => onChange(Math.min(selectedQuantity + 1, availableQuantity))}
                sx={{
                    padding: "3px",
                }}
                disabled={selectedQuantity >= availableQuantity}
            >
                <Add />
            </IconButton>
        </Box>
    )
}

export default AppQuantitySelector