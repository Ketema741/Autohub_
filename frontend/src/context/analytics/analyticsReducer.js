import {
  GET_CUSTOMERBYLOCATION,
} from '../Types';

const analyticsReducer = (state, action) => {
  switch (action.type) {
    case GET_CUSTOMERBYLOCATION:
      return {
        ...state,
        customersByLocation: action.payload,
      };
    
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default analyticsReducer;
