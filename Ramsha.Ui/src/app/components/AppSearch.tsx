import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper, SxProps, Theme } from "@mui/material";
import { useForm } from "react-hook-form";


type AppSearchFormValues = {
    searchValue: string
}
type AppSearchProps = {
    onSubmit: (data: AppSearchFormValues) => void,
    placeholder?: string
    styles?: SxProps<Theme>
    inputStyle?: SxProps<Theme>
    defaultValue?: string | null
}

const AppSearch = ({
    onSubmit,
    placeholder,
    styles,
    inputStyle,
    defaultValue
}: AppSearchProps) => {

    const { register, handleSubmit } = useForm<AppSearchFormValues>({
        defaultValues: {
            searchValue: defaultValue || ''
        }
    })


    return (
        <>
            <Paper
                autoComplete="off"
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ p: '2px 4px', borderRadius: 30, position: 'sticky', display: 'flex', alignItems: 'center', ...styles }}
            >
                <InputBase
                    sx={{ marginInline: 2, flex: 1, ...inputStyle }}
                    {...register('searchValue')}
                    id="searchValue"
                    placeholder={placeholder}
                    inputProps={{ 'aria-label': 'search google maps' }}
                    fullWidth
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

        </>

    )
}

export default AppSearch