import {
  GET_CONVERSATIONS,
  MESSAGE_ERROR,
  GET_MESSAGES,
  GET_MESSAGE,
  GET_USERS,
  SEND_MESSAGE,
  SET_CHAT,
  SET_ARRIVAL_MESSAGE,
} from '../Types';


//   ADD_USER,

const chatReducer = (state, action) => {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
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
      case MESSAGE_ERROR:
        return {
          ...state,
          error: action.payload,
        };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default chatReducer;