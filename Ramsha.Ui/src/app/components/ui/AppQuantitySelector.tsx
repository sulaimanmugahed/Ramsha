import { Add, Remove } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Typography } from '@mui/material'
import { AppDeleteIcon } from '../icons/AppDeleteIcon'


type Props = {
    increasing?: boolean
    decreasing?: boolean
    availableQuantity?: number
    quantity: number
    onChange?: (selected: number) => void,
    onIncrease?: () => void,
    onDecrease?: () => void
    allowDelete?: boolean
}

const AppQuantitySelector = ({ availableQuantity, onChange, quantity, onIncrease, onDecrease, increasing, decreasing, allowDelete }: Props) => {


    const disabled = () => availableQuantity ? quantity >= availableQuantity : false;

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
            <LoadingButton
                disabled={quantity <= 1 && !allowDelete}
                loading={decreasing}
                onClick={availableQuantity && onChange ? () => onChange(Math.max(quantity - 1, 1)) : onDecrease}
                sx={{
                    padding: "3px",
                }}
            >
                {allowDelete && quantity === 1 ? <AppDeleteIcon /> : <Remove />}
            </LoadingButton>


            <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", minWidth: 40, textAlign: 'center' }}>
                {quantity}
            </Typography>
            <LoadingButton
                loading={increasing}
                onClick={availableQuantity && onChange ? () => onChange(Math.min(quantity + 1, availableQuantity)) : onIncrease}
                sx={{
                    padding: "3px",
                }}
                disabled={disabled()}
            >
                <Add />
            </LoadingButton>
        </Box >
    )
}

export default AppQuantitySelector