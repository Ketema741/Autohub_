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
import Chat from './Chat';
import Notification from './Notification';;
import UserProfile from './UserProfile'
import { ItemFilter } from '../pages';

import AuthContext from "../context/Auth/authContext";
import UserContext from "../context/user/userContext";
import { useStateContext } from '../context/ContextProvider';


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
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);


const Navbar = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);
  const { isUserAuthenticated, user, logout } = authContext;

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

  return (
    <div className="flex justify-between bg-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow-2xl relative ">

      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        {isUserAuthenticated ?
          <Fragment>
            <NavButton
              title="Cart"
              customFunc={() => handleClick("cart")}
              color={currentColor}
              icon={<FiShoppingCart />}
            />

            <div className="hidden sm:block">
              <NavButton
                title="Chat"
                dotColor="#FF5C8E"
                customFunc={() => handleClick("chat")}
                color={currentColor}
                icon={<BsChatLeft />}
              />
            </div>

            <div className="hidden sm:block">
              <NavButton
                title="Notification"
                dotColor="#FF5C8E"
                customFunc={() => handleClick("notification")}
                color={currentColor}
                icon={<RiNotification3Line />}
              />
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <NavButton
                title="Profile"
                dotColor=""
                customFunc={() => handleClick("profile")}
                color={currentColor}
                icon={<RxAvatar />}
              />
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>

            {isClicked.cart && <Cart />}
            {isClicked.chat && <Chat />}
            {isClicked.notification && <Notification />}
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
