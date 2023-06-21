import React, { useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from './index';
import { useStateContext } from '../context/ContextProvider';
import ChatContext from '../context/chat/chatContext';

const Notification = ({ user }) => {
  const { currentColor } = useStateContext();

  const chatContext = useContext(ChatContext)
  const { notifications, deleteNotification } = chatContext

  const handleDelete = (_id) => {
    deleteNotification(_id, user)

  }

  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Notifications</p>
          <button type="button" className="text-white text-xs rounded p-1 px-2 bg-orange-theme "> 5 New</button>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-5 h-[400px] overflow-y-auto">
        {notifications ? (
          notifications.map((notification) => (
            <div className="leading-8 border-b-1 border-color p-3" key={notification._id}>
              <div className="flex items-center gap-5 p-3">
                <div>
                  <p className="font-semibold dark:text-gray-200">{notification.message}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{notification.content}</p>
                </div>
              </div>

              {/* <div className="mt-5">
                <button
                  type="button"
                  onClick={() => handleDelete(notification._id)}
                  style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
                  className={`bg-${currentColor}  p-3 w-full hover:drop-shadow-xl`}
                >
                  Mark As Read
                </button>
              </div> */}
            </div>
          ))
        ) : (
          <div>No Notification</div>
        )}
      </div>

    </div>
  );
};

export default Notification;
