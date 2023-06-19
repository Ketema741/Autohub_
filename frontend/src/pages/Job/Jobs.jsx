import React, { useEffect, useState, useContext } from 'react';
import { FiX } from 'react-icons/fi';

import JobCard from './JobCard';
import Header from './Header'
import { Navbar, Footer, Sidebar } from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import JobContext from '../../context/job/jobContext';
import Loading from './Loading'

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

  const RenderLoadings = () => {
    const loadings = [];

    for (let i = 0; i < 10; i++) {
      loadings.push(<Loading key={i} />);
    }

    return loadings;
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
                <div className="grid gap-10 lg:grid-cols-6 px-16">
                  <RenderLoadings />
                </div>
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Jobs;
