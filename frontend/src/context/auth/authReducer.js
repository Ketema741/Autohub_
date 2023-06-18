import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  SET_CURRENT,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER,
  USER_ERROR,
} from '../Types';

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      if (action.payload.data) {
        return {
          ...state,
          isUserAuthenticated: true,
          userLoading: false,
          user: action.payload.data,
        };
      }
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isUserAuthenticated: true,
        userLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token:action.payload.token,
        isUserAuthenticated: true,
        userLoading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isUserAuthenticated: false,
        userLoading: false,
        user: null,
        error: action.payload,
      };

    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        updatedSuccessfully: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default authReducer;
