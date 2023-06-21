import React, { useReducer } from 'react';
import axios from '../axiosConfig';
import jobContext from './jobContext';
import jobReducer from './jobReducer';
import { toast } from 'react-toastify'

import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  DELETE_JOB,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOB,
  FILTER_JOBS,
  CLEAR_JOBS,
  CLEAR_FILTER,
  JOB_ERROR,
} from '../Types';

const JobState = (props) => {
  const initialState = {
    jobs: [],
    job: null,
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get jobs
  const getJobs = async () => {
    try {
      const res = await axios.get('/jobs');
      dispatch({
        type: GET_JOBS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get job
  const getJob = async (_id) => {
    try {
      const res = await axios.get(`/jobs/${_id}`);
      console.log(res.data);
      dispatch({
        type: GET_JOB,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get job
  const applyForJob = async (_id, driver) => {
    try {
      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post(`/jobs/job/apply/${_id}`, driver)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: JOB_ERROR,
              payload: err.response,
            });
            console.log(err)
            reject(err);
          });
      });

      toast.promise(registrationPromise, {
        pending: 'Appling...',
        success: 'Application successful! You will receive an email once your application accepted. Thank you!',
        error: `Job Application failed Try again Later or Contact Admin through Email!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error.error}`);
    }
  };

  // Add job
  const addJob = async (job) => {
    try {
      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post('/jobs/post-job', job)
          .then((res) => {
            dispatch({
              type: ADD_JOB,
              payload: res.data
            });

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: JOB_ERROR,
              payload: err.message
            });

            reject(err);
          });
      });

      toast.promise(registrationPromise, {
        pending: 'Posting...',
        success: 'Job posted successfully! ',
        error: `Job Posting failed Try again!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error.error}`);
    }


  };
  // Add job
  const acceptJobApplicant = async (id, driver) => {
    try {
      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post(`/jobs/job/acceptence/${id}`, driver)
          .then((res) => {

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: JOB_ERROR,
              payload: err.response.data
            });
            console.log(err)

            reject(err);
          });
      });

      toast.promise(registrationPromise, {
        pending: 'Accepting...',
        success: 'Applicant accepted successfully! ',
        error: `Applicant Accepting  failed Try again!`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error.error}`);
    }


  };

  // Remove image
  const removeImage = async (public_id) => {
    const id_obj = {
      public_id: public_id,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`/jobs/image`, id_obj, config);
    } catch (error) {
      dispatch({ type: JOB_ERROR });
    }
  };

  // Clear jobs
  const clearJobs = () => {
    dispatch({ type: CLEAR_JOBS });
  };

  // Delete job
  const deleteJob = async (_id) => {
    try {
      await axios.delete(`/jobs/${_id}`);
      dispatch({
        type: DELETE_JOB,
        payload: _id,
      });
    } catch (error) {
      dispatch({ type: JOB_ERROR });
    }
  };

  // Update job
  const updateJob = async (job) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/jobs/${job._id}`, job, config);
      dispatch({
        type: UPDATE_JOB,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: JOB_ERROR });
    }
  };

  // Set current job
  const setCurrent = (job) => {
    dispatch({ type: SET_CURRENT, payload: job });
  };

  // Clear current job
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter jobs
  const filterJobs = (text) => {
    dispatch({ type: FILTER_JOBS, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <jobContext.Provider
      value={{
        jobs: state.jobs,
        job: state.job,
        current: state.current,
        filtered: state.filtered,
        getJobs,
        getJob,
        addJob,
        applyForJob,
        acceptJobApplicant,
        clearJobs,
        deleteJob,
        removeImage,
        setCurrent,
        clearCurrent,
        updateJob,
        filterJobs,
        clearFilter,
      }}
    >
      {props.children}
    </jobContext.Provider>
  );
};

export default JobState;
