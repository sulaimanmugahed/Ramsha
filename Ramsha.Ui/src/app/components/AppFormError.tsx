import { ErrorMessage } from '@hookform/error-message';
import { SxProps, Theme, Typography } from '@mui/material';

type Props = {
    name: string;
    errors: any;
    styles?: SxProps<Theme>
}

const AppFormError = ({ name, styles, errors }: Props) => {

    return (
        <ErrorMessage
            as={'span'}
            errors={errors}
            name={name}
            render={(message) => (
                <Typography variant='caption' color={'error'} sx={{ ...styles }}>{message?.message}</Typography>
            )} />

    )
}

export default AppFormError