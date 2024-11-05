import { Grid, Typography, Box } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppMaps from "../../app/components/maps/AppMaps";
import { AddressInfo } from "../../app/components/maps/mapUtils";

export default function AddressFormField() {
    const { control, setValue } = useFormContext();
    const selectedAddress = useWatch({
        name: 'addressInfo',
        control
    });

    const handleAddressChange = (addressInfo: AddressInfo | null) => {
        setValue('addressInfo', addressInfo);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={5.5}>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 1
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {selectedAddress ? 'Selected Address' : 'No address selected'}
                    </Typography>
                    <Typography color={'text.secondary'} variant="body1" sx={{ mb: 2 }}>
                        {selectedAddress?.display || 'Please select your location from the map'}
                    </Typography>

                    <AppTextInput
                        control={control}
                        name="fullName"
                        label="Full Name"
                        inputStyle={{ borderRadius: 2 }}
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <AppTextInput
                        control={control}
                        name="description"
                        label={'Address Description'}
                        multiline
                        inputStyle={{ borderRadius: 2 }}
                        minRows={9}
                        maxRows={9}
                        fullWidth
                    />
                </Box>
            </Grid>

            <Grid item xs={12} sm={6.5}>
                <Box
                    sx={{
                        height: '100%',
                        borderRadius: 2,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AppMaps
                        sx={{ height: '100%', width: '100%' }}
                        onAddressChange={handleAddressChange}
                        defaultMarker={selectedAddress && { popupText: selectedAddress.display, position: [selectedAddress.latitude, selectedAddress.longitude] }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
}
