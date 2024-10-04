import { useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { captureComponentAsImage } from '../utils/captureUtils';
import { generateExcel, generatePdf, PdfImage, PdfImageOption, PdfOptions, PdfTableStyle } from '../utils/exportHelpers';

export type ExportData = {
    headers: string[];
    rowsData: any[][];
}

type UseExport = {
    getExportableData: () => ExportData;
    fileName?: string
}

type UseExportExcelProps = UseExport & {

}




export const useExportExcel = () => {
    const [isLoading, setIsLoading] = useState(false)

    const exportExcel = useCallback((data: ExportData, fileName?: string) => {
        setIsLoading(true)
        generateExcel(data, fileName)
        setIsLoading(false)

    }, [])

    return {
        exportExcel,
        isExportingExcel: isLoading
    }

}

type UseExportPDFProps = {
    pdfOptions?: PdfOptions,
    tableStyle?: PdfTableStyle
}

export const useExportPDF = ({ pdfOptions, tableStyle }: UseExportPDFProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const theme = useTheme();

    const exportPdf = useCallback(async (data: ExportData, fileName?: string, header?: {
        node: React.ReactNode,
        options?: PdfImageOption
    },) => {
        setIsLoading(true)
        try {
            let headerImgData: PdfImage | undefined = undefined
            if (header) {
                const img = await captureComponentAsImage(header.node);
                headerImgData = {
                    imgData: img,
                    options: header.options
                }
            }

            generatePdf(data, headerImgData, fileName, pdfOptions,
                {
                    headStyles: {
                        fillColor: theme.palette.primary.main,
                        textColor: theme.palette.text.primary,
                        fontSize: 10,
                        fontStyle: 'bold'
                    },
                    alternateRowStyles: {
                        fillColor: theme.palette.background.paper
                    },
                    styles: {
                        fontSize: 8,
                        cellPadding: 4,
                        halign: 'center',
                        valign: 'middle',
                        fillColor: theme.palette.background.default,
                        textColor: theme.palette.text.primary
                    },
                    margin: { top: headerImgData?.options?.h },
                    ...tableStyle

                })
            setIsLoading(false)
        }

        catch (error) {
            console.error('Error exporting the pdf ', error);
            setIsLoading(false)
            setIsError(true)
        }
    }, [pdfOptions, tableStyle, theme]);

    return {
        exportPdf,
        isExportingPdf: isLoading,
        exportPdfError: isError
    };
};
