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

const itemReducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload,
        item: null,
      };
    case GET_PUBLICITEMS:
      return {
        ...state,
        publicItems: action.payload.data,
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        car: null,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case CLEAR_ITEMS:
      return {
        ...state,
        items: null,
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
    case FILTER_ITEMS:
      return {
        ...state,
        filtered: state.publicItems.filter(({ category, name }) => {
          const testString = `${category}${name}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default itemReducer;
