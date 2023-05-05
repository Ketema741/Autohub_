import React from 'react';
import driver1 from '../../data/avatar.jpg';
import driver2 from '../../data/avatar2.jpg';
import driver3 from '../../data/avatar3.png';

import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import Experience from './../Profile/Experience';


const DetailCard = () => {
    return (
        <div className="mt-24 flex flex-col justify-center items-center">
            <div className="relative flex flex-col items-center rounded-[20px] w-[80%] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

                <div className="group space-y-8 border-t-4 border-gray-100 dark:border-gray-800">
                    <div className="mx-auto -mt-16 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
                        <img
                            className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
                            src={driver1}
                            alt="driver"
                            loading="lazy"
                            width="640"
                            height="805"
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <div className='flex flex-row justify-center items-center space-x-2 flex-wrap'>
                            <h4 className="text-2xl text-gray-700 dark:text-white">Ketema G.</h4>
                            <span className=" text-sm text-gray-500">Motorcycle rider</span>

                        </div>

                        <div className="flex justify-center space-x-4 text-gray-500">

                            <div className='flex flex-row items-center flex-wrap space-x-2'>
                                <BsTelephone className="w-6 hover:text-primary" />
                                <span> +251912323811 </span>

                                <a href={`mailto:${'kgirma363@gmail.com'}`}>

                                    <AiOutlineMail />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-8 mb-8 w-full">
                    
                    <div className="px-6 py-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">Professional Experience</h2>
                        <div className="flex flex-col space-y-4">
                            <div className="">
                                <p className="text-gray-700 font-bold mb-2">
                                    Driver, ABC Trucking Company, Anytown, USA
                                </p>
                            </div>
                            <div className="">
                                <ul className="list-disc pl-4">
                                    <li className="mb-1">Transported goods over long distances, delivering cargo safely and efficiently to various locations throughout the country.</li>
                                    <li className="mb-1">Conducted routine vehicle maintenance checks and performed minor repairs as needed to ensure the safe operation of the truck.</li>
                                    <li className="mb-1">Maintained accurate records of deliveries, including invoices, bills of lading, and other relevant documentation.</li>
                                    <li className="mb-1">Communicated effectively with dispatchers, clients, and other drivers to coordinate delivery schedules and ensure timely delivery of goods.</li>
                                    <li>Maintained a clean driving record with no accidents or violations.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-8 grid grid-cols-2 gap-4 px-8 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Education</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            Completed grade 12
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Languages</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            English, Amharic, Afan Oromo
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            Truck Dvier
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Work History</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            Addis Ababa, Ethipia
                        </p>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                           3 years of driving experience
                        </p>
                    </div>

                    

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Birthday</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            20 July 1986
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCard