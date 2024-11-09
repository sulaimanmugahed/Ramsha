import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import CategorySelector from '../../features/categories/AppMultiCategorySelector';
import { useFiltering } from '../hooks/filteringHooks';
import { CategoryFilter, FilterOperator } from '../models/common/commonModels';
import { CategoryDto } from '../models/products/product';
import { FilterVariant } from '../types/tanstack-table';

interface Filter {
  column: string;
  value: string;
  valueTo?: string;
  operation: FilterOperator;
}

interface FilterDropdownProps {
  columns: { id: string; header: string; variant?: FilterVariant; options?: string[]; allowedOperators?: FilterOperator[]; }[];
  open: boolean;
  onClose: () => void;
  categories?: CategoryDto[];
  isLoading?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ columns, open, onClose, categories, isLoading }) => {
  const { filterParams, updateFilterParams, clearFilterParams } = useFiltering();
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryFilter[]>(filterParams.categories || []);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (open && isInitialLoad.current) {
      if (filterParams.columnsFilter) {
        const initialFilters = filterParams?.columnsFilter?.map(f => ({
          column: f.filterColumn,
          value: f.value,
          valueTo: f.valueTo || '',
          operation: f.operation as FilterOperator || 'Equals',
        }));
        setFilters(initialFilters);
      }
      isInitialLoad.current = false;
    }
  }, [filterParams.columnsFilter, open, columns]);

  const handleColumnChange = (index: number, event: SelectChangeEvent) => {
    const updatedFilters = [...filters];
    const selectedColumn = columns.find(col => col.id === event.target.value);
    if (selectedColumn) {
      updatedFilters[index].column = selectedColumn.id;
      updatedFilters[index].operation = 'Equals';
      setFilters(updatedFilters);
    }
  };

  const handleOperatorChange = (index: number, event: SelectChangeEvent) => {
    const updatedFilters = [...filters];
    updatedFilters[index].operation = event.target.value as FilterOperator;
    setFilters(updatedFilters);
  };

  const handleValueChange = (index: number, value: string) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value = value;
    setFilters(updatedFilters);
  };

  const handleValueToChange = (index: number, value: string) => {
    const updatedFilters = [...filters];
    updatedFilters[index].valueTo = value;
    setFilters(updatedFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { column: '', value: '', operation: 'Equals' }]);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const applyFilters = () => {
    const validFilters = filters.filter(filter => filter.column);
    const newFilters = validFilters.map(filter => ({
      filterColumn: filter.column,
      value: filter.value,
      valueTo: filter.operation === 'Between' ? filter.valueTo : undefined,
      operation: filter.operation
    }));
    updateFilterParams({ columnsFilter: newFilters, categories: selectedCategories });
    onClose();
    isInitialLoad.current = true;
  };

  const handleClearFilter = () => {
    clearFilterParams();
    setFilters([]);
    setSelectedCategories([]);
  };

  const getSelectedColumn = (id: string) => columns.find(col => col.id === id);

  const hasOptions = (columnId: string) => {
    const column = getSelectedColumn(columnId);
    return column?.variant === 'Select' && column?.options && column?.options.length > 0;
  };


  const getAllowedOperators = (columnId: string): FilterOperator[] => {
    const column = getSelectedColumn(columnId);
    return column?.allowedOperators || ['Equals'];
  };

  const renderDatePicker = (label: string, onChange: (newValue: Dayjs | null) => void, value?: string) => (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={onChange}
      format="MM/DD/YYYY"
    />
  );

  const renderOperators = (filter: Filter, index: number) => {
    const columnOperators = getAllowedOperators(filter.column);
    return (
      <FormControl fullWidth>
        <InputLabel size='small'>Operator</InputLabel>
        <Select
          value={filter.operation}
          onChange={(e) => handleOperatorChange(index, e)}
          label="Operator"
          size="small"
        >
          {
            columnOperators?.map(opr => (
              <MenuItem value={opr}>{opr}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }

  const renderFilterInput = (filter: Filter, index: number) => {
    const column = columns.find(col => col.id === filter.column);
    if (!column) return null;

    switch (filter.operation) {
      case 'Between':
        return column.variant === 'DatePicker' ? (
          <>
            {renderDatePicker('From date', (newValue) => handleValueChange(index, newValue ? newValue.toISOString() : ''), filter.value)}
            {renderDatePicker('To date', (newValue) => handleValueToChange(index, newValue ? newValue.toISOString() : ''), filter.valueTo)}
          </>
        ) : (
          <>
            <TextField
              label="From"
              variant="outlined"
              fullWidth
              type={column.variant === 'NumberInput' ? 'number' : 'text'}
              size="small"
              value={filter.value}
              onChange={(e) => handleValueChange(index, e.target.value)}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              label="To"
              variant="outlined"
              fullWidth
              type={column.variant === 'NumberInput' ? 'number' : 'text'}
              size="small"
              value={filter.valueTo}
              onChange={(e) => handleValueToChange(index, e.target.value)}
              sx={{ borderRadius: 2, mt: 1 }}
            />
          </>
        );
      default:
        if (hasOptions(filter.column)) {
          return (
            <FormControl fullWidth>
              <InputLabel size='small'>Select Value</InputLabel>
              <Select
                value={filter.value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                label="Select Value"
                size="small"
              >
                {column?.options?.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        }

        if (column?.variant === 'DatePicker') {
          return (
            renderDatePicker("From date", (newValue) => handleValueChange(index, newValue ? newValue.toISOString() : ''), filter.value)
          )
        }

        return (
          <TextField
            label="Filter Value"
            variant="outlined"
            fullWidth
            type={column?.variant === 'NumberInput' ? 'number' : 'text'}
            size="small"
            value={filter.value}
            onChange={(e) => handleValueChange(index, e.target.value)}
          />
        );

    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Grid container sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Products Filter</Typography>
          {categories && (
            <CategorySelector
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              categories={categories}
            />
          )}
        </Grid>

        <DialogContent sx={{ p: 3 }}>
          {filters.map((filter, index) => (
            <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center" key={index}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel size='small'>Column</InputLabel>
                  <Select
                    value={filter.column}
                    onChange={(e) => handleColumnChange(index, e)}
                    label="Select Column"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="">None</MenuItem>
                    {columns.map((column) => (
                      <MenuItem key={column.id} value={column.id}>
                        {column.header}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                {
                  renderOperators(filter, index)
                }
              </Grid>
              <Grid item xs={4}>
                {renderFilterInput(filter, index)}
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeFilter(index)} color="error">
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            onClick={addFilter}
            variant="outlined"
            size="small"
            sx={{ mt: 1, borderRadius: 2 }}
          >
            Add Filter
          </Button>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleClearFilter} color="error" sx={{ borderRadius: 2 }}>Clear</Button>
          <Box>
            <Button onClick={onClose} sx={{ mr: 1, borderRadius: 2 }}>Cancel</Button>
            <Button onClick={applyFilters} variant="contained" color="primary" sx={{ borderRadius: 2 }}>Apply</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default FilterDropdown;

