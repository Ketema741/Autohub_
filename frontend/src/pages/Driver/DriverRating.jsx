import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const DriverRating = (_id) => {
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
    // send to the backend
    
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
      <h2 className="text-xl font-medium mb-2">Rate The driver Based On The Criteria Written Below</h2>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col w-9/10 space-y-2">
          <p className="font-medium">Punctuality</p>
          <p className="text-gray-500">
            The driver's ability to arrive on time for pickups and drop-offs.
          </p>
        </div>
        <div className="pb-8 flex w-9/10 justify-center items-center">
          {renderStars('punctuality')}
        </div>

        <div className="flex flex-col w-9/10 space-y-2">
          <p className="font-medium">Professionalism</p>
          <p className="text-gray-500">
            The driver's level of professionalism in terms of appearance, behavior, and communication.
          </p>
        </div>
        <div className="pb-8 flex w-9/10 justify-center items-center">
          {renderStars('professionalism')}
        </div>

        <div className="flex flex-col w-9/10 space-y-2">
          <p className="font-medium">Driving Skills</p>
          <p className="text-gray-500">
            The driver's driving skills, including adherence to traffic rules, smoothness of driving, and ability to handle various road conditions.
          </p>
        </div>
        <div className="pb-8 flex w-9/10 justify-center items-center">
          {renderStars('drivingSkills')}
        </div>

        <div className="flex flex-col w-9/10 space-y-2">
          <p className="font-medium">Knowledge of Routes</p>
          <p className="text-gray-500">
            Rate the driver's familiarity with local routes, ability to navigate efficiently, and knowledge of alternative routes in case of traffic or road closures.
          </p>
        </div>
        <div className="pb-8 flex w-9/10 justify-center items-center">
          {renderStars('knowledgeOfRoutes')}
        </div>

        <div className="flex flex-col w-9/10 space-y-2">
          <p className="font-medium">Communication</p>
          <p className="text-gray-500">
            Rate the driver's communication skills, including clarity in providing directions and responding to passenger inquiries or concerns.
          </p>
        </div>
        <div className="pb-8 flex w-9/10 justify-center items-center">
          {renderStars('communication')}
        </div>
      </div>
    </div>
  );
};

export default DriverRating;
