import { Box, BoxProps } from '@mui/material'


type AppImageProps = {
    src: string

} & BoxProps
export const AppImage = ({
    src,
    ...props
}: AppImageProps) => {
    return (
        <Box
            {...props}
            component="img"
            src={src}
        />
    )
}
