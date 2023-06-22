import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import product1 from '../../data/product1.jpg';
import UserContext from "../../context/user/userContext";

import { FaArrowRight } from 'react-icons/fa';

const ServiceProviderCard = ({ serviceProvider }) => {
  const userContext = useContext(UserContext)
  const { getUser } = userContext
  
  useEffect(()=>{
    getUser(serviceProvider._id, "service-provider")

  }, [])
  
  let image = product1
  if (serviceProvider.images) {
    image = serviceProvider.images[0]
  }

  return (

    <div className="group space-y-6 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 text-center shadow-2xl shadow-gray-600/10 dark:shadow-none">
      <img
        className="rounded-sm mx-auto w-72 h-64 transition duration-500 hover:scale-105"
        src={image}
        alt="illustration"
        loading="lazy"
      />
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
        {serviceProvider.vendorName}
      </h3>
      <p>
      {serviceProvider.specializations}
      </p>
      <Link
        to={`/service-provider-detail/${serviceProvider._id}`}
        className="relative mx-auto flex h-10 w-10 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-100 dark:before:border-gray-600 before:transition before:duration-300 group-hover:before:scale-125"
      >
        <FaArrowRight className="text-primary" />
      </Link>
    </div>

  );
};

export default ServiceProviderCard;
