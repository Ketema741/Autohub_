import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { RxAvatar } from 'react-icons/rx'

import Cart from './Cart';
import Checkout from './Checkout';
import Chat from './Chat';
import Notification from './Notification';;
import UserProfile from './UserProfile'
import { ItemFilter } from '../pages';

import AuthContext from "../context/auth/authContext";
import UserContext from "../context/user/userContext";
import { useStateContext } from '../context/ContextProvider';
import ChatContext from '../context/chat/chatContext';

const GuestLinks = (
  <div className="flex  gap-x-5">
    <Link className="pt-2 cursor-pointer hover:bg-light-gray rounded-lg" to="/register">
      Register
    </Link>

    <Link className=" pt-2 pr-5 cursor-pointer hover:bg-light-gray rounded-lg" to="/login">
      Login
    </Link>
  </div>
);

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="h-12 w-12 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
    >

      {icon}
    </button>

  </TooltipComponent>
);


const Navbar = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const chatContext = useContext(ChatContext);
  const { getNotifications, notifications } = chatContext;
  const { isUserAuthenticated, user, logout } = authContext;

  const { carts } = userContext;

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    if (user) {
      getNotifications(user?._id)
    }
  
    
  }, [user])
  

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


  const onLogout = () => {
    logout();
  };

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleChat = () => {
    handleClick("chat")
    
  }

  return (
    <div className="flex justify-between bg-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow-2xl relative ">

      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
      />

      <div className="flex">
        {isUserAuthenticated ?
          <Fragment>
            {user?.role == "customer" &&
              <div className="relative flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" >
                <NavButton
                  title="Cart"
                  customFunc={() => handleClick("cart")}
                  color={currentColor}
                  icon={<FiShoppingCart className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
                />
                <span
                  style={{ background: "#FF5C8E" }}
                  className="absolute inline-flex items-center justify-center rounded-full h-4 w-4 right-2 top-2 text-white text-center"
                >
                  {carts.items ? carts.items.length : 0}
                </span>
              </div>
            }
            {(user?.role === "customer" || user?.role === "serviceProvider") && (
              <div className="relative flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                <NavButton
                  title="Chat"
                  dotColor="#FF5C8E"
                  customFunc={handleChat}
                  color={currentColor}
                  icon={<BsChatLeft className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
                />
                {/* <span
                  style={{ background: "#FF5C8E" }}
                  className="absolute inline-flex items-center justify-center rounded-full h-4 w-4 right-2 top-2 text-white text-center"
                >
                  0
                </span> */}
              </div>
            )}


            <div className=" relative flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
              <NavButton
                title="Notification"
                dotColor="#FF5C8E"
                customFunc={() => handleClick("notification")}
                color={currentColor}
                icon={<RiNotification3Line className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
              />
              {notifications ?
                <span
                  style={{ background: "#FF5C8E" }}
                  className="absolute inline-flex items-center justify-center rounded-full h-4 w-4 right-2 top-2 text-white text-center"
                >
                  {notifications.length}
                </span>
                : ""
              }
            </div>
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <NavButton
                title="Profile"
                customFunc={() => handleClick("profile")}
                color={currentColor}
                icon={<RxAvatar className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
              />
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>

            {isClicked.cart && <Cart  user={user} />}
            {isClicked.chat && <Chat />}
            {isClicked.checkout && <Checkout user={user} />}
            {isClicked.notification && <Notification user={user} />}
            {isClicked.userProfile && <UserProfile onLogout={onLogout} />}
          </Fragment>
          :
          GuestLinks
        }
      </div>
    </div>
  );
};

export default Navbar;
