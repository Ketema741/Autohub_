import React, { useReducer } from 'react';
import blogContext from './blogContext';
import blogReducer from './blogReducer';

import { useQuery, gql } from '@apollo/client';

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
import { assertNullableType } from 'graphql';




const BlogState = (props) => {
  const initialState = {
    posts: null,
    post: null,
    recentPost: null,
    categories: null,
    categorypost: null,
    similarposts: null,
    featuredposts: null,
    adjacentposts: null,
    comments: null,
    error: null

  };

  const [state, dispatch] = useReducer(blogReducer, initialState);



  const getPosts = () => {
    const { error, loading, data } = useQuery(query_POSTS);
    
    if (loading) {
      return;
    }
    
    if (error) {
      dispatch({
        type: POST_ERROR,
        payload: error,
      });
      return;
    }
    console.log(data.posts);

    dispatch({
      type: GET_POSTS,
      payload: 'data.posts',
    });    
  };

  return (
    <blogContext.Provider
      value={{
        posts: state.posts,
        getPosts,

      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};

export default BlogState;
