import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MdOutlineCancel, MdOutlineManageAccounts, MdOutlineMail } from 'react-icons/md';

import Button from './Button';

import { useStateContext } from '../context/ContextProvider';
import avatar from '../assets/useravatar.svg';
import AuthContext from "../context/auth/authContext";
import UserRole from './UserRole';

const UserProfile = ({ onLogout }) => {
  const { currentColor } = useStateContext();
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={user?.profileImage? user?.profileImage:avatar}
          alt="user-profile"
        />
        {user &&
          <div>
            <p className="font-semibold text-xl dark:text-gray-200"> {user.firstName} </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email}</p>
          </div>
        }
      </div>
      <div>
        
          <Link to="/profile">
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#a5c2f4]">

              <button
                type="button"
                style={{ color: "rgb(87, 125, 134)", backgroundColor: "rgb(185, 237, 221)" }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                <MdOutlineManageAccounts />
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">My Profile</p>
                <p className="text-gray-500 text-sm dark:text-gray-400"> Account Settings </p>
              </div>
            </div>
          </Link>
          {/* <Link to="/profile">
            <div className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#a5c2f4]">

              <button
                type="button"
                style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                <MdOutlineMail />
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">My Inbox</p>
                <p className="text-gray-500 text-sm dark:text-gray-400"> Messages </p>
              </div>
            </div>
          </Link> */}

        {(user?.role != "driver" && user?.role != "customer" && user?.role != "service provider") &&
          <UserRole />
        }
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onLogout()}
          className=" p-3 w-full hover:drop-shadow-xl hover:bg-light-gray"
          style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
