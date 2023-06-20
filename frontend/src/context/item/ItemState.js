import React, { useReducer } from 'react';
import axios from '../axiosConfig';
import itemContext from './itemContext';
import itemReducer from './itemReducer';
import { toast } from 'react-toastify';
import {
  GET_ITEMS,
  GET_PUBLICITEMS,
  GET_ITEM,
  ADD_ITEM,
  DELETE_ITEM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ITEM,
  FILTER_ITEMS,
  CLEAR_ITEMS,
  CLEAR_FILTER,
  ITEM_ERROR,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  GET_CARS,
  GET_CAR,
} from '../Types';

const Itemstate = (props) => {
  const initialState = {
    items: [],
    cars: [],
    car:null,
    publicItems: null,
    item: null,
    error: null,
    current: null,
    filtered: null,
    categories: null
  };

  const [state, dispatch] = useReducer(itemReducer, initialState);

  // Get supplier items
  const getItems = async () => {
    try {
      const res = await axios.get('/items');
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get supplier items
  const getCars = async () => {
    try {
      const res = await axios.get('/items/cars/get');
      dispatch({
        type: GET_CARS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get supplier items
  const getCar = async (id) => {
    try {
      const res = await axios.get(`/items/car/${id}`);
      dispatch({
        type: GET_CAR,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };




  // Get public items
  const getPublicItems = async () => {
    try {
      const res = await axios.get('/items');
      dispatch({
        type: GET_PUBLICITEMS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get item
  const getItem = async (_id) => {
    try {
      const res = await axios.get(`/items/${_id}`);
      console.log(res.data.data)
      dispatch({
        type: GET_ITEM,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };


  const getCategories = async () => {
    try {
      const res = await axios.get("/items/category/all");
      console.log(res.data)
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err)
      dispatch({
        type: ITEM_ERROR,
        payload: err.response,

      });
    }
  }


  // create category
  const createCategory = async (_id) => {
    try {
      const res = await axios.post("/items/create-category");
      console.log(res.data)
      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.message,
      });
    }
  };


  // add item
  const addItem = async (item, type) => {
    
    try {
      const addPromise = new Promise((resolve, reject) => {
        const res = axios.post(`/items/${type}/add`, item)
          .then((res) => {
            dispatch({
              type: ADD_ITEM,
              payload: res.data
            });
            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: ITEM_ERROR,
              payload: err.response
            });
            console.log(err)
            reject(err);
          });
          console.log(res)
      });

      toast.promise(addPromise, {
        pending: 'Uploading...',
        success: 'Item uploaded successfully!',
        error: `Item Uploading failed: ${state.error? state.error:" try again later!"} `,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
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
      const res = await axios.post(`api/items/image`, id_obj, config);
    } catch (error) {
      dispatch({ type: ITEM_ERROR });
    }
  };

  // clear items
  const clearItems = () => {
    dispatch({ type: CLEAR_ITEMS });
  };

  // Delete item
  const deleteItem = async (_id) => {
    try {
      await axios.delete(`api/items/${_id}`);
      dispatch({
        type: DELETE_ITEM,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: ITEM_ERROR });
    }
  };

  // update item
  const updateitem = async (item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`api/items/${item._id}`, item, config);
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: ITEM_ERROR });
    }
  };

  // set current
  const setCurrent = (item) => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // set current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter item
  const filterItems = (text) => {
    dispatch({ type: FILTER_ITEMS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <itemContext.Provider
      value={{
        items: state.items,
        cars: state.cars,
        car: state.car,
        publicItems: state.publicItems,
        categories: state.categories,
        item: state.item,
        current: state.current,
        filtered: state.filtered,
        getItems,
        getCars,
        getCar,
        getPublicItems,
        getItem,
        addItem,
        getCategories,
        createCategory,
        clearItems,
        deleteItem,
        removeImage,
        setCurrent,
        clearCurrent,
        updateitem,
        filterItems,
        clearFilter,
      }}
    >
      {props.children}
    </itemContext.Provider>
  );
};

export default Itemstate;
