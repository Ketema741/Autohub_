import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateContext } from '../context/ContextProvider';
import Button from './Button';
import UserContext from '../context/user/userContext';

const Cart = () => {
  const userContext = useContext(UserContext);
  const { order, carts, placeOrder } = userContext;

  const { currentColor, handleClick } = useStateContext();
  const [cartItems, setCartItems] = useState(carts.items);
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
        if (item.itemId._id === itemId && item.quantity < itemQuantity) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.itemId._id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  const handleCheckout = () => {
    if (order) {
      handleClick("checkout")
    } else {
      toast.error("Please make sure to place your order before proceeding to checkout. Your order has not been placed yet.")
    }
  }



  const handlePlaceOrder = () => {
    placeOrder(carts._id)

  }

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
          {(cartItems && !order) ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.itemId._id}
                  className="flex items-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4"
                >
                  <img
                    className="rounded-lg h-80 w-24"
                    src={
                      item.itemId.itemImages.length > 0
                        ? item.itemId.itemImages[0].url
                        : null
                    }
                    alt=""
                  />
                  <div>
                    <p className="font-semibold">{item.itemId.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                      {item.category}
                    </p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="font-semibold text-lg">{item.price}</p>
                      <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <button onClick={() => handleDecrement(item.itemId._id)}>
                          <AiOutlineMinus />
                        </button>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                          {item.quantity}
                        </p>
                        <button
                          onClick={() =>
                            handleIncrement(
                              item.itemId._id,
                              item.itemId.quantity
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

          {order &&
            <p className="font-semibold text-lg">
            👏🏾👏🏾 Congratulations! You may proceed with the checkout process.👏🏾👏🏾
            </p>
          }
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

        {!order &&
          <div className="mt-5">
            <button
              type="button"
              onClick={handlePlaceOrder}
              style={{ backgroundColor: "orange", color: "white", borderRadius: "10px" }}
              className={` p-3 w-full hover:drop-shadow-xl hover:bg-light-gray`}
            >
              Place Order
            </button>
          </div>
        }

        {order &&
          <div className="mt-5">
            <button
              type="button"
              onClick={handleCheckout}
              style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
              className={` p-3 w-full hover:drop-shadow-xl hover:bg-light-gray`}
            >
              Checkout
            </button>

          </div>
        }

      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;
