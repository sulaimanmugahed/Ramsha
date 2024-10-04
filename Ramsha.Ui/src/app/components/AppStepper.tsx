import * as React from 'react';
import MobileStepper from '@mui/material/MobileStepper';


type AppStepperProps = {
    activeStep: number
    steps: number
    nextButton: React.ReactNode
    backButton: React.ReactNode
}
export const AppStepper = ({ nextButton, backButton, activeStep, steps }: AppStepperProps) => {

    return (
        <MobileStepper
            variant="dots"
            steps={steps}
            position="static"
            sx={{ backgroundColor: 'inherit' }}
            activeStep={activeStep}
            nextButton={
                nextButton
            }
            backButton={
                backButton
            }
        />
    );
}