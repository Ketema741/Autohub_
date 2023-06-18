import React, { useEffect, useContext } from "react";

import { Navbar, Footer, Sidebar } from "../../components";
import { useStateContext } from "../../context/ContextProvider";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobContext from '../../context/job/jobContext';

import { SiBookstack } from "react-icons/si";
import Blog from "../../assets/undraw_job_offers_re_634p.svg";
import JobDetailCard from './JobDetailCard'
const Parse = require("html-react-parser");

const JobDetail = () => {

    const { setCurrentColor, setCurrentMode, currentMode, activeMenu } =
        useStateContext();

    const jobContext = useContext(JobContext);
    const { job } = jobContext;

    useEffect(() => {
        const currentThemeColor = localStorage.getItem("colorMode");
        const currentThemeMode = localStorage.getItem("themeMode");
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div className={currentMode === "Dark" ? "dark" : ""}>
            <div className="flex relative   dark:bg-main-dark-bg">
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
                            ? "dark:bg-main-dark-bg min-h-screen md:ml-52 w-full  "
                            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>
                    <div className="mt-4  container mx-auto">
                        {/* demo shit */}
                        {job != null ? (
                            <div className="overflow-hidden">
                                <div className="overflow-hidden bg-main-bg relative pt-16 pb-4 lg:pt-24 dark:bg-gray-900">
                                    <div className="mx-8 relative xl:container m-auto px-6 md:px-12 lg:px-6">
                                        <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-3xl text-center sm:text-4xl md:text-5xl lg:w-auto lg:text-left xl:text-6xl dark:text-white">
                                            {job.title}
                                            <span className="lg:block hidden"></span>

                                            <span className="relative text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                                                Job Detail Description!
                                            </span>
                                        </h1>
                                        <JobDetailCard job={job} />
                                    </div>
                                </div>
                            </div>

                        ) : (<div>Loading...</div>
                        )}
                        <div className="px-2 max-w-lg mx-auto my-8"></div>
                    </div>
                    <Footer />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};
export default JobDetail;
