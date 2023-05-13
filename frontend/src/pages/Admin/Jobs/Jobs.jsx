import React, { useState } from 'react';
import { BsArrowLeft, BsArrowRight, BsCreditCard } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi'

import avatar from '../../../data/avatar.jpg';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const data = [
        { id: 1, phone: "10000 91 232 3811", company: "WeatherTech", name: 'Me ' },
        { id: 2, phone: "10000 91 232 3811", company: "AutoAnything ", name: 'betsi' },
        { id: 3, phone: "10000 91 232 3811", company: "CARiD", name: 'Gatwech' },
        { id: 4, phone: "10000 91 232 3811", company: "4 Wheel Parts ", name: 'Dema' },
        { id: 5, phone: "10000 91 232 3811", company: "Summit Racing", name: 'Ohana' },
        { id: 6, phone: "10000 91 232 3811", company: "JC Whitney", name: 'Sunny' },
        { id: 7, phone: "10000 91 232 3811", company: "AutoZone", name: 'Supplier' },
        { id: 8, phone: "10000 91 232 3811", company: "Pep Boys", name: 'Supplier' },
        { id: 9, phone: "10000 91 232 3811", company: "Advance Auto Parts", name: 'Supplier' },
        { id: 10, phone: "10000 91 232 3811", company: "O'Reilly Auto Parts", name: 'Supplier' },
    ]


    const PAGE_SIZE = 2;
    const totalJobs = data.length;
    const totalPages = Math.ceil(totalJobs / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentJobs = data.slice(startIndex, endIndex);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="mb-8">
                <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                            List of Jobs For Drivers
                        </h2>

                    </div>

                    <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                        <p className="sr-only">Search...</p>
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
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}
                                                <button className="flex items-center gap-x-2">
                                                    <span></span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Date
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Bank Account
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

                                        {/* <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Actions</span>
                                            </th> */}
                                    </tr>
                                </thead>
                                {currentJobs.length > 0 && currentJobs.map((supplier) => (
                                    <tbody key={supplier.id} className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    {/* <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" /> */}

                                                    <span>{supplier.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Jan 6, 2022</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800" style={{ color: '#977062', backgroundColor: '#EDE1DD' }}>
                                                    <BsCreditCard />

                                                    <h2 className="text-sm font-normal">{supplier.phone}</h2>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={avatar} alt="supplier" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{supplier.name}</h2>
                                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{supplier.name}@example.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                                {supplier.company}
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <button className="text-red-300 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                                                        Reject
                                                    </button>

                                                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
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
                        <span className="text-gray-500 text-lg pr-2">
                            Showing {startIndex + 1} - {endIndex} of {totalJobs} Jobs
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
    )
}

export default Jobs