
import {
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  MESSAGE_ERROR,
  GET_MESSAGES,
  GET_MESSAGE,
  GET_USERS,
  SEND_MESSAGE,
  SET_CHAT,
  SET_ARRIVAL_MESSAGE,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  CLEAR_CURRENT,
} from '../Types';


//   ADD_USER,

const chatReducer = (state, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
    case GET_CONVERSATION:
      return {
        ...state,
        currentChat: action.payload,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case GET_MESSAGE:
      return {
        ...state,
        arrivalChat: action.payload
      };
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    
    case GET_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };
      case SET_CHAT:
        return {
          ...state,
          currentChat: action.payload,
        };
      case SET_ARRIVAL_MESSAGE:
        return {
          ...state,
          messages: [...state.messages, action.payload]
        };
      case CLEAR_CURRENT:
        return {
          ...state,
          messages: null,
          currentChat:null
        };
      case MESSAGE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case GET_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
        };
      case DELETE_NOTIFICATION:
        return {
          ...state,
          notifications: state.notifications.filter((notification) => notification._id !== action.payload),
        };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default chatReducer;