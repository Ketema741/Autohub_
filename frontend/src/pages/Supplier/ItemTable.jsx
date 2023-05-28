// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';

// import { FaTrashAlt, FaEdit } from 'react-icons/fa';
// import { AiOutlinePlus } from 'react-icons/ai';

// import { DeleteWarning } from '../../components';
// import { useStateContext } from '../../context/ContextProvider';

// const ItemTable = ({ supplierItems }) => {
//     const [showWarning, setShowWarning] = useState(false);
//     const {
//         currentColor
//     } = useStateContext();

//     // const handleDelete = () => {
//     //   onDelete();
//     //   setShowWarning(false);
//     // };

//     return (
//         <div>
//             <div className="mt-24  overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
//                 <p className="p-5 font-semibold text-xl text-center">Supplier Items</p>
//                 <div className="mx-2 mb-2 rounded-md table-container overflow-x-auto">
//                     <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
//                         <thead className="h-20 bg-gray-40">
//                             <tr>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Image</th>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Name</th>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Price</th>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rating</th>
//                                 <th scope="col" className="px-6 py-4 font-medium text-gray-900">
//                                     <TooltipComponent content="Add Item" position="TopCenter">
//                                         <Link to="/supplier/add-item" >
//                                             <span className="text-white inline-flex items-center  rounded-full bg-violet-50 p-2 text-xs font-semibold" style={{ backgroundColor: currentColor }}>
//                                                 <AiOutlinePlus />
//                                             </span>
//                                         </Link>
//                                     </TooltipComponent>
//                                 </th>
//                             </tr>
//                         </thead>
//                         {supplierItems.map((item) => (
//                             <tbody className="divide-y divide-gray-100 border-t border-gray-100">
//                                 <tr className="hover:bg-gray-50">
//                                     <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
//                                         <div className="relative h-20 w-20">
//                                             <img
//                                                 className="h-full w-full rounded-md object-cover object-center"
//                                                 src={item.ProductImage}
//                                                 alt={item.ItemName}
//                                             />
//                                         </div>
//                                     </th>
//                                     <td className="px-6 py-4">{item.ItemName}</td>
//                                     <td className="px-6 py-4">
//                                         <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
//                                             <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
//                                             {item.Status}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex gap-2">
//                                             <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
//                                                 {item.Price} ETB
//                                             </span>
//                                             <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
//                                                 20% off
//                                             </span>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex">
//                                             <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
//                                                 5
//                                             </span>
//                                         </div>
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex justify-end gap-4">
//                                             <TooltipComponent content="Delete Item" position="LeftCenter">
//                                                 <button type="button" style={{ color: currentColor }} onClick={() => setShowWarning(true)}>
//                                                     <FaTrashAlt />
//                                                 </button>
//                                             </TooltipComponent>
//                                             <TooltipComponent content="Edit Item" position="TopCenter">
//                                                 <Link to="/supplier/edit-item-detail" style={{ color: currentColor }}>
//                                                     <FaEdit />
//                                                 </Link>
//                                             </TooltipComponent>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             </tbody>))}
//                     </table>
//                     {showWarning && <DeleteWarning setShowWarning={setShowWarning} />}
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default ItemTable


import React, { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';

import { ordersData } from './dummy';
import { Header } from '../../components';
import { AiOutlineClose } from 'react-icons/ai';

const ItemTable = () => {
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



    const [currentItem, setItem] = useState(null)
    const [showAlert, setShowAlert] = useState(false)

    const handleRejectClick = (item) => {
        setShowAlert(true);
        setItem(item);
        console.log(item)
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const [showActions, setShowActions] = useState(Array(filteredOrdersData?.length).fill(false));
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

    const [showItemModal, setShowItemModal] = useState(null);
    const handleShow = (_id) => {
        setShowItemModal(true);
    }


    const handleModalClose = () => {
        setShowItemModal(false);
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
                                        paginatedOrders.map((order, index) => (

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

                                                    <td className="relative px-4 py-4 flex items-center justify-center">

                                                        {showActions[index] && (
                                                            <div
                                                                className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                            >
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                    <li>
                                                                        <button onClick={handleShow} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Show
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => handleRejectClick(order)}
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Freeze
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Delete
                                                                        </a>
                                                                    </li>
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


                {showItemModal &&
                    <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
                        <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                            {/* Modal content */}
                            <div
                                action="#"
                                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                {/* Modal header */}
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

                                    <Header category="Checkout" title="User Detail" />

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
                                    {/* {User !== null ?
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {`${User.firstName}  ${User.lastName}`}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {User.email}
                                                </p>

                                            </div>
                                        </div>
                                        : <div> loading ...</div>
                                    } */}
                                    loading...
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ItemTable;
