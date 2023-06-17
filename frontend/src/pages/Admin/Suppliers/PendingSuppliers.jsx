import React, { useEffect, useState, useContext } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';
import avatar from '../../../data/avatar.jpg';
import { Header } from '../../../components';
import Modal from '../Modal'
import UserContext from '../../../context/user/userContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Suppliers = () => {

    const userContext = useContext(UserContext)

    const {
        getPendingUsers,
        pendingSuppliers,
        approveSupplier,
        rejectSupplier,
    } = userContext

    useEffect(() => {
        getPendingUsers("suppliers")
    }, [])

    const [accountId, setAcountId] = useState('');
    const handleInputChange = (event) => {
        setAcountId(event.target.value);
    };

    const [supplier, setSupplier] = useState([]);

    const [showEditModal, setShowEditModal] = useState(null);

    const handleApproveClick = (supplier) => {
        setShowEditModal(true);
        setSupplier(supplier);
    };

    const handleApprove = (e) => {
        e.preventDefault();
        approveSupplier({ "accountId": accountId }, { accountId: accountId, ...supplier });
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    // hanlde rejection start herer
    const [showAlert, setShowAlert] = useState(null);

    const handleRejectClick = (supplier) => {
        setShowAlert(true);
        setSupplier(supplier);
    };

    const handleCloseRejectConfirm = () => {
        setShowAlert(false);
    };

    const handleRejectConfirm = () => {
        rejectSupplier(supplier._id);
    };
    // handle rejection end here


    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 3;
    const totalSuppliers = pendingSuppliers ? pendingSuppliers.length : 0;
    const totalPages = Math.ceil(totalSuppliers / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentSuppliers = pendingSuppliers ? pendingSuppliers.slice(startIndex, endIndex) : [];

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };




    const [showActions, setShowActions] = useState(Array(currentSuppliers?.length).fill(false));
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

    const [showUserModal, setShowUserModal] = useState(null);

    const handleShow = (supplier) => {

        // getUser(_id, "supplier")
        setSupplier(supplier)
        setShowUserModal(true);
    }

    const handleModalClose = () => {
        setShowUserModal(false);
    };


    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">

                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="System Users" title="Pending Supplier Applications" />

                        <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                            <p className="sr-only">Search Supplier</p>
                            <div className="relative">
                                <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                                    <p>
                                        <FiSearch className="w-5 h-5 text-gray-400" />
                                    </p>
                                </div>
                                <input
                                    placeholder="Search Suppliers "
                                    type="search"
                                    className="block pt-2 pr-0 pb-2 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-300 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <button className="flex items-center gap-x-2">
                                                        <span></span>
                                                    </button>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Date
                                            </th>



                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Supplier
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Company Name
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>


                                        </tr>
                                    </thead>
                                    {currentSuppliers.length > 0 && currentSuppliers.map((supplier, index) => (
                                        <tbody key={supplier._id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}

                                                        <span>{index + 1}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-8 h-8 rounded-full" src={avatar} alt="supplier" />
                                                        <div>
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{supplier.firtName}</h2>
                                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{supplier.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    {supplier.companyName}
                                                </td>

                                                <td className="relative px-4 py-4 flex items-center justify-end">

                                                    {showActions[index] && (
                                                        <div
                                                            className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                        >
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                <li>
                                                                    <button onClick={() => handleShow(supplier)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                        Show
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        onClick={() => handleApproveClick(supplier)}
                                                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        onClick={() => handleRejectClick(supplier)}
                                                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                    >
                                                                        Reject
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
                                Displaying {startIndex + 1} - {endIndex} out of {totalSuppliers} suppliers
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
                {showUserModal && (
                    <Modal User={supplier} handleModalClose={handleModalClose} />
                )}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">

                        <div className="relative w-full max-w-2xl max-h-full">
                            {/* Modal content */}
                            <form
                                action="#"
                                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                            >
                                {/* Modal header */}
                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

                                    <Header category="Confirmation" title={`Approve ${supplier.firstName} ${supplier.lastName} Application`} />

                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleEditModalClose}
                                        data-modal-hide="editUserModal"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                {/* Modal body */}
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="bank-accoun"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Bank Account
                                            </label>
                                            <input
                                                type="text"
                                                name="bank-account"
                                                id="bank-accoun"
                                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="account"
                                                value={accountId}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handleApprove}
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Approve
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAlert && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-red-400 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Confirmation Required: Reject {supplier.name} Application
                            </h3>
                            <p className="text-white mb-4">
                                Are you sure you want to reject the supplier's application to use our platform? This action cannot be undone.
                            </p>

                            <div className="flex space-x-5 justify-center items-center">
                                <button
                                    type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={handleRejectConfirm}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={handleCloseRejectConfirm}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>

                )}

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Suppliers