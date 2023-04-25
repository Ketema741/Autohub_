import {
  GET_POSTS,
  GET_POSTDETAILS,
  GET_RECENTPOSTS,
  GET_CATEGORIES,
  GET_SIMILARPOSTS,
  GET_ADJACENTPOSTS,
  GET_CATEGORYPOST,
  GET_FEATUREDPOSTS,
  GET_COMMENTS,
  SUBMITCOMMENT,
  POST_ERROR,
} from '../Types';

const blogReducer = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    
    case GET_POSTDETAILS:
      return {
        ...state,
        post: action.payload,
      };
    
    
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default blogReducer;
