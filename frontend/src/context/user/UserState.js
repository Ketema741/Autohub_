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
  GET_CUSTOMERORDERS,
  USER_ORDER,
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

  GET_SERVISEPROVIDERS, GET_SERVISEPROVIDER, FILTER_SERVISEPROVIERS, APPROVE_SUPPLIER, APPROVE_EXPERT, REJECT_SUPPLIER, REJECT_EXPERT, GET_CARTITEMS, CHECK_OUT, VERIFY_PAYMENT
} from '../Types';

const UserState = (props) => {



  const initialState = {
    customers: null,
    customer: null,
    filteredUsers: null,
    error: null,
    carts: [],
    order: null,
    chapaPaymentURL: null,
    customerOrders: [],
    isPaymentVerified: false,

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

  


  // order 
  const placeOrder = async (_id) => {

    try {
      const placeOrderPromise = new Promise((resolve, reject) => {
        const res = axios.post(`orders/place-order/${_id}`)
          .then((res) => {
            dispatch({
              type: USER_ORDER,
              payload: res.data.order
            });
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

      toast.promise(placeOrderPromise, {
        pending: 'Placing Order...',
        success: 'Order placed successfully !',
        error: `Place Order failed try again later!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };


  // Check Out 
  const checkOutOrder = async (_id, data) => {
    try {
      const checkoutPromise = new Promise((resolve, reject) => {
        const res = axios.post(`payment/checkout/orders/${_id}`, data)
          .then((res) => {

            dispatch({
              type: CHECK_OUT,
              payload: res.data
            });
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

      toast.promise(checkoutPromise, {
        pending: 'Checkout...',
        success: 'Order placed successfully !',
        error: `Checkout failed try again later!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };

  const getCustomerOrders = async () => {
    try {
      const res = await axios.get(`/orders`);
      dispatch({
        type: GET_CUSTOMERORDERS,
        payload: res.data,
      });
      return res.data
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.msg,
      });
    }
  }

   // verify payment 
   const verifyPayment = async ( _id) => {
    try {
      const paymentVerifyPromise = new Promise((resolve, reject) => {
        const res = axios.get(`payment/verify/payment/${_id}`)
          .then((res) => {
            dispatch({
              type: VERIFY_PAYMENT,
              payload: res.data
            });
            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: USER_ERROR,
              payload: err.response.data
            });
            reject(err);
          });
        console.log(res)
      });

      toast.promise(paymentVerifyPromise, {
        pending: 'Verfing payment status...',
        success: 'Payment verified successful!',
        error: "That order isn't paid yet",
      });
      // state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };

  // add To cart
  const addToCart = async (item) => {
    const data = {
      productId: item._id,
      quantity: 1,
    }

    try {
      const res = await axios.post(`/cart/add`, data);
      getCartItems()
    } catch (error) {
      console.log(error)
      dispatch({ type: USER_ERROR });
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
      console.log(err)
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

  // update cart
  const updateCart = async (itemId, updateCartItem) => {
    try {
      await axios.put(`/cart/update/${itemId}`, updateCartItem);
      getCartItems()

    } catch (error) { 
      dispatch({ type: USER_ERROR });
    }
  };
  // delete cart
  const deleteCart = async (itemId) => {
    try {
      await axios.delete(`/cart/remove/${itemId}`);
      getCartItems();
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };
  // remove from cart
  const removeFromCart = async (userId, itemId) => {
  
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
    if (isUserAuthenticated) {
      getCartItems()
    }
  }, [isUserAuthenticated]);

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
        chapaPaymentURL: state.chapaPaymentURL,
        order: state.order,
        customerOrders: state.customerOrders,
        isPaymentVerified: state.isPaymentVerified,

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

        placeOrder,
        checkOutOrder,
        getCustomerOrders,
        verifyPayment,
        deleteCart,

        getUsers,
        getPendingUsers,
        getUser,
        addUser,

        rateDriver,

        approveSupplier,
        rejectSupplier,

        addToCart,
        getCartItems,
        updateCart,
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
