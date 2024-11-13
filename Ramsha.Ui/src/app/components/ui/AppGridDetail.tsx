import { Grid, Typography } from "@mui/material";

type Props = {
    items: { label: string, value: string }[];
    grid?: number
}


const AppGridDetail = ({ items, grid = 6 }: Props) => {
    return (
        <Grid container spacing={2}>
            {
                items.map(item => (
                    <Grid item xs={grid}>
                        <Typography variant="body2" fontWeight="bold">{item.label}</Typography>
                        <Typography variant="body2">{item.value}</Typography>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default AppGridDetail