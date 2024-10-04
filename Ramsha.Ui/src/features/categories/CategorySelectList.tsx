import React, { useState, MouseEvent, useMemo } from 'react';
import {
    MenuItem,
    FormControl,
    ListItemText,
    IconButton,
    Collapse,
    CircularProgress,
    Box,
    Popover,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { CategoryDto } from '../../app/models/products/product';
import AppSearch from '../../app/components/AppSearch';


type Props = {
    categories: CategoryDto[];
    loading?: boolean;
    selectedCategory?: string;
    onCategoryChange: (categoryId: string) => void;
};

const CategorySelectList: React.FC<Props> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    loading

}) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleExpandToggle = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.has(categoryId) ? new Set([...prev].filter(id => id !== categoryId)) : new Set(prev).add(categoryId)
        );
    };


    const handleSearch = (data: any) => {
        setSearchTerm(data.searchValue);
    };


    const filteredCategories = useMemo(() => categories?.filter(category =>
        category.label?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [categories, searchTerm]);

    const isHasChildSelected = (parCategory: CategoryDto) => {
        if (!(parCategory.children && parCategory.children.length > 0))
            return false;

        const childrenIds = getAllCategoryIds(parCategory.children)

        return childrenIds.includes(selectedCategory || '')
    }

    const isSelectedItem = (category: CategoryDto) => selectedCategory === category.id || (isHasChildSelected(category) && !expandedCategories.has(category.id));

    const renderMenuItems = (categories: CategoryDto[], depth: number = 0): JSX.Element[] => {
        return categories.map(category => (
            <>
                <Box sx={{ marginLeft: `${depth * 10}px`, paddingRight: `${depth * 10}px`, }}>
                    <MenuItem
                        onClick={() => !(category.children && category.children.length > 0) ? onCategoryChange(category.id) : handleExpandToggle(category.id)}
                        sx={{
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: isSelectedItem(category) ? 'primary.main' : 'inherit', // Highlight selected category
                            borderRadius: '4px',
                            margin: '2px 0', // Margin between items
                            ':hover': {
                                backgroundColor: isSelectedItem(category) ? 'primary.main' : 'auto'
                            },
                            

                        }}
                    >
                        <ListItemText primary={category.label} />
                        {category.children && category.children.length > 0 && (
                            <IconButton
                                edge="end"
                                size="small"
                                style={{
                                    marginLeft: 'auto',
                                    minWidth: '24px',
                                }}
                            >
                                {expandedCategories.has(category.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        )}
                    </MenuItem >
                </Box>
                {
                    category.children && category.children.length > 0 && (
                        <Collapse in={expandedCategories.has(category.id)}>
                            <div>{renderMenuItems(category.children, depth + 1)}</div>
                        </Collapse>
                    )
                }
            </>
        ));
    };


    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Closes the popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <FormControl fullWidth>
            <Box
                onClick={handleClick}
                sx={{
                    border: '1px solid #ccc',
                    padding: '5px',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Typography variant="body1">
                    {selectedCategory ? findCategoryById(categories, selectedCategory)?.label || 'Select Category' : 'Select Category'}
                </Typography>
                <IconButton
                    edge="end"
                    size="small"
                    sx={{
                        marginLeft: 'auto',
                        minWidth: '24px', 
                        padding: '4px', 
                        display: 'flex', 
                    }}
                >
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    overflow: 'auto',
                     // Ensure the popover can scroll if needed
                }}
                slotProps={{
                    paper: {
                        sx: { maxHeight: 400, width: 400, padding: 2,bgcolor:'Background.paper.main' },
                    }
                }}
            >
                <AppSearch
                    placeholder="Search categories..."
                    styles={{ marginBottom: 2 }}
                    onSubmit={handleSearch}
                />

                {loading ? (
                    <CircularProgress size={24} />
                ) : (
                    renderMenuItems(filteredCategories)
                )}
            </Popover>
        </FormControl>
    );
};

const findCategoryById = (categories: CategoryDto[], id: string): CategoryDto | undefined => {
    for (const category of categories) {
        if (category.id === id) return category;
        if (category.children && category.children.length > 0) {
            const found = findCategoryById(category.children, id);
            if (found) return found;
        }
    }
    return undefined;
};

// Helper function to get all category IDs for expanding all
const getAllCategoryIds = (categories: CategoryDto[]): string[] => {
    const ids: string[] = [];
    const collectIds = (cats: CategoryDto[]) => {
        cats.forEach(category => {
            ids.push(category.id);
            if (category.children && category.children.length > 0) {
                collectIds(category.children);
            }
        });
    };
    collectIds(categories);
    return ids;
};

export default CategorySelectList;
