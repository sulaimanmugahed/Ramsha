import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Rating, RatingProps } from '@mui/material'


type Props = RatingProps & {

}
const AppRating = (props: Props) => {
    return (
        <Rating {...props} size='small' precision={0.5} icon={<Favorite fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorder fontSize='inherit' />} />
    )
}

export default AppRating