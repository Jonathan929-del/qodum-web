'use client';
import ExcelJS from 'exceljs';
import { ChevronDown, Download } from 'lucide-react';
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select';


// Interfaces
interface PrintColumn<T> {
  title: string;
  width?: number;
  value: (row: T) => string | number;
}
interface PrintButtonProps<T> {
  data: T[];
  columns: PrintColumn<T>[];
  title: string;
  filename: string;
  sheetName: string;
}


// Print button
export default function PrintButton<T>({ data, columns, title, filename, sheetName }: PrintButtonProps<T>) {
  
    const downloadBlob = (buffer: BlobPart, mime: string, extension: string) => {
        const blob = new Blob([buffer], { type: mime });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.${extension}`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const downloadXlsx = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(sheetName);

        sheet.columns = columns.map((c) => ({ width: c.width ? c.width / 7 : 15 }));

        // Title row — colored, spans every column
        sheet.mergeCells(1, 1, 1, columns.length);
        const titleCell = sheet.getCell(1, 1);
        titleCell.value = title;
        titleCell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
        titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF16365C' } };

        // Header row
        const headerRow = sheet.getRow(2);
        columns.forEach((c, i) => {
        const cell = headerRow.getCell(i + 1);
        cell.value = c.title;
        cell.font = { bold: true };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC9CACC' } };
        });

        data.forEach((row) => sheet.addRow(columns.map((c) => c.value(row))));

        const buffer = await workbook.xlsx.writeBuffer();
        downloadBlob(buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx');
    };

    const downloadCsv = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(sheetName);
        sheet.addRow(columns.map((c) => c.title));
        data.forEach((row) => sheet.addRow(columns.map((c) => c.value(row))));
        const buffer = await workbook.csv.writeBuffer();
        downloadBlob(buffer, 'text/csv', 'csv');
    };

    return (
        <Select>
            <SelectTrigger className='flex items-center px-[8px] h-8 text-xs text-black bg-gradient-to-r from-[#FFC73A] to-[#FFF3AB] rounded-full transition border-[1px] border-white cursor-pointer hover:border-[#FFC73A] hover:from-[#ffc73a1f] hover:to-[#ffc73a1f] hover:text-[#FFC73A] sm:text-[16px] sm:px-4'>
                <span>Print</span>
                <ChevronDown className='h-4 w-4 ml-2 opacity-50' />
            </SelectTrigger>
            <SelectContent>
                <span
                    onClick={downloadXlsx}
                    className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition'
                >
                    .xlsx<Download size={16} className='text-hash-color ml-2' />
                </span>

                <span
                    onClick={downloadCsv}
                    className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition'
                >
                    .csv<Download size={16} className='text-hash-color ml-2' />
                </span>

                <span className='pl-2 flex w-full cursor-pointer items-center rounded-[5px] py-1.5 pr-2 text-xs outline-none hover:bg-[#ccc] transition'>
                    .pdf<Download size={16} className='text-hash-color ml-2' />
                </span>
            </SelectContent>
        </Select>
    );
}