import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { MarkerData } from './AppMaps'
import { AddressInfo, reverseGeocode } from './mapUtils'


const LocateUserButton: React.FC<{ onAddressChange?: (newAddress: AddressInfo | null) => void, setMarker: React.Dispatch<React.SetStateAction<MarkerData | null>> }> = ({ setMarker, onAddressChange }) => {
    const map = useMap();

    const handleLocateUser = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const addressInfo = await reverseGeocode(latitude, longitude);
                    const newLocation: LatLngExpression = [latitude, longitude];
                    map.flyTo(newLocation, 13, { duration: 2 });
                    setMarker({
                        position: newLocation,
                        popupText: addressInfo.display,
                    });
                    onAddressChange && onAddressChange(addressInfo || null)
                },
                () => {
                    console.error("Geolocation access denied.");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <Tooltip title="Locate Me">
            <IconButton
                onClick={handleLocateUser}
                color="primary"
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 3000,
                    backgroundColor: 'background.paper',
                    '&:hover': {
                        backgroundColor: 'background.default',
                    },
                    boxShadow: 3,
                }}
            >
                <MyLocationIcon />
            </IconButton>
        </Tooltip>
    );
};

export default LocateUserButton;
