import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, IconButton, FormControlLabel as MuiFormControlLabel, Radio, RadioGroup, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import AppDivider from '../../app/components/AppDivider';
import AppRating from '../../app/components/AppRating';
import AppSelector, { Option } from '../../app/components/AppSelector';
import { CATALOG_FILTER_COLUMNS } from '../../app/constants/filterColumnNames';
import { useBrands } from '../../app/hooks/brandHooks';
import { useCategories } from '../../app/hooks/categoryHooks';
import { useCurrencies } from '../../app/hooks/currencyHooks';
import { useFiltering } from '../../app/hooks/filteringHooks';
import { useSorting } from '../../app/hooks/sortingHooks';
import { BrandFilter, CategoryFilter, FilterParams } from '../../app/models/common/commonModels';
import { CurrencyCode } from '../../app/models/common/currency';
import AppMultiCategorySelector from '../categories/AppMultiCategorySelector';

interface FilterComponentProps {
  expanded: boolean;
  type?: 'filter' | 'sort';
  setExpanded: (type?: 'filter' | 'sort') => void;
}

const CatalogFilter: React.FC<FilterComponentProps> = ({ type, expanded, setExpanded }) => {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD')
  const { filterParams, updateFilterParams, clearFilterParams } = useFiltering();
  const { categories } = useCategories();
  const { brands } = useBrands();
  const { currencies } = useCurrencies()

  const [selectedCategories, setSelectedCategories] = useState<CategoryFilter[]>(filterParams.categories || []);
  const [selectedBrands, setSelectedBrands] = useState<BrandFilter[]>(filterParams.brands || []);
  const [priceRange, setPriceRange] = useState<number[] | null>(() => {
    const column = filterParams.columnsFilter?.find(x => x.filterColumn === CATALOG_FILTER_COLUMNS.RETAIL_PRICE);
    if (column?.value && column?.valueTo) {
      const minPrice = parseInt(column.value, 10);
      const maxPrice = parseInt(column.valueTo, 10);
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        return [minPrice, maxPrice];
      }
    }
    return null;
  });
  const [rating, setRating] = useState<number | null>(null);
  const [inStock, setInStock] = useState<boolean>(() => {
    const column = filterParams.columnsFilter?.find(x => x.filterColumn == CATALOG_FILTER_COLUMNS.InventoryStatus);
    return column?.value === 'true';
  });

  const { sortingParams, setSpecificColumn } = useSorting()

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleApplyFilters = () => {
    const filters: FilterParams = {
      categories: selectedCategories,
      brands: selectedBrands,
      columnsFilter: []
    };

    if (priceRange) {
      const rate = currencies?.find(x => x.code === currencyCode)?.rate || 1
      const [minPrice, maxPrice] = priceRange;
      filters.columnsFilter?.push({
        filterColumn: CATALOG_FILTER_COLUMNS.RETAIL_PRICE,
        value: (minPrice * (1 / rate)).toString(),
        valueTo: (maxPrice * (1 / rate)).toString(),
        operation: 'Between',
      });
    }

    if (inStock) {
      filters.columnsFilter?.push({
        filterColumn: CATALOG_FILTER_COLUMNS.InventoryStatus,
        value: 'InStock',
        operation: 'Equals'
      });
    }

    updateFilterParams(filters);
  };

  const handleApplySort = () => {
    sortField && setSpecificColumn(sortField, sortDirection);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 10000000]);
    setRating(null);
    setInStock(false);
    setSortField(null);
    setSortDirection('asc');
    clearFilterParams();
  };

  return (

    <Box
      sx={{
        p: 2,
        width: expanded ? 250 : 0,
        transition: 'width 0.3s ease',
        position: 'relative',
        overflowY: 'scroll',
        height: '100vh',
      }}
    >
      {expanded && (
        <Box>
          <IconButton
            onClick={() => setExpanded()}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {type === 'filter' && (
            <>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              <Box sx={{ my: 2 }}>
                <Typography gutterBottom>Categories</Typography>
                <AppMultiCategorySelector
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                  categories={categories || []}
                />
              </Box>
              <AppDivider />

              <Box sx={{ my: 2 }}>
                <Typography gutterBottom>Brands</Typography>
                <AppSelector
                  options={brands}
                  multiple
                  label="Select Brands"
                  value={brands?.filter((b) => selectedBrands.some((x) => x.value === b.id)) || []}
                  onChange={(brands) => {
                    if (brands && Array.isArray(brands)) {
                      setSelectedBrands(brands.map((x) => ({ value: x.id })));
                    }
                  }}
                />
              </Box>
              <AppDivider />
              <Box sx={{ my: 2 }}>
                <Typography sx={{ mb: 2 }}>Prices</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='body1' color={'text.secondary'} gutterBottom>Currency</Typography>
                  <AppSelector
                    options={currencies?.map(x => ({ id: x.code, name: x.code }))}
                    value={{ id: currencyCode, name: currencyCode }}
                    label='Select Currency'
                    onChange={(o) => {
                      const option: Option = o as Option
                      setCurrencyCode(option.id as CurrencyCode)
                    }}
                  />
                </Box>
                <Typography variant='body1' color={'text.secondary'} gutterBottom>Price Range</Typography>
                <Slider
                  value={priceRange || [0, 10000000]}
                  onChange={(e, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000000}
                  sx={{ width: '90%', mx: 'auto' }}
                />
              </Box>
              <AppDivider />

              <Box sx={{ my: 2 }}>
                <Typography gutterBottom>Minimum Rating</Typography>
                <AppRating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  precision={1}
                  size='large'
                />
              </Box>

              <Box sx={{ my: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={inStock}
                      onChange={(e) => setInStock(e.target.checked)}
                    />
                  }
                  label="In Stock Only"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApplyFilters}
                  fullWidth
                >
                  Apply Filters
                </Button>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClearFilters}
                  fullWidth
                  sx={{ borderRadius: '8px' }}
                >
                  Clear Filters
                </Button>
              </Box>
            </>
          )}

          {type === 'sort' && (
            <>
              <Typography variant="h6" gutterBottom>
                Sorting
              </Typography>

              <Box sx={{ my: 2 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sort By</FormLabel>
                  <RadioGroup
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                  >
                    <MuiFormControlLabel value="Price" control={<Radio />} label="Price" />
                    <MuiFormControlLabel value="AverageRating" control={<Radio />} label="Rating" />
                    <MuiFormControlLabel value="Created" control={<Radio />} label="Newest" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ my: 2 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sort Direction</FormLabel>
                  <RadioGroup
                    row
                    value={sortDirection}
                    onChange={(e) => setSortDirection(e.target.value as 'asc' | 'desc')}
                  >
                    <MuiFormControlLabel value="asc" control={<Radio />} label="Ascending" />
                    <MuiFormControlLabel value="desc" control={<Radio />} label="Descending" />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleApplySort}
                  fullWidth
                >
                  Apply Sort
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CatalogFilter;
