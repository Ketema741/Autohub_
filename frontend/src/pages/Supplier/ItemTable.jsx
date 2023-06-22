import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { toast } from 'react-toastify';

import { AiOutlinePlus } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

import { useStateContext } from '../../context/ContextProvider';
import { ordersData } from './dummy';
import { Header } from '../../components';
import ItemEdit from './Edit/ItemEdit';
import ItemContext from '../../context/item/itemContext';
import AuthContext from '../../context/auth/authContext';
const Parse = require('html-react-parser')

const ItemTable = () => {
    const itemContext = useContext(ItemContext)
    const authContext = useContext(AuthContext)
    const { user } = authContext;

    const {
        categories,
        updateItem,
        deleteItem,
        supplierItems,
        getPrivateItems,
    } = itemContext;

    const {
        currentColor
    } = useStateContext();


    const [orders, setOrders] = useState(supplierItems);

    useEffect(() => {
        setOrders(supplierItems);
    }, [supplierItems])

    useEffect(() => {
        getPrivateItems(user?._id);
    }, [])

    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 5;
    const totalOrders = orders ? orders.length : 0;
    const totalPages = Math.ceil(totalOrders / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = Math.min(startIndex + PAGE_SIZE, totalOrders);
    const paginatedOrders = orders ? orders.slice(startIndex, endIndex) : [];

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredOrdersData = ordersData.map((order) => {
        const { StatusBg, ProductImage, ...filteredOrder } = order;
        return filteredOrder;
    });


    const handleDelete = (id) => {
        toast.dark(
            <div className="flex flex-col items-center">
                <div className="mr-2">Are you sure you want to delete this item?</div>
                <div className="flex items-center">
                    <button
                        className=" bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => {
                            deleteItem(id)
                            toast.dismiss();
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="marker:bg-gray-300 hover:bg-gray-400 bg-gray-300 text-gray-700 px-3 py-1 rounded ml-2"
                        onClick={() => {
                            toast.dismiss();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                autoClose: false,
                draggable: false,
            }
        );
    };

    const [editModal, setEditModal] = useState(false);

    const [currentItem, setCurrentItem] = useState(null)

    const showEditModal = (item) => {
        setCurrentItem(item)
        setEditModal(!editModal);
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
    const handleShow = (item) => {
        setCurrentItem(item)
        setShowItemModal(true);
    }

    const handleData = (item, id) => {
        if (item) {


            updateItem(item, id, user._id)
        } else {
            toast.error("Somthing Want Wrong Try Again Later!")
        }
    }

    const handleModalClose = () => {
        setShowItemModal(false);
    };

    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="Order Details" title="List Of Item" />
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
                                                Price
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <TooltipComponent content="Add Item" position="TopCenter">
                                                    <Link to="/supplier/add-item" >
                                                        <span className="text-white inline-flex items-center  rounded-full bg-violet-50 p-2 text-xs font-semibold" style={{ backgroundColor: currentColor }}>
                                                            <AiOutlinePlus />
                                                        </span>
                                                    </Link>
                                                </TooltipComponent>
                                            </th>
                                        </tr>
                                    </thead>
                                    {paginatedOrders.length > 0 &&
                                        paginatedOrders.map((item, index) => (

                                            <tbody key={item._id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900" >
                                                <tr>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="flex-none">
                                                            <img
                                                                className="rounded-xl h-20 md:ml-3"
                                                                src={item.itemImages.length > 0 ? item.itemImages[0].url : ""}
                                                                alt="order-item"
                                                            />
                                                        </div>
                                                    </td>


                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{item.name}</span>
                                                        </div>
                                                    </td>



                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800" style={{ color: '#977062', backgroundColor: '#EDE1DD' }}>
                                                            <h2 className="text-sm font-normal">{item.price}</h2>
                                                            ETB
                                                        </div>
                                                    </td>

                                                    <td className="py-2 px-4 border-b">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{item.isAvailable ? "Available" : "Not Available"} </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{item.quantity}</span>
                                                        </div>
                                                    </td>

                                                    <td className="relative px-4 py-4 flex items-center justify-center">

                                                        {showActions[index] && (
                                                            <div
                                                                className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                            >
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                    <li>
                                                                        <button onClick={() => handleShow(item)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Show
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => showEditModal(item)}
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => handleDelete(item._id)}
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Delete
                                                                        </button>
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

                {editModal &&
                    <ItemEdit
                        handleData={handleData}
                        setEditModal={setEditModal}
                        item={currentItem}
                        user={user}
                        categories={categories}
                        updateItem={updateItem}
                    />
                }


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
                                    {currentItem !== null ?
                                        <div className="grid grid-cols-6 gap-x-6 gap-y-1">
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Item Name
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {currentItem.name}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Item Quantity
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {currentItem.quantity}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Item Price
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-3">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {currentItem.price}
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-6">

                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    Description
                                                </p>

                                            </div>
                                            <div className="col-span-6 sm:col-span-6">
                                                <p
                                                    className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                                >
                                                    {Parse(currentItem.description)}
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

export default ItemTable;
