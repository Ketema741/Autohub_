import React, { useReducer } from 'react';
import axios from '../axiosConfig';
import chatContext from './chatContext';
import chatReducer from './chatReducer';
import { io } from "socket.io-client";

import {
  GET_CONVERSATIONS,
  MESSAGE_ERROR,
  GET_MESSAGES,
  GET_MESSAGE,
  SEND_MESSAGE,
  ADD_USER,
  GET_USERS,
  SET_CHAT,
  SET_ARRIVAL_MESSAGE,

} from '../Types';

const ChatState = (props) => {
  const initialState = {
    conversations: null,
    arrivalChat: null,
    currentChat: null,
    messages: null,
    onlineUsers:null,
    error: null,

  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Get conversations
  const getConversations = async (id) => {
    try {
      const res = await axios.get('/conversations/'+ id);
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
    dispatch({ type: SET_CHAT, payload: text });
  };

  // 
  const setArrivalMessage = (text) => {
    dispatch({ type: SET_ARRIVAL_MESSAGE, payload: text });
  };



  return (
    <chatContext.Provider
      value={{
        conversations: state.conversations,
        arrivalChat: state.arrivalChat,
        currentChat: state.currentChat,
        messages: state.messages,
        error: state.error,
        getConversations,
        getMessages,
        getMessage,
        sendMessage,
        addUser,
        getUsers,
        setCurrentChat,
        setArrivalMessage,
        
       
      }}
    >
      {props.children}
    </chatContext.Provider>
  );
};

export default ChatState;
