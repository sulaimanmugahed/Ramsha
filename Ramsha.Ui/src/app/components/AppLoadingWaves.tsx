import React, { useEffect, useState } from 'react';
import { Box, LinearProgress, SxProps, Theme, Typography } from '@mui/material';

type LoadingStep = {
    key: string;
    isLoading: boolean;
    message: string;
    progress: number;
};


interface ProgressLoaderProps {
    
    loadingSteps: LoadingStep[];
    containerSx?: SxProps<Theme>; 
    progressSx?: SxProps<Theme>;  
    messageSx?: SxProps<Theme>;
    showProgress?: boolean  
}

const WaveLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
    <Box display="flex" justifyContent="center" alignItems="flex-end" height="20px">
        {Array.from({ length: 3 }).map((_, index) => (
            <Box display="flex" key={index} alignItems="flex-end" mx={0.5}>
                <Box
                    width={8}
                    height={8}
                    borderRadius="50%"
                    bgcolor={isLoading ? 'primary.main' : 'grey.500'}
                    sx={{
                        animation: isLoading ? `wave 0.8s infinite alternate` : 'none',
                        animationDelay: `${index * 0.15}s`,
                        transition: 'background-color 0.3s ease',
                    }}
                />
            </Box>
        ))}
    </Box>
);

const AppLoadingWaves: React.FC<ProgressLoaderProps> = ({
    loadingSteps,
    containerSx,
    progressSx,
    messageSx,
    showProgress
}) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const activeStep = loadingSteps.find(step => step.isLoading);
        setProgress(activeStep?.progress || 100);
    }, [loadingSteps]);

    const isLoading = loadingSteps.some(step => step.isLoading);

    const currentLoadingMessage = loadingSteps.find(step => step.isLoading)?.message || 'All data loaded successfully!';

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={2}
            sx={containerSx} 
        >
            {
                showProgress &&
                <Box width="100%" maxWidth="500px" mb={2}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ borderRadius: 1, height: 10, ...progressSx }}
                    />
                </Box>
            }

            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', ...messageSx }}>
                    {currentLoadingMessage}
                </Typography>
                <WaveLoader isLoading={isLoading} />
            </Box>
        </Box>
    );
};

export default AppLoadingWaves;
