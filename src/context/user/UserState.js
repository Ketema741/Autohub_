import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import userContext from './userContext';
import AuthContext from '../auth/authContext';
import userReducer from './userReducer';

import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  ADD_CART,
  DELETE_CART,
  UPDATE_CART,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  FILTER_USERS,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
} from '../Types';

const UserState = (props) => {
  const initialState = {
    users: null,
    user: null,
    current: null,
    filtered: null,
    favourites: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const authContext = useContext(AuthContext);
  const authenticateduser = authContext.user;

  // Get users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get user
  const getUser = async (_id) => {
    try {
      const res = await axios.get(`api/users/${_id}`);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // add users
  const addUser = async (item, images) => {
    item.itemImages = images;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/users', item, config);

      dispatch({ type: ADD_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  const removeImage = async (public_id) => {
    const id_obj = {
      public_id: public_id,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post(`api/users/image`, id_obj, config);
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Delete user
  const deleteUser = async (_id) => {
    try {
      await axios.delete(`api/users/${_id}`);
      dispatch({
        type: DELETE_USER,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // update user
  const updateUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `api/users/${user._id}`,
        user,
        config
      );
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // add To favourite
  const addToFavourite = async (user, item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/users/favourite/${user._id}`,
        JSON.stringify(item),
        config,
      );
      dispatch({
        type: UPDATE_CART,
        payload: item,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // remove from Favourite
  const removeFavourite = async (userId, itemId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(
        `/api/users/removefavourite/${userId}`,
        config,
      );
      dispatch({
        type: DELETE_CART,
        payload: itemId,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // load user favourite on first run or refresh
  useEffect(() => {
    if (authenticateduser && authenticateduser.favourites) {
      dispatch({
        type: ADD_CART,
        payload: authenticateduser.favourites,
      });
    }
  }, [authenticateduser]);

  // set current
  const setCurrent = (item) => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // set current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter item
  const filterUsers = (text) => {
    dispatch({ type: FILTER_USERS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <userContext.Provider
      value={{
        users: state.users,
        user: state.user,
        favourites: state.favourites,
        current: state.current,
        filtered: state.filtered,
        getUsers,
        getUser,
        addUser,
        addToFavourite,
        removeFavourite,
        clearUsers,
        deleteUser,
        removeImage,
        setCurrent,
        clearCurrent,
        updateUser,
        filterUsers,
        clearFilter,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
