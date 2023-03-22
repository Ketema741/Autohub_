import React from "react";
import product1 from "../../data/product9.jpg";

const DriverCard = ({name, vehicle, phone, experience,imageUrl, address}) => {
  return (
    
    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden"></div>
        <div className="flex items-center border border-gray-300 shadow-md rounded-lg p-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={product1}
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium">{name}</h2>
            <p className="text-gray-600">{vehicle}</p>
            <p className="text-gray-600">{experience} years of experience</p>
            <p className="text-gray-600">{phone}</p>
            <p className="text-gray-600">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;
