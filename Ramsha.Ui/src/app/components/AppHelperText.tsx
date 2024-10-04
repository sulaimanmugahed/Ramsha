import { Typography } from '@mui/material';

type Props = {
    error?: boolean
    children: any
}

const AppHelperText = ({ error, children }: Props) => {
    return (
        <Typography
            variant="body2"
            color={error ? 'error' : 'textSecondary'}
            sx={{ mt: 1, ml: 0.5 }}
        >
            {children}
        </Typography>
    );
};

export default AppHelperText;
