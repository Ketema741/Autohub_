import React, { useContext } from 'react';
import driver1 from '../../data/avatar.jpg';
import { useNavigate } from 'react-router-dom';

import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'

import avatar from '../../assets/useravatar.svg'
import UserContext from '../../context/user/userContext';
import Profile from './../Profile/Profile';
import Experience from './../Profile/Experience';

const DriverCard = ({ driver }) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const { getUser } = userContext

  const handleclick = () => {
    getUser(driver._id, "driver")
    navigate(`/driver-detail/${driver._id}`)
  }

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

    <div className="mb-8 p-4 group space-y-8 border-t-4 bg-white shadow-md border-gray-100 dark:border-gray-800">
      <div className="mx-auto -mt-16 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
        <img
          className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
          src={driver.profileImage ? driver.profileImage : avatar}
          alt="driver"
          loading="lazy"

        />
      </div>
      <div className="space-y-4 text-center">
        <div className='flex flex-row justify-center items-center space-x-2 flex-wrap'>
          <h4 className="text-2xl text-gray-700 dark:text-white">{driver.firstName}  {driver.lastName}</h4>
          <span className=" text-sm text-gray-500">{driver.vehicleType}</span>

        </div>
        <span className="mt-4 block text-sm text-gray-500">
          Vehicle Type - {driver.vehicleType ? ` ${driver.vehicleType}` : " Not specified"}
        </span>
        <span className="mt-4 block text-sm text-gray-500">
          Years of driving experienc -  {driver.experience ? ` ${driver.experience}` : " Not specified"}
        </span>

        <div className="flex flex-col justify-center space-x-4 space-y-4 text-gray-500">
          {/* <div className='flex flex-row justify-center items-center flex-wrap space-x-4'>
            {renderStars(3)}
          </div> */}
          <div className='flex flex-row justify-center items-center flex-wrap space-x-4'>
            <BsTelephone className="w-6 hover:text-primary" />
            <a href={`tel:${driver.phone}`}>
              {driver.phone}
            </a>

            <a href={`mailto:${driver.email}`}>
              <AiOutlineMail />
            </a>
          </div>
        </div>
        <button onClick={handleclick} className="mx-auto block w-max text-primary">View</button>
      </div>
    </div>

  );
};

export default DriverCard;
