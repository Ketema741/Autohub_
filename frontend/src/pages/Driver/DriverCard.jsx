import React from 'react';
import driver1 from '../../data/avatar.jpg';
import driver2 from '../../data/avatar2.jpg';
import driver3 from '../../data/avatar3.png';

import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'

const DriverCard = ({ name, vehicle, phone, experience, imageUrl, address }) => {
  return (

    <div className="grid gap-28 py-20 md:grid-cols-3 md:gap-12">
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
          <span className="mt-4 block text-sm text-gray-500">Please find below a list of drivers whom you can contact if you are interested in hiring them.
          </span>
          <div className="flex justify-center space-x-4 text-gray-500">

            <div className='flex flex-row items-center flex-wrap space-x-2'>
              <BsTelephone className="w-6 hover:text-primary" />
              <span> +251912323811 </span>

              <a href={`mailto:${'kgirma363@gmail.com'}`}>

                <AiOutlineMail />
              </a>


            </div>
          </div>
          <a href="/driver-detail/abacadaba" className="mx-auto block w-max text-primary">View</a>

        </div>
      </div>

      <div className="group space-y-8 border-t-4 border-gray-100 dark:border-gray-800">
        <div className="mx-auto -mt-16 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
          <img
            className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
            src={driver2}
            alt="driver"
            loading="lazy"
            width="1000"
            height="667"
          />
        </div>
        <div className="space-y-4 text-center">
          <div>
            <h4 className="text-2xl text-gray-700 dark:text-white">Anabelle Doe</h4>
            <span className="block text-sm text-gray-500">Truck drivers </span>
          </div>
          <a href="#" className="mx-auto block w-max text-primary">View</a>
        </div>
      </div>

      <div className="group space-y-8 border-t-4 border-gray-100 dark:border-gray-800">
        <div className="mx-auto -mt-16 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
          <img
            className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
            src={driver3}
            alt="driver"
            loading="lazy"
            width="1000"
            height="667"
          />
        </div>
        <div className="space-y-4 text-center">
          <div>
            <h4 className="text-2xl text-gray-700 dark:text-white">Gatwach T.</h4>
            <span className="block text-sm text-gray-500">Taxi drivers </span>
          </div>
          <a href="#" className="mx-auto block w-max text-primary">View</a>
        </div>
      </div>
    </div>

  );
};

export default DriverCard;
