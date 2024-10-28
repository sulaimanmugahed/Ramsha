import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, TextField, Button, Slider } from '@mui/material';
import { useState } from 'react';

type QuantityDialogProps = {
    title?: string;
    subTitle?: string
    open: boolean;
    initialQuantity?: number;
    onClose: () => void;
    onConfirm: (quantity: number) => void;
};

const QuantitySelectorDialog = ({ title, subTitle, open, initialQuantity = 1, onClose, onConfirm }: QuantityDialogProps) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);

    const handleConfirm = () => {
        onConfirm(quantity);
        onClose();
        setQuantity(initialQuantity);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 3,
                    padding: 2,
                },
            }}
        >
            <DialogTitle sx={{  fontWeight: 'bold', fontSize: '1.2rem' }}>
                {title || 'Enter Quantity'}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {
                        subTitle &&
                        <Typography variant="body2" color="text.secondary">
                            {subTitle}
                        </Typography>
                    }

                    <Slider
                        value={quantity}
                        onChange={(e, val) => setQuantity(val as number)}
                        min={1}
                        max={100}
                        step={1}
                        valueLabelDisplay="auto"
                        sx={{
                            '& .MuiSlider-thumb': {
                                borderRadius: '8px',
                                width: 16,
                                height: 16,
                            },
                        }}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        inputProps={{ min: 1 }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                <Button onClick={onClose} variant="text" color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: 2,
                    }}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuantitySelectorDialog;
