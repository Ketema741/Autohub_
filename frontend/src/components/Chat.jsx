import React, { useState, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import { MdOutlineCancel } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';

import background from '../brands/bg-10.jpg';

import ChatContext from '../context/chat/chatContext';
import AuthContext from '../context/auth/authContext';

import Contact from './Contact';
import Message from './Message'
import Button from './Button';


const Chat = () => {

  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const {
    messages,
    sendMessage,
    currentChat,
    setCurrentChat,
    conversations,
    getConversations,
    clearCurrent,
  } = chatContext;

  const [newMessage, setNewMessage] = useState("");
  const [setArrivalMessage, arrivalMessage,] = useState("")

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);


  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId)) {
      setCurrentChat(arrivalMessage);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
  }, [user]);

  useEffect(() => {
    getConversations(user._id);
  }, [user, getConversations]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    sendMessage(message)
    setNewMessage("");

  };


  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleUserClick = (room) => {
    clearCurrent()
    setCurrentChat(room)
  }
  return (
    <div className="nav-item  fixed right-0 md:right-52 top-0 bg-white dark:bg-[#42464D] rounded-lg w-full md:w-3/4 h-screen">
      <div className="flex flex-row flex-auto rounded-tl-lg border-l shadow-xl bg-white h-full">
        <div className='flex flex-col w-1/5'>
          <div className='flex justify-center items-center flex-none h-24 bg-gray-100 text-black text-xl font-semibold' > Contacts </div>
          <div className='flex-auto overflow-y-auto'>
            {conversations && conversations.map((room) => (
              <div onClick={() => handleUserClick(room)}>
                <Contact
                  conversation={room}
                  currentUser={user}
                  setCurrentChat={setCurrentChat}
                  currentChat={currentChat}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-4/5 border-l border-r border-gray-400 flex flex-col'>
          <div className='flex-none h-20 flex flex-row justify-between items-center p-5 border-b'>
            <div className='flex flex-col spaxe-y-1'>
              <strong> Chat </strong>
              <input type='text' readOnly placeholder='Make a Conversation' className='text-sm text-black outline-none focus:boerder-b hover:boerder-b border-dashed placeholder-gray-600' />
            </div>
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>
          <div className="flex-auto overflow-y-auto p-5 space-4"
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} >
            {messages && messages.map((m) => (
              <Message scroll={scrollRef} message={m} own={m.sender === user._id} />
            ))}
          </div>
          <div className='flex-none h-24 p-4 pt-0'>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className="relative flex">
                <span className="absolute inset-y-0 flex items-center">
                  <button type="button" onClick={handleSubmit} className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <RiSendPlaneFill className="h-6 w-6 text-gray-600" />
                  </button>
                </span>
                <textarea
                  placeholder="Write your message!"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  value={newMessage}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;