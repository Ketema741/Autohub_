import React, { useReducer, useEffect } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import axios from '../axiosConfig';

import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  SET_CURRENT,
  LOGIN_FAIL,
  LOGOUT,
} from '../Types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    currentUser: null,
    token: localStorage.token,
    isUserAuthenticated: null,
    userLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const register = async (formData) => {
   
    try {
      const res = await axios.post('/users/register', formData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    }
  };

  const removeImage = async (public_id) => {
    const id_obj = {
      public_id: public_id,
    };

   
    try {
      const res = await axios.post(`/users/image`, id_obj, config);
      console.log(res);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      console.log('error ', err.response);
    }
  };

  // login user
  const userLogin = async (formData) => {
    try {
      console.log(formData)
      const res = await axios.post('/users/login', JSON.stringify(formData));
      console.log(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });

      console.log('error ', err.response.data);
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    
    const res = await axios.get('/users/');

    try {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // set current
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.userLoading) {

    loadUser();
  }

  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  // AuthState Provider Component
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        currentUser: state.currentUser,
        error: state.error,
        userLoading: state.userLoading,
        isUserAuthenticated: state.isUserAuthenticated,
        register,
        setCurrent,
        userLogin,
        logout,
        loadUser,
        removeImage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
