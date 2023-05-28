
import React, { useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';
import { useStateContext } from '../../context/ContextProvider';
import { Navbar, Footer, Sidebar } from '../../components';

import DetailCard from './DetailCard'


const DriverDetail = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor
    } = useStateContext();

    const userContext = useContext(UserContext)

    const { driver } = userContext




    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');

        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (

        <div className={currentMode === "Dark" ? "dark" : ""}>
            <div className="flex relative dark:bg-main-dark-bg">

                {activeMenu ? (
                    <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  "
                            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                    }
                >

                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>
                    {driver !== null ?
                        (<DetailCard driver={driver} />)
                        :
                        <div>loading...</div>
                    } 

                    <Footer />

                </div>
            </div>
        </div>

    );
};

export default DriverDetail;
