import React, { useState, useEffect } from 'react';

import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'

import DriverRating from './DriverRating'
import avatar from '../../assets/useravatar.svg'

const DetailCard = ({ driver }) => {

    const { communication,
        drivingSkills,
        knowledgeOfRoutes,
        professionalism } = driver.ratings


    const [communicationAverage, setCommunicationAverage] = useState(0);
    const [drivingSkillsAverage, setDrivingSkillsAverage] = useState(0);
    const [knowledgeOfRoutesAverage, setKnowledgeOfRoutesAverage] = useState(0);
    const [professionalismAverage, setProfessionalismAverage] = useState(0);

    useEffect(() => {
        // Function to calculate the average rating
        const calculateAverage = (ratings) => {
            console.log(ratings)
            if (!ratings || ratings.length === 0) {
                return 0; // Return 0 if the array is empty
            }

            const sum = ratings.reduce((total, rating) => total + rating, 0);
            const average = sum / ratings.length;
            return Math.round(average); // Return rounded average
        };

        // Calculate average ratings for each category
        setCommunicationAverage(calculateAverage(communication));
        setDrivingSkillsAverage(calculateAverage(drivingSkills));
        setKnowledgeOfRoutesAverage(calculateAverage(knowledgeOfRoutes));
        setProfessionalismAverage(calculateAverage(professionalism));
    }, [communication, drivingSkills, knowledgeOfRoutes, professionalism]);


    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    className={
                        i <= rating
                            ? 'text-yellow-500 transition-all duration-300 ease-in-out transform hover:scale-110'
                            : 'text-gray-400 transition-all duration-300 ease-in-out transform hover:scale-110'
                    }
                />
            );
        }

        return stars;
    };

    return (
        <div className="mt-24 flex flex-col justify-center items-center">
            <div className="relative flex flex-col items-center rounded-[20px] w-[80%] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div className="group space-y-8 border-t-4 border-gray-100 dark:border-gray-800">
                    <div className="mx-auto -mt-16 h-64 w-64 rotate-45 overflow-hidden rounded-[2rem]">
                        <img
                            className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
                            src={driver.profileImage ? driver.profileImage : avatar}
                            alt="driver"
                            loading="lazy"
                            width="640"
                            height="805"
                        />
                    </div>
                    <div className="space-y-4 text-center">
                        <div className='flex flex-row justify-center items-center space-x-2 flex-wrap'>
                            <h4 className="text-2xl text-gray-700 dark:text-white">
                                {driver.firstName}
                            </h4>
                            <span className=" text-sm text-gray-500">Motorcycle rider</span>

                        </div>

                        <div className="flex justify-center space-x-4 text-gray-500">

                            <div className='flex flex-row items-center flex-wrap space-x-2'>
                                <BsTelephone className="w-6 hover:text-primary" />
                                <span> {driver.phone} </span>

                                <a href={`mailto:${driver.email}`}>
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
                            {driver.workHistory}
                        </div>
                    </div>
                </div>

                <div className="pb-8 grid grid-cols-2 gap-4 px-8 w-full">
                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Education</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.education}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Languages</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            English, Amharic, Afan Oromo
                        </p>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Vehicle Type</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.vehicleType}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.address}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Experience</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.experience}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Have Commercial Driving License</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.hasCDL}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">Driving License Number</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.licenseNumber}
                        </p>
                    </div>
                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                        <p className="text-sm text-gray-600">License Expiry Date</p>
                        <p className="text-base font-medium text-navy-700 dark:text-white">
                            {driver.licenseExpiryDate}
                        </p>
                    </div>
                </div>

                <div className="mt-2 mb-4 w-full">
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold mb-2">Certifications</h2>
                        <div className="flex flex-col space-y-4">
                            {driver.additionalCertifications}
                        </div>
                    </div>
                    <div className="px-6 py-4">
                        <h2 className="text-xl font-semibold mb-2">References</h2>
                        <div className="flex flex-col space-y-4">
                            {driver.references}
                        </div>
                    </div>
                </div>


                <div className="mt-4 w-full">
                    <div className="px-6 py-4 mb-4">
                        <h3 className="ml-2 text-2xl font-bold text-navy-700 dark:text-white">
                            Driver Rating Status
                        </h3>
                        <div className="pb-8 grid grid-cols-2 gap-4 w-full">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Professionalism
                                </p>
                                <div className="pt-4 flex w-3/4  items-center">
                                    {renderStars(professionalismAverage)}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Driving Skills
                                </p>
                                <div className="pt-4 flex w-3/4  items-center">
                                    {renderStars(drivingSkillsAverage)}
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Knowledge of Routes
                                </p>
                                <div className="pt-4 flex w-3/4  items-center">
                                    {renderStars(knowledgeOfRoutesAverage)}
                                </div>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Communication
                                </p>

                                <div className="pt-4 flex w-3/4  items-center">
                                    {renderStars(communicationAverage)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {driver &&
                    <DriverRating _id={driver._id} />
                }
            </div>
        </div>
    )
}

export default DetailCard