import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight, BsCreditCard } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import avatar from '../../../data/avatar.jpg';
import { Header } from '../../../components';


const ActiveExperts = () => {
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

    const data = [
        { id: 1, phone: "10000 91 232 3811", company: "WeatherTech", name: 'Me ' },
        { id: 2, phone: "10000 91 232 3811", company: "AutoAnything ", name: 'betsi' },
        { id: 3, phone: "10000 91 232 3811", company: "CARiD", name: 'Gatwech' },
        { id: 4, phone: "10000 91 232 3811", company: "4 Wheel Parts ", name: 'Dema' },
        { id: 5, phone: "10000 91 232 3811", company: "Summit Racing", name: 'Ohana' },
        { id: 6, phone: "10000 91 232 3811", company: "JC Whitney", name: 'Sunny' },
        { id: 7, phone: "10000 91 232 3811", company: "AutoZone", name: 'aficionado' },
        { id: 8, phone: "10000 91 232 3811", company: "Pep Boys", name: 'aficionado' },
        { id: 9, phone: "10000 91 232 3811", company: "Advance Auto Parts", name: 'aficionado' },
        { id: 10, phone: "10000 91 232 3811", company: "O'Reilly Auto Parts", name: 'aficionado' },
    ]


    const PAGE_SIZE = 2;
    const totalAficionado = data.length;
    const totalPages = Math.ceil(totalAficionado / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentAficionados = data.slice(startIndex, endIndex);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleClickSave = (e) => {
        e.preventDefault();
        handleCloseAlert(false);
        console.log(aficionado)
    }

    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="System Users" title="Vehicle Aficionados with Approved Status" />
                        <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                            <p className="sr-only">Search Vehicle Aficionados</p>
                            <div className="relative">
                                <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                                    <p>
                                        <FiSearch className="w-5 h-5 text-gray-400" />
                                    </p>
                                </div>
                                <input
                                    placeholder="Search.. "
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
                                                Aficionado
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    {currentAficionados.length > 0 && currentAficionados.map((user) => (
                                        <tbody key={user.id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <span>{user.id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-8 h-8 rounded-full" src={avatar} alt="user" />
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{user.name}</h2>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    {user.name}@example.com
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button onClick={() => handleRejectClick(user)} className="text-red-300 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                            Freeze
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

export default ActiveExperts