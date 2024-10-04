import { Typography, Button, Box, Grid } from "@mui/material"

export const BasketDropdownItem = () => {
    return (
        <Grid container>
            <Grid item xs={3}>
                <img style={{ height: 70, marginRight: 20 }} src="/sb-react1.png" alt="image" />
            </Grid>
            <Grid item xs={9} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                        <Typography variant='body1' fontWeight={'bold'}>Samsung galax s2</Typography>
                        <Typography variant='body2' color={'text.secondary'}>Natural, XL</Typography>
                    </Box>
                    <Box sx={{ border: '2px solid', borderRadius: '10px', p: '5px', borderColor: 'primary.main' }}>
                        <Typography variant='body1' fontWeight={'bold'} color={'primary'}>$74</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='body2' color={'text.secondary'}>Qty 1</Typography>

                    </Box>
                    <Box>
                    </Box>
                    <Button>Delete</Button>
                </Box>

            </Grid>

        </Grid>
    )
}
