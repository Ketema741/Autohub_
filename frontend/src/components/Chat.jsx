import React, { useState, useContext, useEffect, useRef } from 'react';
import { io } from "socket.io-client";
import { format } from 'timeago.js';

import { BsPersonCircle, BsCheck2Circle } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';

import Button from './Button';
import background from '../brands/bg-10.jpg'

import ChatContext from '../context/chat/chatContext';
import AuthContext from "../context/auth/authContext";

const Contacts = ({ conversation, currentUser }) => {
  const cards = Array.from({ length: 10 }, (_, index) => (
    <a href='#' key={index} className="block border-b ">
      <div className={` border-l-2 ${index == 2 ? 'border-blue-500 bg-blue-100' : ' border-transparent hover:bg-gray-100'} p-3 space-y-4`}>
        <div className='flex flex-row items-center space-x-2'>
          <BsCheck2Circle className='h-4 w-4' />
          <strong className='flex-grow text-sm'> Ketema</strong>
          <div className='text-sm text-gray-600'>4hr</div>
        </div>
        <div className='flex flex-row space-x-1 items-center'>
          <BsPersonCircle className='flex-none h-3 w-3' />
          <div className='flex-grow truncate'> some message content will be here also I am going to participate in a hackaton</div>
        </div>
      </div>
    </a>
  ));

  return <div>{cards}</div>;
};

const Message = ({ message, own, scroll }) => {
  return (
    <div ref={scroll} className={`flex  ${own ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-2`}>
      <BsPersonCircle className='flex-none' />
      <div className='flex flex-col'>
        <div className={`flex  ${own ? 'flex-row-reverse bg-gray-200 ' : 'flex-row bg-blue-200'} space-x-2 rounded p-5`}>
          {message.text}
        </div>
        <div className='text-sm text-gray-500'>{format(message.createdAt)}</div>
      </div>
    </div>
  )

};


const Chat = () => {

  const chatContext = useContext(ChatContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const {
    messages,
    getMessages,
    sendMessage,
    currentChat,
    setCurrentChat,
    setArrivalMessage,
    arrivalMessage,
    conversations,
    getConversations,
  } = chatContext;

  const [newMessage, setNewMessage] = useState("");


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
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setCurrentChat(arrivalMessage);
  }, [arrivalMessage, currentChat]);


  // backend
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    getConversations(user._id)
    if (conversations) {
      setCurrentChat(conversations[0])
    }
  }, [user, conversations]);

  useEffect(() => {
    getMessages(currentChat?._id)

    
  }, [currentChat]);

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

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="nav-item  fixed right-0 md:right-52 top-0 bg-white dark:bg-[#42464D] rounded-lg w-full md:w-3/4 h-screen">
      <div className="flex flex-row flex-auto rounded-tl-lg border-l shadow-xl bg-white h-full">
        <div className='flex flex-col w-1/5'>
          <div className='flex justify-center items-center flex-none h-24 bg-gray-100 text-black text-xl font-semibold' > Contacts </div>
          <div className='flex-auto overflow-y-auto'>
            {conversations && conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Contacts conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='w-4/5 border-l border-r border-gray-400 flex flex-col'>
          <div className='flex-none h-20 flex flex-row justify-between items-center p-5 border-b'>
            <div className='flex flex-col spaxe-y-1'>
              <strong> Service Provider </strong>
              <input type='text' placeholder='Add Conversation Title' className='text-sm text-black outline-none focus:boerder-b hover:boerder-b border-dashed placeholder-gray-600' />
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