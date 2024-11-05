export const reverseGeocode = async (lat: number, lon: number): Promise<AddressInfo> => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();

    return extractAddressInfo(data);
};

export const disableMapInteraction = () => {
    const mapContainer = document.querySelector('.leaflet-container') as HTMLElement | null;
    if (mapContainer) {
        mapContainer.style.pointerEvents = 'none';
    }
};

export const enableMapInteraction = () => {
    const mapContainer = document.querySelector('.leaflet-container') as HTMLElement | null;
    if (mapContainer) {
        mapContainer.style.pointerEvents = 'auto';
    }
};

interface NominatimResponse {
    address?: {
        country?: string;
        state?: string;
        county?: string;
        city?: string;
        town?: string;
        village?: string;
        suburb?: string;
        district?: string;
        road?: string;
        postcode?: string;
    };
    lat: number;
    lon: number;
    display_name?: string;
}

export interface AddressInfo {
    country: string;
    state: string;
    city: string;
    zip: string;
    display: string;
    latitude: number;
    longitude: number;
}

export function extractAddressInfo(response: NominatimResponse): AddressInfo {
    const address: AddressInfo = {
        country: response?.address?.country || '',
        state: response?.address?.state || '',
        city: response?.address?.city || response?.address?.town || response?.address?.state || '',
        zip: response?.address?.postcode || '00000',
        display: response?.display_name || 'Unknown Address',
        latitude: response.lat,
        longitude: response.lon
    };

    return address;
}


