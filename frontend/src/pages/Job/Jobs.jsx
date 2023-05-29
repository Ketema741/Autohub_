import React, { useEffect, useState, useContext } from 'react';
import { FiX } from 'react-icons/fi';

import JobCard from './JobCard';
import Header from './Header'
import { Navbar, Footer, Sidebar } from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import JobContext from '../../context/job/jobContext';


const Jobs = () => {

  const jobContext = useContext(JobContext)
  const { getJobs, jobs, filtered } = jobContext;

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  useEffect(() => {
    getJobs()
  }, [])
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">

        {activeMenu ? (
          <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <Header />
          <div className="py-16">
            <div className="container m-auto text-gray-500 md:px-12 xl:px-0">
              {jobs !== null ? (
                <div className="grid gap-10 lg:grid-cols-6 px-16">
                  {filtered !== null ?
                    filtered.map((job) => (
                      <JobCard key={job._id} job={job} isOpen={isOpen} togglePopup={togglePopup} />
                    ))
                    :
                    jobs.map((job) => (
                      <JobCard key={job._id} job={job} isOpen={isOpen} togglePopup={togglePopup} />
                    ))
                  }
                </div>
              )
                :
                <div>loading...</div>
              }
            </div>
          </div>

          <div className="mt-24 container px-5 mx-auto">
            {isOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="absolute w-full h-full bg-gray-900 opacity-50" />
                <div className="relative bg-white w-1/2 p-6 rounded-lg">
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="absolute top-0 right-0 mt-4 mr-4"
                  >
                    <FiX className="h-6 w-6 fill-current text-gray-600" />
                  </button>

                  <h2 className="text-2xl font-bold mb-4">
                    Apply for Driver Position
                  </h2>

                  {step === 1 && (
                    <form onSubmit={handleNext}>
                      <h2 className="text-xl font-semibold mb-2">
                        Step 1: Personal Information
                      </h2>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="w-full border border-gray-400 p-2 rounded-md"
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="w-full border border-gray-400 p-2 rounded-md"
                          type="email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          className="w-full border border-gray-400 p-2 rounded-md"
                          type="tel"
                          id="phone"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Next
                      </button>
                    </form>
                  )}
                  {step === 2 && (
                    <form onSubmit={handleSubmit}>
                      <h2 className="text-xl font-semibold mb-2">
                        Step 2: Resume Link
                      </h2>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 font-semibold mb-2"
                          htmlFor="resumeLink"
                        >
                          Resume Link
                        </label>
                        <input
                          className="w-full border border-gray-400 p-2 rounded-md"
                          type="text"
                          id="resumeLink"
                          name="resumeLink"
                          value={resumeLink}
                          onChange={(e) => setResumeLink(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                          onClick={handlePrev}
                        >
                          Previous
                        </button>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Jobs;
