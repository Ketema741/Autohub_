import React, { useState, useEffect } from 'react';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiMoreVertical,FiSearch } from 'react-icons/fi';
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';

import { Header } from '../../../components';

import DownloadButton from '../Download'

const OrderTable = ({ customerOrders, verifyPayment, isPaymentVerified }) => {
    const [orders, setOrders] = useState(customerOrders);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 10;
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalOrders);
    const paginatedOrders = orders.slice(startIndex, endIndex);

    const handleStatusChange = (orderId) => {
        console.log(orderId);
        verifyPayment(orderId)

    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [showActions, setShowActions] = useState(Array(orders?.length).fill(false));
    const [openIndex, setOpenIndex] = useState(null); // Track the index of the currently open toggle

    const toggleActions = (index) => {
        const updatedShowActions = [...showActions];
        updatedShowActions[index] = !updatedShowActions[index];

        // Close the previously opened toggle
        if (openIndex !== null && openIndex !== index) {
            updatedShowActions[openIndex] = false;
        }

        setShowActions(updatedShowActions);
        setOpenIndex(index); // Update the openIndex to the clicked index
    };

    const [selectedOrder, setSelectedOrder] = useState([]);

    const handleShow = (order) => {
        setSelectedOrder(order)
        setShowItemModal(true);
    }


    useEffect(() => {
        if (isPaymentVerified) {
            setShowPaymentModal(true)
        }

    }, [isPaymentVerified])

    const [showPaymentModal, setShowPaymentModal] = useState(null);
    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const [showItemModal, setShowItemModal] = useState(null);
    const handleModalClose = () => {
        setShowItemModal(false);
    };




    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden overflow-y-auto">
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
                                                Order Id
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
                                                Payment Id
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
                                        paginatedOrders.map((order, index) => (

                                            <tbody key={order._id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900" >
                                                <tr>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="flex-none">

                                                            {order.orderNumber}
                                                        </div>
                                                    </td>


                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        {order.items.length > 0 &&
                                                            order.items.map((item) => (
                                                                <div className="inline-flex items-center gap-x-3">
                                                                    <span>{item.itemId.name}</span>
                                                                </div>
                                                            ))
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {`${order.owner.firstName} ${order.owner.lastName}`}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800" style={{ color: '#977062', backgroundColor: '#EDE1DD' }}>
                                                            <h2 className="text-sm font-normal">{order.totalAmount}</h2>
                                                            ETB
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {order.isPaid ? "Paid" : "Not Paid"}
                                                    </td>

                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{order.paymentId}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{order.owner.address}</span>
                                                        </div>
                                                    </td>

                                                    <td className="relative px-4 py-4 flex items-center justify-center">

                                                        {showActions[index] && (
                                                            <div
                                                                className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                            >
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                    <li>
                                                                        <button onClick={() => handleShow(order)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Show
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => handleStatusChange(order._id)}
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Verify
                                                                        </button>
                                                                    </li>
                                                                    {/* <li>
                                                                        <a href="#"
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Delete
                                                                        </a>
                                                                    </li> */}
                                                                </ul>

                                                            </div>
                                                        )}
                                                        <button
                                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                            type="button"
                                                            onClick={() => toggleActions(index)}
                                                        >
                                                            <FiMoreVertical className="w-5 h-5" />
                                                        </button>
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

                <DownloadButton filteredData={orders} fileName="user_order" />

                {showItemModal &&
                    <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
                        <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                            {/* Modal content */}
                            <div
                                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                {/* Modal header */}
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

                                    <Header category="Order" title="Order Detail" />

                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleModalClose}
                                        data-modal-hide="editUserModal"
                                    >
                                        <AiOutlineClose className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal body */}
                                <div className="p-6 space-y-6">
                                    {selectedOrder ?
                                        <div>
                                            <div className="flex items-center space-x-2 font-bold text-gray-900 leading-8">
                                                <span >
                                                    <AiOutlineUser className="text-blue-800 h-5" />
                                                </span>
                                                <span className="tracking-wide">Customer Order Detail</span>
                                            </div>
                                            <div className="text-gray-700">
                                                <div className="grid md:grid-cols-2 text-sm">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold"> First Name</div>
                                                        {selectedOrder.owner.firstName}
                                                        <div className="px-4 py-2"> </div>
                                                    </div>
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                                        <div className="px-4 py-2">{selectedOrder.owner.lastName}</div>
                                                    </div>

                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Email</div>
                                                        <div className="px-4 py-2">{selectedOrder.owner.address}</div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 font-bold text-gray-900 leading-8">
                                                <span >
                                                    <FaShoppingCart className="text-blue-800 h-5" />
                                                </span>
                                                <span className="tracking-wide">Order Detail</span>
                                            </div>
                                            <div className="text-gray-700">
                                                <div className="grid grid-cols-4">
                                                    <div className="px-4 py-2 font-semibold">Total Amount</div>
                                                    <div className="px-4 py-2">{selectedOrder.totalAmount}</div>
                                                </div>
                                                <div className="grid md:grid-cols-2 text-sm">

                                                    {selectedOrder.items.length > 0 &&
                                                        selectedOrder.items.map((item) => (
                                                            <div className="grid grid-cols-2">
                                                                <div className="px-4 py-2 font-semibold"> Item Name</div>
                                                                <div className="px-4 py-2">{item.itemId.name}</div>

                                                                <div className="px-4 py-2 font-semibold">Quantity</div>
                                                                <div className="px-4 py-2">{item.quantity}</div>

                                                                <div className="px-4 py-2 font-semibold">Single Item Price</div>
                                                                <div className="px-4 py-2">{item.itemId.price}</div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : <div> loading ...</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {showPaymentModal &&
                    <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
                        <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                            {/* Modal content */}
                            <div
                                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                {/* Modal header */}
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

                                    <Header category="Payment" title="Payment Detail" />

                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleClosePaymentModal}
                                        data-modal-hide="editUserModal"
                                    >
                                        <AiOutlineClose className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Modal body */}
                                <div className="p-6 space-y-6">
                                    {isPaymentVerified ?
                                        <div className="grid grid-cols-6 gap-x-6 gap-y-1">
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {`${isPaymentVerified.paymentMetada.data?.first_name}  ${isPaymentVerified.paymentMetada.data?.last_name}`}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {isPaymentVerified.paymentMetada.data?.email}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Total Amount
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {isPaymentVerified.paymentMetada.data?.amount}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="mb-4 mt-2 text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Currency
                                                </p>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="mb-4 mt-2 text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {isPaymentVerified.paymentMetada.data?.currency}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="mb-4 mt-2 text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Status
                                                </p>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="mb-4 mt-2 text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {isPaymentVerified.order.isPaid ? "Paid" : "Not Paid"}
                                                </p>

                                            </div>
                                        </div>
                                        : <div> loading ...</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default OrderTable;
