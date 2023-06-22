import React, { useState, useEffect } from 'react';
import { BsPersonCircle, BsCheck2Circle } from 'react-icons/bs';
import axios from '../context/axiosConfig'

const Contacts = ({ conversation, currentUser, currentChat }) => {

  const [friend, setFriend] = useState(null);

  const [currentChatId, setCurrentChatId] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState(null);

  useEffect(() => {
    const _id = currentChat?.members?.find((m) => m !== currentUser._id);
    setSelectedChatId(_id)
  }, [currentChat])


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    setCurrentChatId(friendId)
    let userType
    if (currentUser.role == "customer") {
      userType = "service-provider"
    } else {
      userType = "customer"
    }
    const getUser = async () => {
      try {
        const res = await axios.get(`/users/${userType}/${friendId}`);
        setFriend(res.data.data);
        console.log(res.data.data);

      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);


  return (
    <div>
      {friend &&
        <button className="block border-b ">
          <div
            className={` border-l-2 ${selectedChatId === currentChatId ? 'border-blue-500 bg-blue-100' : ' border-transparent hover:bg-gray-100'
              } p-3 space-y-4`}
          >
            <div className="flex flex-row items-center space-x-2">
              <BsCheck2Circle className="h-4 w-4" />
              {friend.vendorName ?
                <div className="flex-grow text-md">{friend.vendorName}</div>
                :
                <div className="flex-grow text-md">{friend.firstName}</div>
              }
              <div className="text-sm text-gray-600">4hr</div>
            </div>
            <div className="flex flex-row space-x-1 items-center">
              <BsPersonCircle className="flex-none h-3 w-3" />
              <div className="flex-grow truncate">{friend.email}</div>
            </div>
          </div>
        </button>
      }
    </div>
  );
};

export default Contacts;
