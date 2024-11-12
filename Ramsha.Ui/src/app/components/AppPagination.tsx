import { Box, Typography, Pagination, PaginationProps, SxProps, Theme } from '@mui/material'
import { useState } from 'react';
import { PagedMetaData } from '../models/common/commonModels';



interface Props {
    metaData: PagedMetaData;
    onPageChange: (page: number) => void,
    paginationProps?: PaginationProps
    paginationContainerStyle?: SxProps<Theme>
}


const AppPagination = ({
    metaData,
    onPageChange,
    paginationProps,
    paginationContainerStyle }: Props) => {

    const { pageNumber, pageSize, totalCount, totalPages } = metaData;
    const [inPageNumber, setInPageNumber] = useState(pageNumber)


    const handlePageChange = (page: number) => {
        setInPageNumber(page)
        onPageChange(page);
    }

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={paginationContainerStyle} >
            <Typography>
                Displaying {(pageNumber - 1) * pageSize + 1} - {pageNumber * pageSize > totalCount ? totalCount : pageNumber * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color="primary"
                size="small"
                count={totalPages}
                page={inPageNumber}
                onChange={(_, page) => handlePageChange(page)}
                {...paginationProps}
            />
        </Box>
    )
}

export default AppPagination
