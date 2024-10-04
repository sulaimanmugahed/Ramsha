import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


interface ExportData {
    headers: string[];
    rowsData: any[][];
}

export interface PdfOptions {
    orientation?: "p" | "portrait" | "l" | "landscape",
    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
    format?: string | number[],
    compressPdf?: boolean,

}

export interface PdfImage {
    imgData: string,
    options?: PdfImageOption

}

export interface PdfImageOption {
    format?: string,
    x?: number,
    y?: number,
    w?: number,
    h?: number
}


export interface PdfTableStyle {
    theme?: string
    headStyles?: {
        fillColor?: string;
        textColor?: string;
        fontSize?: number;
        fontStyle?: string;
    },
    alternateRowStyles?: {
        fillColor?: string,
    },
    styles?: {
        fontSize?: number;
        cellPadding?: number;
        halign?: string;
        valign?: string;
        textColor?: string,
        fillColor?: string,
    },
    margin: { top?: number; bottom?: number; }
}

export const generateExcel = ({ headers, rowsData }: ExportData, fileName?: string) => {
    const sheetData = [headers, ...rowsData]

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${fileName || 'export'}.xlsx`);
}

export const generatePdf = async (data: ExportData, headerImgData?: PdfImage, filename = "export.pdf", pdfOptions?: PdfOptions, tableStyle?: PdfTableStyle) => {
    const { headers, rowsData } = data;
    const doc = new jsPDF(pdfOptions);
    const docWidth = doc.internal.pageSize.getWidth();
    const docHeight = doc.internal.pageSize.getHeight();

    // Add header image
    headerImgData &&
        doc.addImage(headerImgData.imgData,
            headerImgData.options?.format || 'PNG',
            headerImgData.options?.x || 0,
            headerImgData.options?.y || 0,
            headerImgData.options?.w || docWidth,
            headerImgData.options?.h || docHeight / 5);

    doc.autoTable({
        head: [headers],
        body: rowsData,
        theme: tableStyle?.theme || 'grid',
        headStyles: tableStyle?.headStyles || {
            fillColor: '#f0f0f0',
            textColor: '#000',
            fontSize: 10,
            fontStyle: 'bold',

        },
        alternateRowStyles: tableStyle?.alternateRowStyles,
        styles: tableStyle?.styles || {
            fontSize: 8,
            cellPadding: 4,
            halign: 'center',
            valign: 'middle',
        },
        margin: tableStyle?.margin || { top: 50 },
    });

    doc.save(filename);
}
