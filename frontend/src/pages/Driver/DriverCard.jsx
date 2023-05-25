import React, { useContext } from 'react';
import driver1 from '../../data/avatar.jpg';
import { useNavigate } from 'react-router-dom';

import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import UserContext from '../../context/user/userContext';

const DriverCard = ({ driver }) => {
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const { getUser } = userContext

  const handleclick = () => {
    getUser(driver._id, "drivers")
    navigate(`/driver-detail/${driver._id}`)
  }
  return (

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
          <h4 className="text-2xl text-gray-700 dark:text-white">{driver.firstName}  {driver.lastName}</h4>
          <span className=" text-sm text-gray-500">Motorcycle rider</span>

        </div>
        <span className="mt-4 block text-sm text-gray-500">Please find below a list of drivers whom you can contact if you are interested in hiring them.
        </span>
        <div className="flex justify-center space-x-4 text-gray-500">

          <div className='flex flex-row items-center flex-wrap space-x-2'>
            <BsTelephone className="w-6 hover:text-primary" />
            <span> {driver.phone} </span>

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
