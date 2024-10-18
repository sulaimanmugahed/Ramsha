import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

type AppTableSelectionActionsProps = {
    isExportingPdf?: boolean;
    isRemovingRange?: boolean
    isExportingExcel?: boolean;
    onPdfExport?: () => void;
    onExcelExport?: () => void;
    onRemoveRange?: () => void;
    isVisible: boolean;
};

const AppTableSelectionActions = ({
    isExportingPdf,
    isExportingExcel,
    onPdfExport,
    onExcelExport,
    isRemovingRange,
    onRemoveRange,
    isVisible
}: AppTableSelectionActionsProps) => {

    const delays = [1000, 2000, 3000];

    return (
        <Box className={`table-actions ${isVisible ? 'slide-in' : 'slide-out'}`}>
            {
                onPdfExport && (
                    <LoadingButton
                        variant='outlined'
                        size="small"
                        loading={isExportingPdf}
                        onClick={onPdfExport}
                        sx={{ borderRadius: 20, transitionDelay: `${delays[0]}ms` }}
                        className="action-button"
                        disabled={!isVisible}

                    >
                        Export Pdf
                    </LoadingButton>
                )
            }
            {
                onExcelExport && (
                    <LoadingButton
                        variant='outlined'
                        size="small"
                        loading={isExportingExcel}
                        onClick={onExcelExport}
                        sx={{ borderRadius: 20, transitionDelay: `${delays[1]}ms` }}
                        className="action-button"
                        disabled={!isVisible}

                    >
                        Export Excel
                    </LoadingButton>
                )
            }

            {
                onRemoveRange && (
                    <LoadingButton
                        variant='outlined'
                        size="small"
                        loading={isRemovingRange}
                        onClick={onRemoveRange}
                        sx={{ borderRadius: 20, transitionDelay: `${delays[2]}ms` }}
                        className="action-button"
                        color="error"
                        disabled={!isVisible}
                    >
                        Remove
                    </LoadingButton>
                )
            }
        </Box>
    );
};

export default AppTableSelectionActions;
