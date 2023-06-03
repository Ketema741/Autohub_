import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useStateContext } from '../context/ContextProvider';
import Button from './Button';
import UserContext from '../context/user/userContext';

const Cart = () => {
  const userContext = useContext(UserContext);
  const { carts } = userContext;

  const { currentColor } = useStateContext();
  const [cartItems, setCartItems] = useState(carts);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate sub-total
    const calculateSubTotal = () => {
      let subTotal = 0;
      if (cartItems) {
        cartItems.forEach((item) => {
          subTotal += item.price * item.quantity;
        });
      }
      return subTotal;
    };

    // Calculate total (assuming no additional fees or discounts)
    const calculateTotal = () => {
      return calculateSubTotal();
    };

    const newSubTotal = calculateSubTotal();
    const newTotal = calculateTotal();

    setSubTotal(newSubTotal);
    setTotal(newTotal);
  }, [cartItems]);

  const handleIncrement = (itemId, itemQuantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId._id === itemId && item.quantity < itemQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.productId._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
      <div className="mx-auto h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-[550px] p-8">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {cartItems ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.productId._id}
                  className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4"
                >
                  <img
                    className="rounded-lg h-80 w-24"
                    src={
                      item.productId.itemImages.length > 0
                        ? item.productId.itemImages[0].url
                        : null
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-semibold">{item.productId.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      {item.category}
                    </p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="font-semibold text-lg">{item.price}</p>
                      <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <button onClick={() => handleDecrement(item.productId._id)}>
                          <AiOutlineMinus />
                        </button>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            handleIncrement(
                              item.productId._id,
                              item.productId.quantity
                            )
                          }
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>Cart Is Empty</div>
          )}
        </div>
        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">${subTotal}</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">${total}</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Checkout"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
