import React, { useState, useEffect } from 'react';
import { TextField, IconButton, List, ListItem, Tooltip, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface AutocompleteSearchProps {
    onPlaceSelected: (lat: number, lng: number, address: string) => void;
}

const MapInput: React.FC<AutocompleteSearchProps> = ({ onPlaceSelected }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout for debouncing

    const fetchSuggestions = async (searchText: string) => {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`
        );
        const data = await response.json();
        setSuggestions(data);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);


        if (debounceTimeout) clearTimeout(debounceTimeout);

        const newTimeout = setTimeout(() => {
            if (value.trim()) {
                fetchSuggestions(value);
            } else {
                setSuggestions([]);
            }
        }, 800);

        setDebounceTimeout(newTimeout);
    };

    const handleSuggestionClick = (suggestion: { display_name: string; lat: string; lon: string }) => {
        const lat = parseFloat(suggestion.lat);
        const lon = parseFloat(suggestion.lon);
        onPlaceSelected(lat, lon, suggestion.display_name);
        setQuery(suggestion.display_name);
        setSuggestions([]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <TextField
                variant="outlined"
                size="small"
                placeholder="Search location"
                value={query}
                onChange={handleInputChange}
                InputProps={{
                    sx: {
                        borderRadius: 20,
                    },
                    endAdornment: (
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    zIndex: 1000,
                    backgroundColor: 'background.paper',
                    borderRadius: 20,
                    boxShadow: 3,
                }}
            />

            {suggestions.length > 0 && (
                <List
                    sx={{
                        position: 'absolute',
                        top: '40px',
                        left: '16px',
                        zIndex: 1000,
                        backgroundColor: 'background.paper',
                        boxShadow: 3,
                        width: '100%',
                        maxHeight: '200px',
                        overflow: 'auto',
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.display_name}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
};

export default MapInput;
