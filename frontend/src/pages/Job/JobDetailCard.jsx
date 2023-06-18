import React, { useState, useContext } from 'react';

import { SiBookstack } from 'react-icons/si';

import { toast } from 'react-toastify';

import AuthContext from '../../context/auth/authContext';

import Blog from '../../assets/undraw_job_offers_re_634p.svg';
import Application from './Application';
const Parse = require('html-react-parser')


const JobDetailCard = ({ job }) => {
    const authContext = useContext(AuthContext);
    const { user, isUserAuthenticated } = authContext;

    const [isOpen, setIsOpen] = useState(false);


    const handleApply = () => {
        if (!isUserAuthenticated || !user || user?.role != "driver") {
            toast.info("Please login as a driver!");
        } else {

            setIsOpen(!isOpen);
        }
    };

    return (

        <div className="lg:flex" >
            {job ?
                <div>
                    <div className="relative mt-8 md:mt-16 space-y-8 sm:w-full sm:px-4 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
                        <div className=" pt-6 pb-8 mb-4 py-8">
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">
                                {job.title}
                            </h2>
                            
                            {Parse(job.description)}
                        </div>
                    </div>
                    <div className="mt-12 md:mt-0 lg:absolute -right-10 lg:w-7/12">
                        <div className="relative w-full">
                            <div aria-hidden="true" className="absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-sky-500 to-cyan-300 blur-3xl"></div>
                            <img
                                src={Blog}
                                className="relative ml-24 w-full overflow-hidden"
                                alt="wath illustration"
                                loading="lazy"
                                width="320"
                                height="280"
                                style={{ width: "550px", zIndex: 0 }}
                            />


                        </div>
                        <div className="mt-8 relative w-full">
                            <div className="sm:ml-0 sm:mr-4 md:ml-24 bg-white shadow-lg rounded-lg p-8 pb-12 mb-8" style={{ width: "550px", zIndex: 0 }}>
                                <h3 className="text-xl mb-8 font-semibold border-b pb-4">Apply Now</h3>

                                <div className="grid grid-cols-3 space-x-4 md:space-x-6 md:flex md:justify-center lg:justify-start">
                                    <button
                                        onClick={handleApply}
                                        className="p-4 border  dark:bg-gray-800 dark:border-gray-700 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:hover:border-cyan-300/30"
                                    >
                                        <div className="flex justify-center space-x-4">
                                            <SiBookstack
                                                className="w-6 h-6"
                                                style={{ color: "#03C9D7" }}
                                            />
                                            <span className="hidden font-medium md:block dark:text-white">
                                                Apply
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""
            }

            {isOpen &&
                <Application togglePopup={handleApply} />
            }
        </div>

    )
}
export default JobDetailCard;