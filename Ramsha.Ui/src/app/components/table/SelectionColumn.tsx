import React from 'react';
import { Checkbox } from '@mui/material';

type SelectionColumnProps = {
    table: any;
    row: any;   
    onAllRowsSelectionChange: (table: any) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRowSelectionChange: (row: any) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectionColumn: React.FC<SelectionColumnProps> = ({ table, row, onAllRowsSelectionChange, onRowSelectionChange }) => (
    <Checkbox
        checked={row ? row.getIsSelected() : table.getIsAllRowsSelected()}
        indeterminate={row ? row.getIsSomeSelected() : table.getIsSomeRowsSelected()}
        disabled={row ? !row.getCanSelect() : false}
        onChange={row ? onRowSelectionChange(row) : onAllRowsSelectionChange(table)}
    />
);

export default SelectionColumn;
