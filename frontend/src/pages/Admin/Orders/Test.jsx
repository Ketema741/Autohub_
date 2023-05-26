import React, { useState } from 'react';

import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

import { FiSearch } from 'react-icons/fi';
import { AiOutlineDownload } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { ordersData } from './dummy';
import { Header } from '../../../components';

const OrderTable = () => {
    const [orders, setOrders] = useState(ordersData);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 5;
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalOrders);
    const paginatedOrders = orders.slice(startIndex, endIndex);

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.OrderID === orderId ? { ...order, Status: newStatus } : order
        );
        setOrders(updatedOrders);
        console.log(newStatus);
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const filteredOrdersData = ordersData.map((order) => {
        const { StatusBg, ProductImage, ...filteredOrder } = order;
        return filteredOrder;
    });
    const handleDownload = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredOrdersData);
        const workbook = XLSX.utils.book_new();

        // Adjust column widths
        const columnWidths = [
            // Example widths for each column (modify as needed)
            { wch: 10 }, // Width for column A
            { wch: 20 }, // Width for column B
            { wch: 10 }, // Width for column C
            { wch: 25 }, // Width for column D
            { wch: 20 }, // Width for column E
            { wch: 10 }, // Width for column F
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
        const fileName = 'item_orders.xlsx';
        FileSaver.saveAs(data, fileName);


    };

    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="Order Details" title="Item Order Table" />
                        <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                            <p className="sr-only">Search Items</p>
                            <div className="relative">
                                <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                                    <p>
                                        <FiSearch className="w-5 h-5 text-gray-400" />
                                    </p>
                                </div>
                                <input
                                    placeholder="Search... "
                                    type="search"
                                    className="block pt-2 pr-0 pb-2 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-mx-14 -my-2 overflow-x-auto sm:-mx-10 lg:-mx-18">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-300 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Image
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Item
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Customer Name
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Total Amount
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Order Id
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Location
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    {paginatedOrders.length > 0 &&
                                        paginatedOrders.map((order) => (

                                            <tbody key={order.OrderID} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900" >
                                                <tr>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="flex-none">
                                                            <img
                                                                className="rounded-xl h-20 md:ml-3"
                                                                src={order.ProductImage}
                                                                alt="order-item"
                                                            />
                                                        </div>
                                                    </td>


                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{order.OrderItems}</span>
                                                        </div>
                                                    </td>


                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {order.CustomerName}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800" style={{ color: '#977062', backgroundColor: '#EDE1DD' }}>
                                                            <h2 className="text-sm font-normal">{order.TotalAmount}</h2>
                                                            ETB
                                                        </div>
                                                    </td>

                                                    <td className="py-2 px-4 border-b">
                                                        <select
                                                            value={order.Status}
                                                            onChange={(e) => handleStatusChange(order.OrderID, e.target.value)}
                                                            className="bg-white border border-gray-300 rounded px-2 py-1"
                                                        >
                                                            <option value="Complete">Complete</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Canceled">Canceled</option>
                                                        </select>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{order.OrderID}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{order.Location}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <button onClick={() => handleRejectClick(order)} className="text-red-300 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <button
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <BsArrowLeft className="w-5 h-5 rtl:-scale-x-100" />

                        <span>
                            previous
                        </span>
                    </button>
                    <div className="items-center hidden md:flex ">
                        <div className="flex items-center">
                            <span className="text-sm text-gray-700 capitalize pr-2">
                                Displaying {startIndex + 1} - {endIndex} out of {totalOrders} orders
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages} className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            Next
                        </span>
                        <BsArrowRight className="w-5 h-5 rtl:-scale-x-100" />
                    </button>
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-8 flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>
                        Download
                    </span>
                    <AiOutlineDownload className="w-5 h-5 rtl:-scale-x-100" />
                </button>
            </div>
        </div>
    );
}

export default OrderTable;
