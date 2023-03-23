import React, { useState } from "react";

const DriverApplicationForm = ({ isOpen, togglePopup }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={togglePopup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Apply Now
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="relative bg-white w-1/2 p-6 rounded-lg">
            <button onClick={togglePopup} className="absolute top-0 right-0 mt-4 mr-4">
              <svg className="h-6 w-6 fill-current text-gray-600" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 8.586l4.95-4.95a1 1 0 0 1 1.414 1.414L11.414 10l4.95 4.95a1 1 0 0 1-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 1 1-1.414-1.414L8.586 10 3.636 5.05a1 1 0 0 1 1.414-1.414L10 8.586z"/>
              </svg>
            </button>

            <h2 className="text-2xl font-bold mb-4">Apply for Driver Position</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="full-name">
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="full-name"
                  type="text"
                  placeholder="Full Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone-number">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone-number"
                  type="tel"
                  placeholder="Phone Number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="resume-link">
                  Resume Link
                </label>
                <input             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resume-link"
              type="text"
              placeholder="Resume Link"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="years-of-experience">
              Years of Experience
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="years-of-experience"
              type="number"
              placeholder="Years of Experience"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="availability">
              Availability
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="availability"
            >
              <option value="">Select Availability</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )}
</div>
);
};

export default DriverApplicationForm;