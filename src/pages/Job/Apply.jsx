import React, { useState } from "react";

const DriverApplicationForm = ({ isOpen, togglePopup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50">
            <div className="relative bg-white w-1/2 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Apply for Driver Position</h2>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverApplicationForm;