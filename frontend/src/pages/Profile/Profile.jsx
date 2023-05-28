import React, { useState, useContext, useEffect, Fragment } from 'react';

import { Sidebar } from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import AuthContext from "../../context/auth/authContext";

import Navbar from './Navbar'
import AboutDriver from './about/AboutDriver'
import Experience from './Experience'
import ProfileCard from './ProfileCard'
import EditDriver from './edit/EditDriver';
import UserContext from '../../context/user/userContext';
const Profile = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    const { isUserAuthenticated, user, logout } = authContext;
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor
    } = useStateContext();

    const { updateUser } = userContext

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');

        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    const [showUserModal, setShowUserModal] = useState(null);

    const handleShow = () => {
        setShowUserModal(true);
    }

    const handleModalClose = () => {
        setShowUserModal(false);
    };


    const handleUpdate = (data) => {
        console.log(data);
        setShowUserModal(false)
        // updateUser(data, "driver")

    };

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
                    {user &&
                        <Fragment>
                            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                                <Navbar />
                            </div>
                            <div>
                                <div className="mt-24 container mx-auto my-5 p-5">
                                    <div className="md:flex gap-2 no-wrap md:-mx-2 ">
                                        <div className="w-full md:w-3/12 md:mx-2">
                                            <ProfileCard
                                                currentColor={currentColor}
                                                user={user}

                                                handleShow={handleShow}
                                            />
                                            <div className="my-8"></div>
                                        </div>
                                        <div className="w-full md:w-9/12 mx-2 h-64">
                                            {user.role == "driver" && <AboutDriver currentColor={currentColor} user={user} />}
                                            {user.role == "supplier" && <AboutSupplier currentColor={currentColor} user={user} />}
                                            {user.role == "expert" && <AboutExpert currentColor={currentColor} user={user} />}
                                            {user.role == "service-provider" && <AboutServiceProvider currentColor={currentColor} user={user} />}

                                            <div className="my-6"></div>
                                            <Experience currentColor={currentColor} />
                                        </div>
                                    </div>
                                </div>
                                {showUserModal && user.role == "driver" && <EditDriver handleUpdate={handleUpdate} handleModalClose={handleModalClose} user={user} />}
                                {showUserModal && user.role == "supplier" && <EditSupplier handleUpdate={handleUpdate} handleModalClose={handleModalClose} user={user} />}
                                {showUserModal && user.role == "expert" && <EditExpert handleUpdate={handleUpdate} handleModalClose={handleModalClose} user={user} />}
                                {showUserModal && user.role == "service-provider" && <EditServiceProvider handleUpdate={handleUpdate} handleModalClose={handleModalClose} user={user} />}
                            </div>
                        </Fragment>
                    }

                </div>
            </div>
        </div>

    );
};

export default Profile;
