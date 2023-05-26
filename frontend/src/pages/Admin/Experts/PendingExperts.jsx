import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import avatar from '../../../data/avatar.jpg';
import { Header } from '../../../components';




const PendingExperts = () => {
    const data = [
        { id: 1, company: "WeatherTech", name: 'Ketema Girma' },
        { id: 2, company: "AutoAnything ", name: 'Betsi' },
        { id: 3, company: "CARiD", name: 'Gatwech' },
        { id: 4, company: "4 Wheel Parts ", name: 'Dema' },
        { id: 5, company: "Summit Racing", name: 'Ohana' },
        { id: 6, company: "JC Whitney", name: 'Sunny' },
        { id: 7, company: "AutoZone", name: 'aficionado' },
        { id: 8, company: "Pep Boys", name: 'aficionado' },
        { id: 9, company: "Advance Auto Parts", name: 'aficionado' },
        { id: 10, company: "O'Reilly Auto Parts", name: 'aficionado' },
    ]

    const [bankAccount, setBankAccount] = useState('');
    const handleInputChange = (event) => {
        setBankAccount(event.target.value);
    };

    const [aficionado, setAficionado] = useState([]);

    const [showEditModal, setShowEditModal] = useState(null);
    const handleEditClick = (aficionado) => {
        setShowEditModal(true);
        setAficionado(aficionado);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const [showAlert, setShowAlert] = useState(null);

    const handleRejectClick = (aficionado) => {
        setShowAlert(true);
        setAficionado(aficionado);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const [currentPage, setCurrentPage] = useState(1);

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
        setShowEditModal(false);
        console.log(aficionado)
        console.log(bankAccount)
    }


    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">

                <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <Header category="System Users" title="Pending Aficionado Applications" />

                        <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                            <p className="sr-only">Search Aficionados</p>
                            <div className="relative">
                                <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                                    <p>
                                        <FiSearch className="w-5 h-5 text-gray-400" />
                                    </p>
                                </div>
                                <input
                                    placeholder="Search aficionados "
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
                                                Company Name
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Actions
                                            </th>


                                        </tr>
                                    </thead>
                                    {currentAficionados.length > 0 && currentAficionados.map((aficionado) => (
                                        <tbody key={aficionado.id} className="bg-white divide-y divide-gray-300 dark:divide-gray-700 dark:bg-gray-900">
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">

                                                        <span>{aficionado.id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>

                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    <div className="flex items-center gap-x-2">
                                                        <img className="object-cover w-8 h-8 rounded-full" src={avatar} alt="aficionado" />
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{aficionado.name}</h2>

                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                    {aficionado.name}@example.com
                                                </td>
                                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-x-6">
                                                        <button
                                                            onClick={() => handleRejectClick(aficionado)}
                                                            className="text-red-300 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                                                        >
                                                            Reject
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditClick(aficionado)}
                                                            className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                        >
                                                            Approve
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

                                    <Header category="Confirmation" title={`Approve ${aficionado.name} Application`} />

                                    <button
                                        type="button"
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={handleModalClose}
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
                                                value={bankAccount}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={handleClickSave}
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Save
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
                                Confirmation Required: Reject {aficionado.name} Application
                            </h3>
                            <p className="text-white mb-4">
                                Are you sure you want to reject the aficionado's application to use our platform? This action cannot be undone.
                            </p>

                            <div className="flex space-x-5 justify-center items-center">
                                <button
                                    type="button"
                                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                    onClick={handleCloseAlert}
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
        </div>
    )
}

export default PendingExperts