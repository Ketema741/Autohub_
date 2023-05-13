import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 } from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../Types";

const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  //  set alert
  const setAlert = (msg, type, timeout = 3000) => {
    const id = v4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
