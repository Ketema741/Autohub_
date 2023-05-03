//  import React from 'react'


// const Profile = () => {
//     return (
//         <div className="bg-gray-100">
//             <NavBar />
//             <div className="container mx-auto my-5 p-5">
//                 <div className="md:flex no-wrap md:-mx-2 ">
//                     <div className="w-full md:w-3/12 md:mx-2">
//                         <ProfileCard />
//                         <div className="my-4"></div>
//                         <FriendCard />
//                     </div>
//                     <div className="w-full md:w-9/12 mx-2 h-64">
//                         <About />
//                         <div className="my-4"></div>
//                         <Experience />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profile

import React, { useContext, useEffect, Fragment } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Sidebar } from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import AuthContext from "../../context/supplierAuth/authContext";

import Navbar from './Navbar'
import About from './About'
import Experience from './Experience'
import ProfileCard from './ProfileCard'

const Profile = () => {
    const authContext = useContext(AuthContext);
    const { isSupplierAuthenticated, supplier, logout } = authContext;
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor
    } = useStateContext();




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
                    {supplier &&
                        <Fragment>
                            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                                <Navbar name={supplier.name} currentColor={currentColor} />
                            </div>
                            <div>
                                <div className="mt-24 container mx-auto my-5 p-5">
                                    <div className="md:flex gap-2 no-wrap md:-mx-2 ">
                                        <div className="w-full md:w-3/12 md:mx-2">
                                            <ProfileCard currentColor={currentColor} name={supplier.name} />
                                            <div className="my-8"></div>
                                        </div>
                                        <div className="w-full md:w-9/12 mx-2 h-64">
                                            <About currentColor={currentColor} supplier={supplier} />
                                            <div className="my-6"></div>
                                            <Experience currentColor={currentColor} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    }

                </div>
            </div>
        </div>

    );
};

export default Profile;
