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
  GET_DRIVERS, GET_SUPPLIERS, GET_EXEPRT, GET_EXEPRTS, GET_SERVISEPROVIERS, FILTER_DRIVERS, GET_DRIVER, GET_SUPPLIER, GET_SERVISEPROVIER, FILTER_SUPPLIERS, FILTER_EXEPRTS, FILTER_SERVISEPROVIERS
} from '../Types';

const UserState = (props) => {
  const initialState = {
    users: null,

    drivers: null,
    driver: null,
    filteredDrivers: null,

    suppliers: null,
    supplier: null,
    filteredSuppliers: null,

    serviceProviders: null,
    serviceProvider: null,
    filteredServiceProviders: null,

    aficionados: null,
    aficionado: null,
    filteredAficionados: null,

    user: null,
    current: null,
    filteredDrivers: null,
    favourites: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const authContext = useContext(AuthContext);
  const authenticateduser = authContext.user;


  // Get users
  const getUsers = async (userType) => {
    let get_users
    if (userType === "drivers") {
      get_users = GET_DRIVERS;
    }
    else if (userType === "suppliers") {
      get_users = GET_SUPPLIERS;
    }
    else if (userType === "experts") {
      get_users = GET_EXEPRTS;
    }
    else if (userType === "service-providers") {
      get_users = GET_SERVISEPROVIERS;
    }


    try {
      const res = await axios.get(`/users/${userType}`);
      dispatch({
        type: get_users,
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
  const getUser = async (_id, userType) => {

    let get_user
    if (userType === "driver") {
      get_user = GET_DRIVER;
    }
    else if (userType === "supplier") {
      get_user = GET_SUPPLIER;
    }
    else if (userType === "expert") {
      get_user = GET_EXEPRT;
    }
    else if (userType === "service-provider") {
      get_user = GET_SERVISEPROVIER;
    }

    try {
      const res = await axios.get(`/users/${userType}/${_id}`);
      dispatch({
        type: get_user,
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
  const addUser = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/users/register`, item, config);

      dispatch({ type: ADD_USER, payload: res.data });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };



  // clear users
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  // Delete user
  const deleteUser = async (_id, userType) => {
    try {
      await axios.delete(`/users/${userType}/${_id}`);
      dispatch({
        type: DELETE_USER,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // update user
  const updateUser = async (user, userType) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/users/${userType}/${user._id}`,
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

  // add To cart
  const addToCart = async (user, item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/users/cart/${user._id}`,
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

  // remove from cart
  const removeFromCart = async (userId, itemId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(
        `/users/removefromfart/${userId}`,
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

  // load user cart on first run or refresh
  useEffect(() => {
    if (authenticateduser && authenticateduser.carts) {
      dispatch({
        type: ADD_CART,
        payload: authenticateduser.carts,
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
  const filterUsers = (text, userType) => {
    let filter_users
    if (userType === "drivers") {
      filter_users = FILTER_DRIVERS;
    }
    else if (userType === "suppliers") {
      filter_users = FILTER_SUPPLIERS;
    }
    else if (userType === "experts") {
      filter_users = FILTER_EXEPRTS;
    }
    else if (userType === "service-providers") {
      filter_users = FILTER_SERVISEPROVIERS;
    }
    dispatch({ type: filter_users, payload: text });
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
        current: state.current,

        drivers: state.drivers,
        driver: state.driver,
        filteredDrivers: state.filteredDrivers,

        suppliers: state.suppliers,
        supplier: state.supplier,
        filteredSuppliers: state.filteredSuppliers,

        serviceProviders: state.serviceProviders,
        serviceProvider: state.serviceProvider,
        filteredServiceProviders: state.filteredServiceProviders,

        aficionados: state.aficionados,
        aficionado: state.aficionado,
        filteredAficionados: state.filteredAficionados,

        getUsers,
        getUser,
        addUser,
        addToCart,
        removeFromCart,
        clearUsers,
        deleteUser,
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
