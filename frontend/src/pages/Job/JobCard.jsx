import React, { useContext } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import JobContext from "../../context/job/jobContext";


const JobCard = ({ job }) => {
  const jobContext = useContext(JobContext)
  const { getJob } = jobContext
  const navigate = useNavigate();

  const handleView = () => {
    getJob(job._id)
    navigate(`/job/${"job._id"}`);
  };

  return (

    <div className="lg:col-span-3">
      <div className="space-y-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none bg-white dark:bg-gray-800 px-8 py-12  sm:px-12 lg:px-8">
        <img
          src="https://res.cloudinary.com/dmegiw31y/image/upload/v1681974584/careerNet/web_dev_nsbfd7.png"
          alt="illustration"
          loading="lazy"
          width="900"
          height="600"
        />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {job.title}
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {job.description}
        </p>
        <button
          onClick={() => handleView()}
          type="button"
          className="block font-medium text-primary"
        >
          Know more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
