import React from 'react';


import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import product1 from '../../data/product1.jpg'
import product2 from '../../data/product2.jpg'
import product3 from '../../data/product3.jpg'
import product4 from '../../data/product4.jpg'
import product5 from '../../data/product5.jpg'
const products = [
  {
    id: 1,
    title: 'Car Floor Mats',
    image: product1,
    price: 49.99,
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Car Seat Covers',
    image: product2,
    price: 79.99,
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Car Air Freshener',
    image: product3,
    price: 9.99,
    rating: 4.2,
  },
  {
    id: 4,
    title: 'Car Seat Covers',
    image: product4,
    price: 79.99,
    rating: 4.8,
  },
  {
    id: 5,
    title: 'Car Air Freshener',
    image: product5,
    price: 9.99,
    rating: 4.2,
  },
];

const Carousel = () => {
  const [currentProduct, setCurrentProduct] = React.useState(0);

  const handlePrev = () => {
    setCurrentProduct(currentProduct === 0 ? products.length - 1 : currentProduct - 1);
  }

  const handleNext = () => {
    setCurrentProduct(currentProduct === products.length - 1 ? 0 : currentProduct + 1);
  }

  const startIndex = currentProduct;
  const endIndex = (currentProduct + 3) % products.length;

  const currentProducts = products.slice(startIndex, endIndex + 1);

  return (
    <div className="mx-auto container pt-24 ">
      <div className="flex justify-center m-8">
        <p className="text-2xl font-bold">Featured Cars</p>
        
      </div>
      <div className="relative space-x-7 flex justify-center items-center">
        <div className="absolute left-0 top-1 bottom-0 flex items-center z-10">
          <button
            onClick={handlePrev}
            className={`text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 ${currentProduct === 0 ? 'opacity-50 cursor-default' : ''}`}
            disabled={currentProduct === 0}
          >
            <BiChevronLeft className="h-8 w-8" />
          </button>
        </div>
        <div className="absolute right-0 top-1 bottom-0 flex items-center z-10">
          <button
            onClick={handleNext}
            className={`text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 ${currentProduct === products.length - 1 ? 'opacity-50 cursor-default' : ''}`}
            disabled={currentProduct === products.length - 1}
          >
            <BiChevronRight className="h-8 w-8" />
          </button>
        </div>
        <div className=" overflow-hidden  w-full">
          <ul
            className="transform transition-all ease-in-out duration-600 flex"
            style={{ transform: `translateX(-${startIndex * 33.33}%)` }}
          >
            {currentProducts.map((product) => (
              <li key={product.id} className="w-full px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden w-72">
                  <img src={product.image} alt={product.title} className="px-4 pt-4 focus:outline-none w-full h-60" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Carousel;