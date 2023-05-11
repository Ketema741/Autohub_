import React, { useReducer, useEffect, useContext } from 'react';
import axios from 'axios';
import supplierContext from './supplierContext';
import AuthContext from '../supplierAuth/authContext';
import supplierReducer from './supplierReducer';

import {
  GET_SUPPLIERS,
  GET_SUPPLIER,
  ADD_SUPPLIER,
  ADD_CHART,
  DELETE_CHART,
  UPDATE_CHART,
  DELETE_SUPPLIER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SUPPLIER,
  FILTER_SUPPLIERS,
  CLEAR_SUPPLIERS,
  CLEAR_FILTER,
  SUPPLIER_ERROR,
} from '../Types';

const SupplierState = (props) => {
  const initialState = {
    suppliers: null,
    supplier: null,
    current: null,
    filtered: null,
    favourites: [],
  };

  const [state, dispatch] = useReducer(supplierReducer, initialState);

  const authContext = useContext(AuthContext);
  const authenticatedsupplier = authContext.supplier;

  // Get suppliers
  const getSuppliers = async () => {
    try {
      const res = await axios.get('/api/suppliers');
      dispatch({
        type: GET_SUPPLIERS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SUPPLIER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get supplier
  const getSupplier = async (_id) => {
    try {
      const res = await axios.get(`api/suppliers/${_id}`);
      dispatch({
        type: GET_SUPPLIER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SUPPLIER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // add suppliers
  const addSupplier = async (item, images) => {
    item.itemImages = images;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('api/suppliers', item, config);

      dispatch({ type: ADD_SUPPLIER, payload: res.data });
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
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
      await axios.post(`api/suppliers/image`, id_obj, config);
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
    }
  };

  // clear suppliers
  const clearSuppliers = () => {
    dispatch({ type: CLEAR_SUPPLIERS });
  };

  // Delete supplier
  const deleteSupplier = async (_id) => {
    try {
      await axios.delete(`api/suppliers/${_id}`);
      dispatch({
        type: DELETE_SUPPLIER,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
    }
  };

  // update supplier
  const updateSupplier = async (supplier) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `api/suppliers/${supplier._id}`,
        supplier,
        config
      );
      dispatch({
        type: UPDATE_SUPPLIER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
    }
  };

  // add To favourite
  const addToFavourite = async (supplier, item) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/suppliers/favourite/${supplier._id}`,
        JSON.stringify(item),
        config,
      );
      dispatch({
        type: UPDATE_CHART,
        payload: item,
      });
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
    }
  };

  // remove from Favourite
  const removeFavourite = async (supplierId, itemId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(
        `/api/suppliers/removefavourite/${supplierId}`,
        config,
      );
      dispatch({
        type: DELETE_CHART,
        payload: itemId,
      });
    } catch (error) {
      dispatch({ type: SUPPLIER_ERROR });
    }
  };

  // load supplier favourite on first run or refresh
  useEffect(() => {
    if (authenticatedsupplier && authenticatedsupplier.favourites) {
      dispatch({
        type: ADD_CHART,
        payload: authenticatedsupplier.favourites,
      });
    }
  }, [authenticatedsupplier]);

  // set current
  const setCurrent = (item) => {
    dispatch({ type: SET_CURRENT, payload: item });
  };

  // set current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter item
  const filterSuppliers = (text) => {
    dispatch({ type: FILTER_SUPPLIERS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <supplierContext.Provider
      value={{
        suppliers: state.suppliers,
        supplier: state.supplier,
        favourites: state.favourites,
        current: state.current,
        filtered: state.filtered,
        getSuppliers,
        getSupplier,
        addSupplier,
        addToFavourite,
        removeFavourite,
        clearSuppliers,
        deleteSupplier,
        removeImage,
        setCurrent,
        clearCurrent,
        updateSupplier,
        filterSuppliers,
        clearFilter,
      }}
    >
      {props.children}
    </supplierContext.Provider>
  );
};

export default SupplierState;
