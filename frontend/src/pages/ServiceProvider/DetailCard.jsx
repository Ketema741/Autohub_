import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import { SiBookstack } from "react-icons/si";

import Blog from "../../assets/undraw_job_offers_re_634p.svg";

import AuthContext from "../../context/auth/authContext";
import { useStateContext } from '../../context/ContextProvider';
import ChatContext from "../../context/chat/chatContext";
import UserContext from "../../context/user/userContext";
const Parse = require('html-react-parser')


const SVDetailCard = () => {

    const navigate = useNavigate()

    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);

    const { createConversationRoom, getConversation } = chatContext
    const { serviceProvider, customer } = userContext
    const { user, isUserAuthenticated, logout } = authContext

    const [messageData, setMessageData] = useState({
        senderId: null,
        receiverId: null
    });



    const { handleClick } = useStateContext();

    const handleContact = () => {
        if (!user || !isUserAuthenticated || user?.role !== 'customer') {
            toast.info("Please Login as a customer");
            return;
        }

        let updatedMessageData = null;
        if (user?.role === "service provider") {
            updatedMessageData = {
                senderId: user?._id,
                receiverId: customer?._id
            };
        } else {
            updatedMessageData = {
                senderId: user?._id,
                receiverId: serviceProvider?._id
            };
        }

        if (!updatedMessageData.senderId || !updatedMessageData.receiverId) {
            toast.info("Something went wrong. Try to login as a customer or service provider.");
            return;
        }

        createConversationRoom(updatedMessageData);
        getConversation(updatedMessageData.senderId, updatedMessageData.receiverId);
        handleClick("chat");
    };


    return (
        <div className="lg:flex" >
            <div className="relative mt-8 md:mt-16 space-y-8 sm:w-full sm:px-4 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
                <div className=" pt-6 pb-8 mb-4 py-8">
                    {Parse(serviceProvider.bio)}

                </div>

            </div>
            <div className="mt-8 md:mt-0 lg:absolute -right-10 lg:w-7/12">
                <div className=" relative w-full">
                    <div className="sm:ml-0 sm:mr-4 md:ml-24 bg-white shadow-lg rounded-lg p-8 pb-12 mb-8" style={{ width: "550px", zIndex: 0 }}>
                        <h3 className="text-xl mb-8 font-semibold border-b pb-4">Contact Us </h3>

                        <div className="grid grid-cols-3 space-x-4 md:space-x-6 md:flex md:justify-center lg:justify-start">
                            <button
                                type="button"
                                onClick={handleContact}
                                className="p-4 border  dark:bg-gray-800 dark:border-gray-700 rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:hover:border-cyan-300/30"
                            >
                                <div className="flex justify-center space-x-4">
                                    <SiBookstack
                                        className="w-6 h-6"
                                        style={{ color: "#03C9D7" }}
                                    />
                                    <span className="hidden font-medium md:block dark:text-white">
                                        Contact
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full mt-24">
                    <div aria-hidden="true" className="absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-96 md:h-96 rounded-full rotate-45 bg-gradient-to-r from-sky-500 to-cyan-300 blur-3xl"></div>
                    <img
                        src={Blog}
                        className="relative ml-24 w-full overflow-hidden"
                        alt="wath illustration"
                        loading="lazy"
                        width="320"
                        height="280"
                        style={{ width: "550px", zIndex: 0 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SVDetailCard;