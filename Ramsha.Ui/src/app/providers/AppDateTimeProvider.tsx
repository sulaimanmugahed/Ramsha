import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';



type Props = {
    children: React.ReactNode

}

const AppDateTimeProvider = ({ children }: Props) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationProvider>
    )
}

export default AppDateTimeProvider