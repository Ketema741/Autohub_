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
  UPDATE_BLOG,
  GET_AUTHORPOSTS,
  POST_BLOG,
  DELETE_BLOG,
  GET_RELATEDPOSTS
} from '../Types';

const Blogstate = (props) => {
  const initialState = {
    blogs: [],
    privateBlogs: [],
    relatedPost: null,
    blog: null,
    current: null,
    filtered: null,
    relatedBlogs: null,
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
  const postBlog = async (blog) => {
    try {
      const blogPostPromise = new Promise((resolve, reject) => {
        const res = axios.post("blogs/add/blog", blog)
          .then((res) => {
            dispatch({
              type: POST_BLOG,
              payload: res.data,
            });
            console.log(res)

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: POST_ERROR,
              payload: err.response.data.message,
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
  const updateBlog = async (blog, id) => {
    try {
      const blogUpdatePromise = new Promise((resolve, reject) => {
        const res = axios.put(`blogs/update/blog/${id}`, blog)
          .then((res) => {
            dispatch({
              type: UPDATE_BLOG,
              payload: res.data,
            });
            console.log(res)

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: POST_ERROR,
              payload: err.response.data.message,
            });
            console.log(err)
            reject(err);
          });
        console.log(res)
      });

      toast.promise(blogUpdatePromise, {
        pending: 'Updating...',
        success: 'Blog updated successfully!',
        error: `Blog Update failed: ${state.error ? state.error : " try again later!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };


  // Delete blogs
  const deleteBlog = async (id) => {
    try {
      const deletePostPromise = new Promise((resolve, reject) => {
        const res = axios.delete(`blogs/delete/blog/${id}`)
          .then((res) => {
            dispatch({
              type: DELETE_BLOG,
              payload: id,
            });
            console.log(res)

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: POST_ERROR,
              payload: err.response.data.message,
            });
            console.log(err)
            reject(err);
          });
        console.log(res)
      });

      toast.promise(deletePostPromise, {
        pending: 'Deleting...',
        success: 'Blog deleted successfully!',
        error: `Blog deleting failed: ${state.error ? state.error : " try again later!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error}`);
    }
  };


  // Get blog
  const getBlog = async (_id, category) => {
    getRelatedBlogs(category)
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

  // filter blogs
  const getRelatedBlogs = (text) => {
    dispatch({ type: GET_RELATEDPOSTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <blogContext.Provider
      value={{
        blogs: state.blogs,
        relatedBlogs: state.relatedBlogs,
        privateBlogs: state.privateBlogs,
        blog: state.blog,
        current: state.current,
        filtered: state.filtered,

        getBlogs,
        getPrivateBlogs,
        postBlog,
        deleteBlog,
        getBlog,
        updateBlog,
        clearPosts,
        setCurrent,
        clearCurrent,
        filterBlogs,
        getRelatedBlogs,
        clearFilter,
      }}
    >
      {props.children}
    </blogContext.Provider>
  );
};

export default Blogstate;
