import React, { useReducer } from 'react';
import { toast } from 'react-toastify';

import axios from '../axiosConfig';
import blogContext from './blogContext';
import blogReducer from './blogReducer';

import {
  GET_POSTS,
  GET_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_POSTS,
  CLEAR_POSTS,
  CLEAR_FILTER,
  POST_ERROR,
  UPDATE_POST,
  GET_JOBS,
  GET_AUTHORPOSTS
} from '../Types';

const Blogstate = (props) => {
  const initialState = {
    blogs: null,
    jobs: [],
    privateBlogs: [],
    relatedPost: null,
    blog: null,
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(blogReducer, initialState);


  // Get private blogs
  const getPrivateBlogs = async () => {
    try {
      const res = await axios.get('/blogs/author/blogs');
      console.log(res)
      dispatch({
        type: GET_AUTHORPOSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
      console.log({ 'erro': err })
    }
  };

  // Get blogs
  const getBlogs = async () => {
    try {
      const res = await axios.get('/blogs');
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,

      });
      console.log({ 'erro': err })
    }
  };
  // Post blogs
  const postBlog = async ({blog}) => {
    try {
      const blogPostPromise = new Promise((resolve, reject) => {
        const res = axios.post("blogs/add/blog", blog)
          .then((res) => {
            dispatch({
              type: GET_POSTS,
              payload: res.data,
            });
            console.log(res)

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: POST_ERROR,
              payload: err.response.data,
            });
            console.log(err)
            reject(err);
          });
        console.log(res)
      });

      toast.promise(blogPostPromise, {
        pending: 'Posting...',
        success: 'Blog posted successfully!',
        error: `Blog post failed: ${state.error ? state.error : " try again later!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };

  // update blogs
  const updatePost = async () => {
    try {
      const res = await axios.put('/blogs');
      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,

      });
      console.log({ 'erro': err })
    }
  };



  // Get blog
  const getBlog = async (_id, category) => {
    filterBlogs(category)
    try {
      const res = await axios.get(`/blogs/blog/${_id}`);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };


  // get jobs
  const getJobs = (text) => {
    dispatch({ type: GET_JOBS, payload: text });
  };

  // clear posts
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS });
  };



  // set current
  const setCurrent = (blog) => {
    dispatch({ type: SET_CURRENT, payload: blog });
  };

  // set current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter blogs
  const filterBlogs = (text) => {
    dispatch({ type: FILTER_POSTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <blogContext.Provider
      value={{
        blogs: state.blogs,
        jobs: state.jobs,
        privateBlogs: state.privateBlogs,
        blog: state.blog,
        current: state.current,
        filtered: state.filtered,

        getBlogs,
        getPrivateBlogs,
        postBlog,
        getBlog,
        getJobs,
        updatePost,
        clearPosts,
        setCurrent,
        clearCurrent,
        filterBlogs,
        clearFilter,
      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};

export default Blogstate;
