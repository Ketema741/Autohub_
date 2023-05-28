import React from 'react';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

import { AiOutlineDownload } from 'react-icons/ai'

const DownloadButton = ({ filteredData, fileName }) => {
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();

        // Adjust column widths
        const columnWidths = [
            // Example widths for each column (modify as needed)
            { wch: 10 }, // Width for column A
            { wch: 20 }, // Width for column B
            { wch: 10 }, // Width for column C
            { wch: 25 }, // Width for column D
            { wch: 20 }, // Width for column E
        ];

        // Apply column widths to the worksheet
        worksheet['!cols'] = columnWidths;

        // Set the height for the first row (header row)
        const headerRowHeight = 40; // Adjust the value as needed
        worksheet['!rows'] = [{ hpt: headerRowHeight, hidden: false }];

        // Get the range of the header row
        const headerRange = XLSX.utils.decode_range(worksheet['!ref'], { sheetRows: 1 });

        // Apply font style to each header cell individually
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col }); // Using the start row of the range as the header row
            const headerCellStyle = worksheet[headerCell].s || {};
            const font = headerCellStyle.font || {};

            // Set the desired font attributes
            font.bold = true;
            font.sz = 14; // Adjust the font size as needed

            // Apply the font to the cell style
            headerCellStyle.font = font;
            worksheet[headerCell].s = headerCellStyle;
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const filename = `${fileName}_list.xlsx`;
        FileSaver.saveAs(data, filename);
    };

    return (
        <button
            onClick={handleDownload}
            className="mt-8 flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
                Download
            </span>
            <AiOutlineDownload className="w-5 h-5 rtl:-scale-x-100" />
        </button>
    );
};

export default DownloadButton;
