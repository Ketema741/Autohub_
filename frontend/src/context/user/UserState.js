import React, { useReducer, useEffect, useContext } from 'react';
import axios from "../axiosConfig"
import AuthContext from '../auth/authContext';
import userReducer from './userReducer';
import userContext from './userContext';

import { toast } from 'react-toastify';

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

  GET_DRIVERS, GET_DRIVER, FILTER_DRIVERS,

  GET_EXEPRTS, GET_EXEPRT, GET_PENDINGEXEPRTS, FILTER_EXEPRTS,

  GET_SUPPLIERS, GET_PENDINGSUPPLIERS, GET_SUPPLIER, FILTER_SUPPLIERS,

  GET_SERVISEPROVIDERS, GET_SERVISEPROVIDER, FILTER_SERVISEPROVIERS, APPROVE_SUPPLIER, APPROVE_EXPERT, REJECT_SUPPLIER, REJECT_EXPERT, GET_CARTITEMS
} from '../Types';

const UserState = (props) => {



  const initialState = {
    customers: null,
    customer: null,
    filteredUsers: null,
    error: null,
    carts: null,

    drivers: null,
    driver: null,
    filteredDrivers: null,

    suppliers: null,
    pendingSuppliers: null,
    supplier: null,
    filteredSuppliers: null,

    serviceProviders: null,
    serviceProvider: null,
    filteredServiceProviders: null,

    aficionados: null,
    pendingAficionados: null,
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
  const { isUserAuthenticated } = authContext;


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
      get_users = GET_SERVISEPROVIDERS;
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
  // Get users
  const getPendingUsers = async (userType) => {
    let get_users
    if (userType === "suppliers") {
      get_users = GET_PENDINGSUPPLIERS;
    }
    else if (userType === "experts") {
      get_users = GET_PENDINGEXEPRTS;
    }

    try {
      const res = await axios.get(`/users/pending/${userType}`);
      console.log(res.data)
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
    else if (userType === "customer") {
      get_user = GET_USER;
    }
    else if (userType === "supplier") {
      get_user = GET_SUPPLIER;
    }
    else if (userType === "expert") {
      get_user = GET_EXEPRT;
    }
    else if (userType === "service-provider") {
      get_user = GET_SERVISEPROVIDER;
    }

    try {
      const res = await axios.get(`/users/${userType}/${_id}`);
      dispatch({
        type: get_user,
        payload: res.data,
      });
      return res.data
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // rating driver
  const rateDriver = async (ratings, _id) => {
    try {
      const ratingPromise = new Promise((resolve, reject) => {
        const res = axios.post(`drivers/ratings/${_id}`, ratings)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: USER_ERROR,
              payload: err.response
            });
            console.log(err)
            reject(err);
          });
        console.log(res)
      });

      toast.promise(ratingPromise, {
        pending: 'Rating...',
        success: 'Rating successful!',
        error: `Rating failed try again later!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };

  // approve user
  const rejectUser = async (_id, userType) => {

    let get_user
    if (userType === "supplier") {
      get_user = REJECT_SUPPLIER;
    }
    else if (userType === "expert") {
      get_user = REJECT_EXPERT;
    }

    try {
      const res = await axios.get(`/users/reject/${userType}/${_id}`);
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
  const addUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/users/register`, user, config);

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
    try {
      const res = await axios.put(
        `/users/${userType}/${user._id}`,
        user
      );
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error
      });
    }
  };

  // add To cart
  const getCartItems = async () => {
    try {
      const res = await axios.get(`/cart`);
      dispatch({
        type: GET_CARTITEMS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // add To cart
  const addToCart = async (item) => {
    const data = {
      productId: item._id,
      quantity: 1,
    }

    const cartData = {
      productId: item,
      quantity: 1,
      price: item.price,
    }

    try {
      const res = await axios.post(`/cart/add`, data);
      dispatch({
        type: UPDATE_CART,
        payload: cartData,
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
    if (isUserAuthenticated && authenticateduser) {
      getCartItems()
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

  const approveSupplier = async (data, supplier) => {

    try {
      const approvePromise = new Promise((resolve, reject) => {
        axios.post(`/users/approve/suppliers/${supplier._id}`, data)
          .then((res) => {
            dispatch({
              type: APPROVE_SUPPLIER,
              payload: supplier,
            });

            resolve(res);
          })
          .catch((err) => {
            dispatch({ type: USER_ERROR });
            reject(err);
          });
      });

      toast.promise(approvePromise, {
        pending: 'Approving...',
        success: 'Approed successful!',
        error: `Approving failed try again later!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  }
  const rejectSupplier = async (_id) => {
    console.log(_id);
    try {
      const rejectPromise = new Promise((resolve, reject) => {
        axios.post(`/users/reject/suppliers/${_id}`)
          .then((res) => {
            dispatch({
              type: REJECT_SUPPLIER,
              payload: _id,
            });

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: USER_ERROR,
              payload: err.response

            });
            reject(err);
          });
      });

      toast.promise(rejectPromise, {
        pending: 'Rejecting...',
        success: 'Application Rejected successful!',
        error: `Reject failed please try again later!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  }



  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <userContext.Provider
      value={{
        customers: state.customers,
        customer: state.customer,
        filteredUsers: state.filteredUsers,
        current: state.current,

        carts: state.carts,

        drivers: state.drivers,
        driver: state.driver,
        filteredDrivers: state.filteredDrivers,

        suppliers: state.suppliers,
        pendingSuppliers: state.pendingSuppliers,
        supplier: state.supplier,
        filteredSuppliers: state.filteredSuppliers,

        serviceProviders: state.serviceProviders,
        serviceProvider: state.serviceProvider,
        filteredServiceProviders: state.filteredServiceProviders,

        aficionados: state.aficionados,
        pendingAficionados: state.pendingAficionados,
        aficionado: state.aficionado,
        filteredAficionados: state.filteredAficionados,

        getUsers,
        getPendingUsers,
        getUser,
        addUser,

        rateDriver,

        approveSupplier,
        rejectSupplier,

        addToCart,
        getCartItems,
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
