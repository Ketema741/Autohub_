import React, { useState, useContext, useEffect, useRef } from 'react';
import moment from 'moment';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { FiMoreVertical } from 'react-icons/fi';

import avatar from '../../../data/avatar.jpg';
import { Header } from '../../../components';
import Modal from '../UserModal'

import UserContext from '../../../context/user/userContext';

const Drivers = () => {

    const userContext = useContext(UserContext);
    const { getUser, getUsers, drivers, driver, filteredDrivers, filterUsers, clearFilter } = userContext;

    useEffect(() => {
        getUsers("drivers")
    }, [])

    const [currentPage, setCurrentPage] = useState(1);

    const [aficionado, setAficionado] = useState([]);
    const [showAlert, setShowAlert] = useState(null);

    const handleRejectClick = (aficionado) => {
        setShowAlert(true);
        setAficionado(aficionado);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const PAGE_SIZE = 2;
    let totalAficionado = 0
    if (drivers) {
        totalAficionado = drivers.length;
    }
    const totalPages = Math.ceil(totalAficionado / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    let currentDrivers = []
    if (drivers) {
        currentDrivers = drivers.slice(startIndex, endIndex);
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClickSave = (e) => {
        e.preventDefault();
        handleCloseAlert(false);
    }

    const text = useRef('')

    useEffect(() => {
        if (filteredDrivers == null) {
            text.current.value = ''
        }
    }, [filteredDrivers])

    const [showActions, setShowActions] = useState(Array(currentDrivers?.length).fill(false));
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

    const onChange = (e) => {
        if (e.target.value !== '') {
            filterUsers(e.target.value, "drivers");
        } else {
            clearFilter();
        }
    };

    const handleShow = (_id) => {
        getUser(_id, "driver")
        setShowUserModal(true);
    }

    const [showUserModal, setShowUserModal] = useState(null);



    const handleModalClose = () => {
        setShowUserModal(false);
    };


    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="System Users" title="Vehicle Aficionados with Approved Status" />
                        <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                            <p className="sr-only">Search Aficionados</p>
                            <div className="relative">
                                <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                                    <p>
                                        <FiSearch className="w-5 h-5 text-gray-400" />
                                    </p>
                                </div>
                                <input
                                    placeholder="Search.. "
                                    type="text"
                                    ref={text}
                                    onChange={onChange}
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
                                                Registered Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Aficionado Name
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    {filteredDrivers !== null ?
                                        filteredDrivers.map((user, index) => (
                                            <tbody key={user._id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="flex items-center gap-x-2">
                                                            <img className="object-cover w-8 h-8 rounded-full" src={avatar} alt="user" />
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user.firstName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {user.email}
                                                    </td>
                                                    <td className="relative px-4 py-4 flex items-center justify-center">

                                                        {showActions[index] && (
                                                            <div
                                                                className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                            >
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                    <li>
                                                                        <button onClick={() => handleShow(user._id)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Show
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => handleRejectClick(user)}
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
                                        :
                                        currentDrivers.map((user, index) => (
                                            <tbody key={user._id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <span>{index + 1}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        <div className="flex items-center gap-x-2">
                                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user.firstName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                        {user.email}
                                                    </td>
                                                    <td className="relative px-4 py-4 flex items-center justify-end">

                                                        {showActions[index] && (
                                                            <div
                                                                className="absolute -top-14 right-20 z-100 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                            >
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="benq-ex2710q-dropdown-button">
                                                                    <li>
                                                                        <button onClick={() => handleShow(user._id)} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            Show
                                                                        </button>
                                                                    </li>
                                                                    {/* <li>
                                                                        <button
                                                                            onClick={() => handleRejectClick(user)}
                                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                        >
                                                                            Freeze
                                                                        </button>
                                                                    </li> */}
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
                                Displaying {startIndex + 1} - {endIndex} out of {totalAficionado} aficionados
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
            </div>

            {showUserModal && (
                <Modal User={driver} handleModalClose={handleModalClose} />
            )}
            {showAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-red-400 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">
                            Confirmation Required: Suspend {aficionado.name}'s Account
                        </h3>
                        <p className="text-white mb-4">
                            Are you certain you wish to suspend the aficionado's account on our website?
                        </p>

                        <div className="flex space-x-5 justify-center items-center">
                            <button
                                onClick={handleClickSave}
                                type="button"
                                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"

                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                onClick={handleCloseAlert}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default Drivers