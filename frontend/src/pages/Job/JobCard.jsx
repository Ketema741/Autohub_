import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import JobContext from '../../context/job/jobContext';
const Parse = require('html-react-parser')


const JobCard = ({ job }) => {
  const jobContext = useContext(JobContext)
  const { getJob } = jobContext
  const navigate = useNavigate();

  const handleView = () => {
    getJob(job._id)
    navigate(`/job/${job._id}`);
  };

  let jobImage = "https://res.cloudinary.com/dirocp1ht/image/upload/v1687035930/xbcsqwza62jvioajhf7j.svg"
  if (job.jobImages && job.jobImages.length > 0) {
    jobImage = job.jobImages[0]
  }

  return (

    <div className="lg:col-span-3">
      <div className="space-y-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none bg-white dark:bg-gray-800 px-8 py-12  sm:px-12 lg:px-8">
        <img
          src={jobImage}
          alt="illustration"
          loading="lazy"
          width="900"
          height="600"
          className="transition duration-500 hover:scale-105"
        />
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {job.title}
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          {Parse(job.description)}
        </p>
        <button
          onClick={handleView}
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
