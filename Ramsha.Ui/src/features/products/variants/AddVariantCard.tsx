import { Card, Box, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddCardProps = {
    onAdd: () => void;
};

const AddVariantCard = ({ onAdd }: AddCardProps) => {
    return (
        <Card
            variant="outlined"
            onClick={onAdd}
            sx={{
                mb: 1,
                borderRadius: 1,
                boxShadow: 1,
                transition: '0.3s',
                '&:hover': {
                    boxShadow: 2,
                },
                width: 250, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 350, 
                backgroundColor: 'rgba(0, 0, 0, 0.05)', 
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton
                    aria-label="add new variant"
                    color="primary"
                    sx={{
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        },
                    }}
                >
                    <AddIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mt: 1, fontSize: '1rem', color: 'text.secondary' }}
                >
                    Add New Variant
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AddVariantCard;
