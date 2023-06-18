import React, { useReducer, useEffect } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';


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
  UPDATE_USER,
  USER_ERROR,
} from '../Types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    currentUser: null,
    token: localStorage.token,
    isUserAuthenticated: null,
    updatedSuccessfully: false,
    userLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const register = async (formData) => {

    try {
      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post('/users/register', JSON.stringify(formData))
          .then((res) => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data,
            });

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: REGISTER_FAIL,
              payload: err.response.data,
            });

            reject(err);
          });
      });

      toast.promise(registrationPromise, {
        pending: 'Registering...',
        success: 'Registration successful! If you are a supplier, you will receive an acceptance email. Otherwise, please return to the homepage and log in.',
        error: `Registration failed: ${state.error ? state.error.error : "Try again!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error.error}`);
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
      const res = await axios.post('/users/login', JSON.stringify(formData));

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      if (formData.userType != "supplier") {

        loadUser();
      }

      toast.success('Login successful!');
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });

      toast.error('Login failed. Please check your credentials.');

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

    const res = await axios.get('/users/user');

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


  // update user
  const updateUser = async (user, _id, userType) => {
    try {
      const approvePromise = new Promise((resolve, reject) => {
        const res = axios.put(`/users/update/${userType}/${_id}`, user)
          .then((res) => {
            dispatch({
              type: UPDATE_USER,
              payload: res.data.data,
            });
            console.log(res)

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: USER_ERROR,
              payload: err
            });
            console.log(err)
            reject(err);
          });
          console.log(res)
      });

      toast.promise(approvePromise, {
        pending: 'Updating...',
        success: 'Profile updated successfully!',
        error: `Update failed: ${state.error?state.error:" try again later!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
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
        userLogin,
        updateUser,
        setCurrent,
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
