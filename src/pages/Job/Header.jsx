import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

import bg from '../../assets/blogbg1.png';

import { FaSearch } from 'react-icons/fa';



const Header = () => {
    const [showJobs, setShowJobs] = useState(false);
    const [jobName, setJobName] = useState('Track');

    const handleJobNameChange = (e) => {
        setJobName(e.target.value);
    };

    const handleShowJobs = () => {
        setShowJobs(!showJobs);
    };

    return (
        <div>
            <div className="relative">
                <img
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    src={bg}
                    width="400"
                    height="500"
                    alt="hero background image"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full bg-blue-900 bg-opacity-30 backdrop-blur-sm"
                ></div>
                <div className="relative container m-auto px-6 md:px-12 lg:px-6">
                    <div className="mb-12 pt-12 space-y-8 md:mb-20 md:pt-24 lg:w-8/12 lg:mx-auto">
                        <h1 className="text-white text-center text-2xl font-bold sm:text-3xl md:text-4xl">
                            Rev up your career as a driver with our job listings! Whether you're a seasoned pro or just starting out, we have the perfect opportunity for you.
                        </h1>

                        <form action="" className="w-full">
                            <div className="relative flex p-1 rounded-xl bg-white shadow-2xl md:p-2">
                                <div
                                    id="catJobBox"
                                    className="hidden text-gray-600 relative md:flex justify-between items-center min-w-max select-none"
                                >
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="toggleJobLstCat"
                                        className="peer hidden outline-none"
                                    />
                                    <input
                                        type="text"
                                        name=""
                                        id="catJobName"
                                        value={jobName}
                                        onChange={handleJobNameChange}
                                        className="pl-3 w-full bg-white text-base font-medium cursor-pointer"
                                        readOnly
                                    />
                                    <label
                                        htmlFor="toggleJobLstCat"
                                        className="absolute top-0 left-0 w-full h-full"
                                    ></label>
                                    <span className="min-w-max" onClick={handleShowJobs}>
                                        <HiChevronDown />
                                    </span>
                                    <div
                                        id="catJobLst"
                                        className={`absolute transition-all duration-500 ease-in-out ${showJobs
                                            ? 'opacity-100 visible translate-y-1'
                                            : 'opacity-0 invisible translate-y-10'
                                            } top-full left-0 w-full bg-white bg-opacity-80 rounded-lg py-2`}
                                    >
                                        <ul className="flex flex-col w-full">
                                            <li className="cursor-default transition hover:bg-gray-100 hover:bg-opacity-80 flex px-5 py-2">
                                                Truck
                                            </li>
                                            <li className="cursor-default transition hover:bg-gray-100 hover:bg-opacity-80 flex px-5 py-2">
                                                Motorcyle
                                            </li>
                                            <li className="cursor-default transition hover:bg-gray-100 hover:bg-opacity-80 flex px-5 py-2">
                                                Taxi
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <input
                                    placeholder="Search Your favorite Jobs"
                                    className="w-full p-4 outline-none text-gray-600"
                                    type="text"
                                />
                                <button
                                    type="button"
                                    title="Start application"
                                    className="ml-auto py-3 px-6 rounded-lg text-center transition bg-blue-500 hover:to-purple-600 active:from-pink-700 focus:from-pink-600 md:px-12"
                                >
                                    <span className="hidden text-white font-semibold md:block">
                                        Search
                                    </span>
                                    <FaSearch className="w-5 mx-auto text-white md:hidden" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Header;