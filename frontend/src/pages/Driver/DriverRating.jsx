import React, { useState, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import UserContext from '../../context/user/userContext';

import AuthContext from './../../context/auth/authContext';
import { toast } from 'react-toastify';

const DriverRating = ({ _id }) => {

  const userContext = useContext(UserContext);
  const { rateDriver } = userContext;
  const authContext = useContext(AuthContext);

  const { user, isUserAuthenticated } = authContext;

  const [ratings, setRatings] = useState({
    punctuality: 0,
    professionalism: 0,
    drivingSkills: 0,
    knowledgeOfRoutes: 0,
    communication: 0,
  });

  const handleClick = (field, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [field]: newRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !isUserAuthenticated ){
      toast.warning("In order to rate this driver, you must first log in.");
      return;
    }
    rateDriver(ratings, _id)


  };

  const renderStars = (field) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={
            i <= ratings[field]
              ? 'text-yellow-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110'
              : 'text-gray-400 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110'
          }
          onClick={() => handleClick(field, i)}
        />
      );
    }

    return stars;
  };

  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-xl font-medium mb-2">Rate The Driver Based On The Criteria Written Below</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          {/* Professionalism */}
          <div className="flex flex-col w-9/10 space-y-2">
            <p className="font-medium">Professionalism</p>
            <p className="text-gray-500">
              The driver's level of professionalism in terms of appearance, behavior, and communication.
            </p>
          </div>
          <div className="pb-8 flex w-9/10 justify-center items-center">
            {renderStars('professionalism')}
          </div>

          {/* Driving Skills */}
          <div className="flex flex-col w-9/10 space-y-2">
            <p className="font-medium">Driving Skills</p>
            <p className="text-gray-500">
              The driver's driving skills, including adherence to traffic rules, smoothness of driving, and ability to handle various road conditions.
            </p>
          </div>
          <div className="pb-8 flex w-9/10 justify-center items-center">
            {renderStars('drivingSkills')}
          </div>

          {/* Knowledge of Routes */}
          <div className="flex flex-col w-9/10 space-y-2">
            <p className="font-medium">Knowledge of Routes</p>
            <p className="text-gray-500">
              Rate the driver's familiarity with local routes, ability to navigate efficiently, and knowledge of alternative routes in case of traffic or road closures.
            </p>
          </div>
          <div className="pb-8 flex w-9/10 justify-center items-center">
            {renderStars('knowledgeOfRoutes')}
          </div>

          {/* Communication */}
          <div className="flex flex-col w-9/10 space-y-2">
            <p className="font-medium">Communication</p>
            <p className="text-gray-500">
              Rate the driver's communication skills, including clarity in providing directions and responding to passenger inquiries or concerns.
            </p>
          </div>
          <div className="pb-8 flex w-9/10 justify-center items-center">
            {renderStars('communication')}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Ratings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DriverRating;
