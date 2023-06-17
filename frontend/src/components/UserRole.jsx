import React, { useContext, useEffect } from 'react';

import { FaChartLine } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import AuthContext from '../context/auth/authContext';
import { Link } from 'react-router-dom'

const UserRole = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const commonProps = {
        iconColor: '#A4BC92',
        iconBg: '#DDFFBB',
    };

    let userRole = {};

    if (user) {
        if (user.role === 'caraficionados') {
            userRole = {
                icon: <AiOutlineCloudUpload />,
                title: 'Blog Post',
                url: '/blog-posting',
                desc: 'Make Post',
            };
        } else if (user.role === 'supplier') {
            userRole = {
                icon: <FaChartLine />,
                title: 'Dashboard',
                url: '/supplier-dashboard',
                desc: 'Supplier Dashboard',
            };
        } else if (user.role === 'admin') {
            userRole = {
                icon: <FaChartLine />,
                title: 'Dashboard',
                url: '/admin-dashboard',
                desc: 'Admin Dashboard',
            };
        } else if (user.role === 'serviceProvider') {
            userRole = {
                icon: <FaChartLine />,
                title: 'Dashboard',
                url: '/supplier',
                desc: 'Service Provider Dashboard',
            };

        } 

        if (userRole) {
            userRole = {
                ...userRole,
                ...commonProps,
            };
        }
    };

    return (
        <div>
            {userRole &&
                <Link to={userRole.url}>
                    <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#a5c2f4]">

                        <button
                            type="button"
                            style={{ color: userRole.iconColor, backgroundColor: userRole.iconBg }}
                            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                        >
                            {userRole.icon}
                        </button>

                        <div>
                            <p className="font-semibold dark:text-gray-200 ">{userRole.title}</p>
                            <p className="text-gray-500 text-sm dark:text-gray-400"> {userRole.desc} </p>
                        </div>
                    </div>
                </Link>
            }

        </div>
    );
};

export default UserRole;
