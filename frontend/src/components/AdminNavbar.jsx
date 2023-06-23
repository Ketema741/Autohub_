import React, { useEffect, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { RxAvatar } from 'react-icons/rx'

import Notification from './Notification';;
import UserProfile from './UserProfile'

import AuthContext from "../context/auth/authContext";
import { useStateContext } from '../context/ContextProvider';
import ChatContext from '../context/chat/chatContext';

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
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { isUserAuthenticated, user, logout } = authContext;
    const chatContext = useContext(ChatContext);
    const { notifications } = chatContext;

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
        if (!isUserAuthenticated) {
            navigate("/")
        }
    }, [isUserAuthenticated])

    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const onLogout = () => {
        logout();
        navigate("/")
    };

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 dark:border-gray-700 shadow-2xl relative h-24">
            <NavButton
                title="Menu"
                customFunc={handleActiveMenu}
                color={currentColor}
                icon={<AiOutlineMenu className="mx-auto w-6 h-6 text-gray-600 dark:text-gray-300" />}
            />
            <h5 hidden className="text-center text-2xl font-medium text-gray-600 lg:block dark:text-white"> Admin Dashboard</h5>
            <div className="flex">
                <Fragment>
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
                    {isClicked.notification && <Notification user={user} />}
                    {isClicked.userProfile && <UserProfile onLogout={onLogout} />}
                </Fragment>
            </div>
        </div>
    );
};
export default Navbar;