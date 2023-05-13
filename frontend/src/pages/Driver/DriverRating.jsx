import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const DriverRating = ({ initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating) => {
    setRating(newRating);
  }

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i}
          className={i <= rating ? 'text-yellow-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110' : 'text-gray-400 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110'}
          onClick={() => handleClick(i)}
        />
      );
    }

    return stars;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-2">Rate this driver:</h2>
      <div className="flex items-center">
        {renderStars()}
      </div>
    </div>
  );
}

export default DriverRating;
