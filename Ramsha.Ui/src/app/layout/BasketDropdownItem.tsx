import { Box, Grid, Typography } from "@mui/material"
import AppQuantitySelector from "../components/ui/AppQuantitySelector"
import { useBasketItemCommands } from "../hooks/basketHooks"
import { BasketItem } from "../models/baskets/basket"




type Props = {
    item: BasketItem,
}
export const BasketDropdownItem = ({ item }: Props) => {

    const { addItem, removeItem, isAddPending, isRemovePending } = useBasketItemCommands()

    return (
        <Grid container>
            <Grid item xs={3}>
                <img style={{ height: 70, marginRight: 20 }} src={item.imageUrl} alt="image" />
            </Grid>
            <Grid item xs={9} >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                        <Typography variant='body1' fontWeight={'bold'}>{item.name}</Typography>
                        <Typography variant='body2' color={'text.secondary'}>{item?.inventorySku}</Typography>
                    </Box>
                    <Box sx={{ border: '1px solid', borderRadius: '10px', p: '5px', borderColor: 'primary.main' }}>
                        <Typography variant='body1' fontWeight={'bold'} color={'primary'}>${item.finalPrice}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='body2' color={'text.secondary'}>Qty {item.quantity}</Typography>
                    </Box>
                    <Box>
                        <AppQuantitySelector
                            increasing={isAddPending}
                            decreasing={isRemovePending}
                            onIncrease={() => addItem({ inventoryItemId: item.inventoryItemId, quantity: 1 })}
                            onDecrease={() => removeItem({ inventoryItemId: item.inventoryItemId, quantity: 1 })}
                            quantity={item.quantity}
                            allowDelete />
                    </Box>
                </Box>

            </Grid>

        </Grid >
    )
}
