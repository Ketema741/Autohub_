import React, { useReducer } from 'react';
import axios from '../axiosConfig';
import chatContext from './chatContext';
import chatReducer from './chatReducer';
import { io } from "socket.io-client";

import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  MESSAGE_ERROR,
  GET_MESSAGES,
  GET_MESSAGE,
  SEND_MESSAGE,
  ADD_USER,
  GET_USERS,
  SET_CHAT,
  SET_ARRIVAL_MESSAGE,
  
  GET_NOTIFICATIONS,
  SEND_NOTIFICATION,
  SEND_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  CLEAR_CURRENT,

} from '../Types';

const ChatState = (props) => {
  const initialState = {
    conversations: null,
    conversation: null,
    arrivalChat: null,
    currentChat: null,
    currentChatWithUser: null,
    messages: null,
    onlineUsers: null,
    error: null,
    notifications: null,

  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Get conversations
  const getConversations = async (id) => {
    try {
      const res = await axios.get('/conversations/' + id);
      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,

      });
      console.log({ 'erro': err })
    }
  };
  // Get conversation
  const getConversation = async (firstUserId, sendUserId) => {
    try {
      const res = await axios.get(`/conversations/${firstUserId}/${sendUserId}`);
      dispatch({
        type: GET_CONVERSATION,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,

      });
      console.log({ 'erro': err })
    }
  };


  // Get message
  const getMessages = async (_id) => {
    try {
      const res = await axios.get(`/messages/${_id}`);
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response,
      });
    }
  };


  // conversation room
  const createConversationRoom = async (users) => {

    try {
      const res = await axios.post("/conversations", users);
      console.log(res)
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };
  // send message
  const sendMessage = async (message) => {

    try {
      const res = await axios.post("/messages", message);
      dispatch({ type: SEND_MESSAGE, payload: message });

    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get Notifications
  const getNotifications = async (id) => {
    try {
      const res = await axios.get('/notifications/' + id);
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,

      });
      console.log({ 'erro': err })
    }
  };



  // send notification
  const sendNotification  = async (notification) => {
    try {
      const res = await axios.post("/notifications/send", notification);
      dispatch({ type: SEND_NOTIFICATION, payload: notification });

    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

   // send notification
   const deleteNotification  = async (notificationId) => {
    try {
      const res = await axios.post(`/notifications/${notificationId}`);
      dispatch({ type: DELETE_NOTIFICATION, payload: notificationId });

    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // socke.io get message
  const getMessage = (text) => {
    dispatch({ type: GET_MESSAGE, payload: text });
  };
  // socke.io add user
  const addUser = (text) => {
    dispatch({ type: ADD_USER, payload: text });
  };

  // socke.io get users
  const getUsers = (text) => {
    dispatch({ type: GET_USERS, payload: text });
  };

  // socke.io get users
  const setCurrentChat = (text) => {
    getMessages(text._id)
    dispatch({ type: SET_CHAT, payload: text });
  };

  // 
  const setArrivalMessage = (text) => {
    dispatch({ type: SET_ARRIVAL_MESSAGE, payload: text });
  };


  // set current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <chatContext.Provider
      value={{
        conversations: state.conversations,
        notifications: state.notifications,
        arrivalChat: state.arrivalChat,
        currentChat: state.currentChat,
        messages: state.messages,
        error: state.error,
        getConversations,
        getConversation,
        getMessages,
        getMessage,
        sendMessage,
        addUser,
        getUsers,
        setCurrentChat,
        setArrivalMessage,
        clearCurrent,
        getNotifications,
        sendNotification,
        deleteNotification,
        createConversationRoom,
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
};

export default ChatState;
