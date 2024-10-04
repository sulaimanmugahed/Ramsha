import { Divider } from '@mui/material'
import { styled, Theme, SxProps } from '@mui/material/styles'

const TitleDivider = styled(Divider)(({ theme }) => ({
    borderColor: theme.palette.divider
}))

type Props = {
    sx?: SxProps<Theme>,
    variant?: "inset" | "fullWidth" | "middle"
}

const AppDivider = ({ sx, variant }: Props) => {
    return (
        <TitleDivider variant={variant} sx={sx} />
    )
}

export default AppDivider