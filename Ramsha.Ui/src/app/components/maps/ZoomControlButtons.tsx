import { useMap } from 'react-leaflet';


import { Box, IconButton, Tooltip } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ZoomControlButtons: React.FC = () => {
    const map = useMap();

    const handleZoomIn = (event: React.MouseEvent) => {
        event.stopPropagation();
        map.setZoom(map.getZoom() + 1);
    };

    const handleZoomOut = (event: React.MouseEvent) => {
        event.stopPropagation();
        map.setZoom(map.getZoom() - 1);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                backgroundColor: 'background.paper',
                borderRadius: 10,
                boxShadow: 3,
                padding: 0.5,
            }}
        >
            <Tooltip title="Zoom In">
                <IconButton size='small' onClick={handleZoomIn} color="primary">
                    <ZoomInIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Zoom Out">
                <IconButton size='small' onClick={handleZoomOut} color="primary">
                    <ZoomOutIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default ZoomControlButtons;