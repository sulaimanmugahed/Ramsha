import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, BoxProps } from '@mui/material';
import MapInput from './MapInput';
import LocateUserButton from './LocateUserButton';
import ZoomControlButtons from './ZoomControlButtons';
import { reverseGeocode, AddressInfo } from './mapUtils';

const defaultPosition: LatLngExpression = [13.9720929, 44.1625338];

export interface MarkerData {
    position: LatLngExpression;
    popupText: string;
}

type AppMapsProps = {
    defaultMarker?: MarkerData;
    center?: LatLngExpression;
    onAddressChange?: (newAddress: AddressInfo | null) => void;
} & BoxProps;

const AppMaps: React.FC<AppMapsProps> = ({
    defaultMarker = null,
    center = defaultPosition,
    onAddressChange,
    ...props
}) => {
    const [marker, setMarker] = useState<MarkerData | null>(defaultMarker);

    const initial = useRef(true)

    useEffect(() => {
        if (initial.current && defaultMarker?.position) {
            handleMapClick(
                Array.isArray(defaultMarker.position) ? defaultMarker.position[0] : defaultMarker.position.lat,
                Array.isArray(defaultMarker.position) ? defaultMarker.position[1] : defaultMarker.position.lng
            );
            initial.current = false
        }

    }, [defaultMarker])

    const handleMapClick = async (lat: number, lng: number) => {
        const addressInfo = await reverseGeocode(lat, lng);

        const newLocation: LatLngExpression = [lat, lng];
        setMarker({ position: newLocation, popupText: addressInfo.display })
        onAddressChange && onAddressChange(addressInfo || null);
    };

    const handlePlaceSelection = async (lat: number, lng: number, address: string) => {
        const addressInfo = await reverseGeocode(lat, lng);
        const newLocation: LatLngExpression = [lat, lng];
        setMarker({ position: newLocation, popupText: address });
        onAddressChange && onAddressChange(addressInfo || null);
    };

    return (
        <Box position="relative" height="100vh" {...props}>
            <MapInput onPlaceSelected={handlePlaceSelection} />
            <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%', borderRadius: 10 }} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <ZoomControlButtons />
                <LocateUserButton setMarker={setMarker} onAddressChange={onAddressChange} />
                <LocationMarker handleMapClick={handleMapClick} />

                {marker && marker.position && (
                    <>
                        <MapFlyTo lat={Array.isArray(marker.position) ? marker.position[0] : marker.position.lat}
                            lng={Array.isArray(marker.position) ? marker.position[1] : marker.position.lng} />
                        <MUIIconMarker position={marker.position} popupText={marker.popupText} />
                    </>
                )}
            </MapContainer>
        </Box>
    );
};

const MUIIconMarker: React.FC<{ position: LatLngExpression; popupText: string }> = ({ position, popupText }) => {
    const muiIcon = L.divIcon({
        html: `
            <div style="display: flex; align-items: center; justify-content: center; color: #f44336; font-size: 54px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });

    return (
        <Marker position={position} icon={muiIcon}>
            <Popup>{popupText}</Popup>
        </Marker>
    );
};

const LocationMarker: React.FC<{ handleMapClick: (lat: number, lng: number) => Promise<void> }> = ({ handleMapClick }) => {
    useMapEvents({
        click(e) {

            if (e.originalEvent.target instanceof HTMLElement) {
                const target = e.originalEvent.target as HTMLElement;

                if (!target.closest('.leaflet-control') && !target.closest('button')) {
                    const { lat, lng } = e.latlng;
                    handleMapClick(lat, lng);
                }
            }
        },
    });

    return null;
};

const MapFlyTo: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
    const map = useMap();
    React.useEffect(() => {
        map.flyTo([lat, lng], 13, { duration: 2 });
    }, [lat, lng, map]);
    return null;
};

export default AppMaps;
