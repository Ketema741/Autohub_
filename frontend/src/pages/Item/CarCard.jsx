import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'

import { FaStar } from 'react-icons/fa';

import ItemContext from '../../context/item/itemContext';

const RatingIcon = ({ filled }) => {
    const starColor = filled ? 'text-yellow-300' : 'text-gray-300';
    return <FaStar className={`w-5 h-5 ${starColor}`} />;
}


const CarCard = ({ item, currentColor }) => {
    const navigate = useNavigate();
    let image = null;
    if (item.carImages.length > 0) {
        image = item.carImages[0].url;
    }

    const itemContext = useContext(ItemContext);
    const { getCar } = itemContext;

    const handleClick = () => {
        getCar(item._id);
        navigate('/item-detail');
    }
    return (
        <div key={item._id} className="rounded-xl bg-white shadow-md  focus:outline-none mx-5 w-72 xl:mb-0 mb-8 transition duration-500 hover:scale-105">
            <img onClick={handleClick} src={image != null ? image : '/public/img/gal-1.jpeg'} alt={item.make} className="px-4 pt-4 focus:outline-none w-full h-48" />
            <button onClick={handleClick} >
            </button>
            <div >
                <div className="p-4">
                    <button onClick={handleClick} >
                        <div className="flex flex-wrap items-center">
                            <h2 className="text-2xl focus:outline-none font-semibold">
                                {item.make}
                            </h2>
                        </div>
                    </button>
                    <div className="flex items-center mt-2.5 mb-5">
                        
                        Seating Capacity {item.seatingCapacity}
                        <p className="focus:outline-none text-xs text-gray-600 pl-2">{item.year}</p>
                    </div>
                    <div className="flex mt-4">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">{item.price} ETB</span>
                        <div className="pl-2">
                            <p className="text-xs text-gray-600 dark:text-gray-400 px-2 bg-gray-200 py-1 rounded-full">20% discount</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-4">
                        <button disabled={true} className="text-white font-bold py-2 px-4 rounded focus:outline-none" style={{ backgroundColor: currentColor }}>
                            {item.isAvailable ? "Available" : "Not Available"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
