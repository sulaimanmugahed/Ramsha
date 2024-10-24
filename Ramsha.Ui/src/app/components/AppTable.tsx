import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableContainerProps, TableHead, TableProps, TableRow } from '@mui/material';
import { flexRender, HeaderGroup, Row } from '@tanstack/react-table';
import React from 'react';
import { AppSortIcon, AppSortDesIcon } from './icons/AppSortIcon';

interface AppTableProps<TData> {
    rows: Row<TData>[];
    tableContainerProps?: TableContainerProps;
    tableProps?: TableProps;
    loadingComponent?: React.ReactNode;
    headerGroups: HeaderGroup<TData>[];
    onColumnSort?: (id: string) => void;
    headerBorder?: boolean
}

const AppTable = <TData extends object>({
    loadingComponent,
    tableContainerProps,
    tableProps,
    headerGroups,
    rows,
    onColumnSort,
    headerBorder
}: AppTableProps<TData>) => {

    console.log(headerGroups);

    return (
        <Box sx={{ overflowX: 'auto' }}>
            <TableContainer sx={{ mb: 2 }} component={Paper} {...tableContainerProps}>
                <Table sx={{ minWidth: 650 }} aria-label="App Data Table" {...tableProps}>
                    <TableHead>
                        {headerGroups.map((headerGroup, groupIndex) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header, headerIndex) => (
                                    <TableCell
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        sx={{
                                            position: 'relative',
                                            borderRight: headerBorder && headerIndex < headerGroup.headers.length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                                        }}
                                        {...(header.column.getCanSort()
                                            ? { onClick: onColumnSort ? () => onColumnSort(header.column.id) : header.column.getToggleSortingHandler() }
                                            : {})}>
                                        {header.isPlaceholder ? null : (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() === "asc" ? (
                                                    <IconButton>
                                                        <AppSortIcon color='primary' width={15} height={15} />
                                                    </IconButton>
                                                ) : header.column.getIsSorted() === "desc" ? (
                                                    <IconButton>
                                                        <AppSortDesIcon color='primary' width={15} height={15} />
                                                    </IconButton>
                                                ) : null}
                                            </Box>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            loadingComponent || (
                                <TableRow>
                                    <TableCell align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )) :
                            (
                                rows.map(row => (
                                    <TableRow key={row.id} selected={row.getIsSelected()}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AppTable;
