import React, { useEffect, useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import Cart from './Cart';
import Chat from './Chat';
import Notification from './Notification';;
import UserProfile from './UserProfile'

import AuthContext from "../context/supplierAuth/authContext";
import SupplierContext from "../context/supplier/supplierContext";
import { useStateContext } from '../context/ContextProvider';


const GuestLinks = (
  <div className="flex  gap-5">
    <Link className="p-5 cursor-pointer hover:bg-light-gray rounded-lg" to="/register">
      Register
    </Link>

    <Link className="p-5 cursor-pointer hover:bg-light-gray rounded-lg" to="/login">
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
  const supplierContext = useContext(SupplierContext);
  const { isSupplierAuthenticated, supplier, logout } = authContext;

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

  const [searchValue, setSearchValue] = useState("");
  const [isFocused ,setIsFocused ] = useState(false)

  const handleSearch = () => {
    console.log(`Search clicked with value: ${searchValue}`);
  };

  return (
    <div className="flex justify-between bg-white dark:bg-gray-800 dark:border-gray-700 p-6 md:ml-6 md:mr-6 relative ">

      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="relative flex items-center">
        <input
          type="text"
          className="w-40 md:w-48 h-8 px-3 pr-8 text-sm font-medium placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className="absolute right-2 top-3.25" onClick={handleSearch}>
          <FaSearch className="text-gray-400" />
        </button>
      </div>
      <div className="flex">
        {isSupplierAuthenticated ?

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
                dotColor="#03C9D7"
                customFunc={() => handleClick("chat")}
                color={currentColor}
                icon={<BsChatLeft />}
              />
            </div>

            <div className="hidden sm:block">
              <NavButton
                title="Notification"
                dotColor="rgb(254, 201, 15)"
                customFunc={() => handleClick("notification")}
                color={currentColor}
                icon={<RiNotification3Line />}
              />
            </div>
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick("userProfile")}
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
                />
                <p>
                  <span className="hidden sm:block text-gray-400 text-14">Hi,</span>{" "}
                  <span className="hidden sm:block text-gray-400 font-bold ml-1 text-14">
                    {supplier && supplier.name}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
              </div>
            </TooltipComponent>

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
