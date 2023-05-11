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


import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosChatbubbles } from 'react-icons/io';

import AuthContext from "../context/auth/authContext";
import SupplierContext from "../context/user/supplierContext";
import { useStateContext } from '../context/ContextProvider';


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className="h-12 w-12 rounded-xl border bg-gray-100 active:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:active:bg-gray-800"
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
    const { isUserAuthenticated, supplier, logout } = authContext;

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
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-700 space-x-4 px-6 2xl:container shadow-2xl relative h-24">

            <NavButton
                title="Menu"
                customFunc={handleActiveMenu}
                color={currentColor}
                icon={<AiOutlineMenu className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
            />
            <h5 hidden className="text-center text-2xl font-medium text-gray-600 lg:block dark:text-white"> Admin Dashboard</h5>

            <div className="flex space-x-2">
                <Fragment>
                    <div className="hidden sm:block">
                        <NavButton
                            title="Chat"
                            dotColor="#FF5C8E"
                            customFunc={() => handleClick("chat")}
                            color={currentColor}
                            icon={<BsChatLeft className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
                        />
                    </div>

                    <div className="hidden sm:block">
                        <NavButton
                            title="Notification"
                            dotColor="#FF5C8E"
                            customFunc={() => handleClick("notification")}
                            color={currentColor}
                            icon={<RiNotification3Line className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
                        />
                    </div>
                    <div
                        className="flex justify-center items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                        onClick={() => handleClick("userProfile")}
                    >
                        <NavButton
                            title="Profile"
                            dotColor=""
                            customFunc={() => handleClick("profile")}
                            color={currentColor}
                            icon={<RxAvatar className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
                        />
                        <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>

                    {isClicked.chat && <Chat />}
                    {isClicked.notification && <Notification />}
                    {isClicked.userProfile && <UserProfile onLogout={onLogout} />}
                </Fragment>
            </div>
        </div>
    );
};

export default Navbar;
