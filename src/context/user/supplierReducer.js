import {
  GET_SUPPLIERS,
  GET_SUPPLIER,
  ADD_SUPPLIER,
  ADD_CHART,
  UPDATE_CHART,
  DELETE_CHART,
  DELETE_SUPPLIER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_SUPPLIER,
  FILTER_SUPPLIERS,
  CLEAR_SUPPLIERS,
  CLEAR_FILTER,
  SUPPLIER_ERROR,
} from '../Types';

const supplierReducer = (state, action) => {
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };

    case GET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        suppliers: [action.payload, ...state.suppliers],
      };

    case UPDATE_SUPPLIER:
      return {
        ...state,
        supplier: action.payload,
      };
    case ADD_CHART:
      return {
        ...state,
        favourites: [...action.payload],
      };
    case UPDATE_CHART:
      return {
        ...state,
        favourites: [action.payload, ...state.favourites],
      };
    case DELETE_CHART:
      return {
        ...state,
        favourites: state.favourites.filter(
          (favourite) => favourite._id !== action.payload,
        ),
      };
    case DELETE_SUPPLIER:
      return {
        ...state,
        suppliers: state.suppliers.filter(
          (supplier) => supplier._id !== action.payload,
        ),
      };
    case CLEAR_SUPPLIERS:
      return {
        ...state,
        suppliers: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_SUPPLIERS:
      return {
        ...state,
        filtered: state.suppliers.filter(({ name, location }) => {
          const testString = `${name}${location}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case SUPPLIER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default supplierReducer;
