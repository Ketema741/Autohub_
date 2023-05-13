import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { FiMenu, FiChevronUp } from "react-icons/fi";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../context/ContextProvider';


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


const Navbar = ({ name }) => {

    const {
        currentColor,
        activeMenu,
        setActiveMenu,
        screenSize,
    } = useStateContext();
   
    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    return (
        <div className="flex justify-between bg-white dark:bg-gray-800 dark:border-gray-700 p-6 md:ml-6 md:mr-6 relative ">
            <NavButton
                title="Menu"
                customFunc={handleActiveMenu}
                color={currentColor}
                icon={<AiOutlineMenu />}
            />
            <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8" >
                <div className="p-4 flex flex-row items-center justify-between">
                    <Link to="profile" className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">
                        User profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
