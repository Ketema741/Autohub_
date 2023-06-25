import React, { useState, useContext } from "react";
import product1 from "../../data/product9.jpg";
import product2 from "../../data/product10.jpg";
import product3 from "../../data/product11.jpg";
import { useStateContext } from "../../context/ContextProvider";
import ItemContext from "../../context/item/itemContext";
import UserContext from "../../context/user/userContext";
import AuthContext from "../../context/auth/authContext";
import { toast } from 'react-toastify';
const Parse = require('html-react-parser')


const CarOverview = () => {
  const itemContext = useContext(ItemContext);
  const userContext = useContext(UserContext);
  const authContext = useContext(AuthContext);

  const { isUserAuthenticated, user } = authContext;
  const { addToCart, carts } = userContext;
  const { car } = itemContext;

  const { currentColor } = useStateContext();
  const [currentImage, setCurrentImage] = useState(0);

  const images = [product1, product2, product3];

  const handlePrevImage = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNextImage = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };
 
  const handleAddToCart = () => {
    console.log(carts)
    if (isUserAuthenticated) {
      if (user.role === "customer") {
        if (carts) {
          const itemExistsInCart = carts.items.some((cartItem) => cartItem.itemId._id === item._id);
          if (itemExistsInCart) {
            toast.info("Item already exists in the cart.");
          } else {
            addToCart(item);
          }
        } else {
          addToCart(item);
        }
      } else {
        toast.info("Please log in as a customer to add items to your cart.");
      }
    } else {
      toast.info("Please log in to add items to your cart.");
    }
  };
  

  return (
    <div>
      {car ? (
        <>
          <div className="flex flex-wrap items-center justify-center lg:justify-between px-6 py-12">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <div className="relative h-96">
                {car.carImages.map((image, index) => (
                  <img
                    key={image.public_id}
                    className={`absolute object-contain inset-0 w-full h-full ${currentImage === index ? "opacity-100" : "opacity-0"
                      } transition-opacity duration-300`}
                    src={image.url}
                    alt="item Image"
                  />
                ))}
                <div
                  className="absolute inset-y-0 left-0 flex items-center justify-center w-12 text-white bg-black bg-opacity-50 cursor-pointer hover:bg-opacity-75 transition-colors duration-300"
                  onClick={handlePrevImage}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-white bg-black bg-opacity-50 cursor-pointer hover:bg-opacity-75 transition-colors duration-300"
                  onClick={handleNextImage}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {car.make}
              </h2>
              <p className="text-gray-500 text-sm">
                By{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Autohub Company
                </a>
              </p>

              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-indigo-400 mr-1 mt-1">ETB</span>
                    <span className="font-bold text-indigo-600 text-3xl">{car.price}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                  <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                </div>
              </div>

              <div className="flex py-4 space-x-4">
                <button
                  style={{ backgroundColor: currentColor }}
                  type="button"
                  disabled
                  className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                  onClick={handleAddToCart}
                >
                  {/* {car.isAvailable ? "Available":"Not Available"} */}
                  Available
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 flex justify-center">
            <div className="w-full md:w-3/4  bg-gray-100 rounded shadow-lg overflow-hidden">
              <p className="p-5 font-semibold text-xl text-center">
                Detail Description
              </p>
              <div className="p-8">

              {Parse(car.description)}
              </div>
            </div>
          </div>
        </>
      )
        :
        <div className="text-center">loading...</div>}
    </div>
  );
};

export default CarOverview;
