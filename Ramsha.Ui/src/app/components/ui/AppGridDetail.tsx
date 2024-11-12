import { Grid, Typography } from "@mui/material";

type Props = {
    items: { label: string, value: string }[];
}


const AppGridDetail = ({ items }: Props) => {
    return (
        <Grid container spacing={2}>
            {
                items.map(item => (
                    <Grid item xs={6}>
                        <Typography variant="body2" fontWeight="bold">{item.label}</Typography>
                        <Typography variant="body2">{item.value}</Typography>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default AppGridDetail