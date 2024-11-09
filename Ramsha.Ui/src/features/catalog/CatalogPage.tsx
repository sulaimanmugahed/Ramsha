import { Box, Chip, IconButton, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import AppSearch from '../../app/components/AppSearch';
import { AppFilterIcon } from "../../app/components/icons/AppFilterIcon";
import { AppSortDesIcon } from "../../app/components/icons/AppSortIcon";
import { useCatalogCategories } from "../../app/hooks/catalogHooks";
import { useFiltering } from "../../app/hooks/filteringHooks";
import { useProductBrands } from "../../app/hooks/productHooks";
import CatalogFilter from "./CatalogFilter";
import ProductList from "./ProductList";

const CatalogPage = () => {
    const [filterModal, setFilterModal] = useState<{ open: boolean, type: 'filter' | 'sort' | undefined }>({ open: false, type: undefined });
    const { filterParams, updateFilterParams } = useFiltering();

    const { categories } = useCatalogCategories();
    const { brands } = useProductBrands();

    const filters = useMemo(() => {
        const categoryFilters = categories?.filter(c => filterParams.categories?.some(x => x.value === c.id)).map(x => ({
            label: x.label,
            value: x.id,
            type: 'category'
        })) || [];

        const brandFilters = brands?.filter(b => filterParams.brands?.some(x => x.value === b.id)).map(x => ({
            label: x.name,
            value: x.id,
            type: 'brand'
        })) || [];

        return [...categoryFilters, ...brandFilters];
    }, [filterParams.categories, filterParams.brands, categories, brands]);

    const handleToggleExpand = (type?: 'filter' | 'sort') => {
        setFilterModal((prev) => ({ open: !prev.open, type }));
    };

    const handleSearch = (search: any) => {
        const searchValue = search.searchValue;
        updateFilterParams({
            globalFilterValue: searchValue
        });
    };

    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Box
                sx={{
                    width: filterModal.open ? 250 : 0,
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    display: filterModal.open ? 'block' : 'none',
                }}
            >
                <CatalogFilter type={filterModal.type} expanded={filterModal.open} setExpanded={handleToggleExpand} />
            </Box>

            <Box flex={1}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} sx={{ overflow: 'hidden', p: 0.5 }}>
                    <Box display="flex" gap={2} alignItems="center" flexWrap="nowrap" sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
                        {!filterModal.open && (
                            <>
                                <Tooltip title="Filter Products" arrow>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleToggleExpand('filter')}
                                        sx={{
                                            transform: filterModal.open ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    >
                                        <AppFilterIcon width={28} height={28} color="inherit" fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Sorting Products" arrow>
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleToggleExpand('sort')}
                                        sx={{
                                            transform: filterModal.open ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                        }}
                                    >
                                        <AppSortDesIcon width={28} height={28} color="inherit" fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                overflowX: 'auto',
                                gap: 1,
                                width: 250,
                                padding: '8px 0',
                                minWidth: 0,
                                flex: '1 1 auto',
                                marginRight: '16px',
                                "&::-webkit-scrollbar": {
                                    display: 'none',
                                },
                            }}
                        >
                            {filters.map((filter) => (
                                <Chip
                                    key={filter.value}
                                    label={filter.label}
                                    variant="outlined"
                                    color={filter.type === 'category' ? "primary" : "secondary"}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ flexShrink: 0, minWidth: 350 }}>
                        <AppSearch
                            styles={{ width: '100%' }}
                            defaultValue={filterParams.globalFilterValue}
                            placeholder="Search ..."
                            onSubmit={handleSearch}
                        />
                    </Box>
                </Box>

                <ProductList show={filterModal.open ? 4 : 3} />
            </Box>
            <Outlet />
        </Box>
    );
};

export default CatalogPage;
