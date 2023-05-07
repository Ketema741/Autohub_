import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  ADD_CHART,
  UPDATE_CHART,
  DELETE_CHART,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  FILTER_USER,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
} from '../Types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
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
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user) => user._id !== action.payload,
        ),
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
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
    case FILTER_USER:
      return {
        ...state,
        filtered: state.users.filter(({ name, location }) => {
          const testString = `${name}${location}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default userReducer;
