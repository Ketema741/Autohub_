import React from 'react';
import { Link } from 'react-router-dom'

const ItemCard = ({ item, currentColor }) => {
  return (
    <div tabIndex={0} className="bg-white focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
      <Link to="item-detail">
        <div>
          <img src={item.itemImages.length >= 1 ? item.itemImages[0].url : '/public/img/gal-1.jpeg'} alt={item.title} className="px-4 pt-4 focus:outline-none w-full h-48" />
        </div>
      </Link>
      <div className="bg-white">
        <Link to="item-detail">

          <div className="flex items-center justify-between px-4 pt-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" tabIndex={0} className="focus:outline-none" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2"></path>
              </svg>
            </div>
            <div className="bg-yellow-200 py-1.5 px-6 rounded-full">
              <p tabIndex={0} className="focus:outline-none text-xs text-yellow-700">Featured</p>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <Link to="item-detail">

            <div className="flex items-center">
              <h2 tabIndex={0} className="focus:outline-none text-lg font-semibold">{item.title}</h2>
              <p tabIndex={0} className="focus:outline-none text-xs text-gray-600 pl-5">4 days ago</p>
            </div>
          </Link>
          <div className="flex mt-4">
            <div>
              <p tabIndex={0} className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
            </div>
            <div className="pl-2">
              <p tabIndex={0} className="focus:outline-none text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <button tabIndex={0} className="focus:outline-none  text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: currentColor }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ItemCard;
