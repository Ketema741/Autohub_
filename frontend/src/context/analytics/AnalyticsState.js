import React, { useReducer } from 'react';
import axios from '../axiosConfig';
import analyticsContext from './analyticsContext';
import analyticsReducer from './analyticsReducer';

import {
  GET_CUSTOMERBYLOCATION,
  ITEM_ERROR,

} from '../Types';

const AnalyticsState = (props) => {
  const initialState = {
    customersByLocation: [],
    cars: [],
    car:null,
    publicItems: null,
    item: null,
    error: null,
    current: null,
    filtered: null,
    categories: null
  };

  const [state, dispatch] = useReducer(analyticsReducer, initialState);

  // Get supplier items
  const getCustomerByLocation = async () => {
    try {
      const res = await axios.get('analytics/customers/by/location');
      dispatch({
        type: GET_CUSTOMERBYLOCATION,
        payload: res.data.addresses,
      });
    } catch (err) {
      dispatch({
        type: ITEM_ERROR,
        payload: err.response.msg,
      });
    }
  };



  
  return (
    <analyticsContext.Provider
      value={{
        customersByLocation: state.customersByLocation,
        cars: state.cars,
        car: state.car,
        publicItems: state.publicItems,
        categories: state.categories,
        item: state.item,
        current: state.current,
        filtered: state.filtered,

        getCustomerByLocation,
        

      }}
    >
      {props.children}
    </analyticsContext.Provider>
  );
};

export default AnalyticsState;
