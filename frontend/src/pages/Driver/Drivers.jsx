import React, { useEffect, useContext, useRef, Fragment } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  Navbar,
  Footer,
  Sidebar,
} from '../../components';
import { DriverCard } from '../index';
import { useStateContext } from '../../context/ContextProvider';

import UserContext from '../../context/user/userContext';

const Drivers = () => {


  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
  } = useStateContext();

  const userContext = useContext(UserContext);
  const { getUsers, drivers, filteredDrivers, filterUsers, clearFilter } = userContext;

  useEffect(() => {
    getUsers("drivers")
  }, [])

  useEffect(() => {
    console.log(drivers)
  }, [drivers])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const text = useRef('')

  useEffect(() => {
    if (filteredDrivers == null) {
      text.current.value = ''
    }
  })


  const onChange = (e) => {
    if (e.target.value !== '') {
      filterUsers(e.target.value, "drivers");
    } else {
      clearFilter();
    }
  };
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
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
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div></div>
          <div className="mt-24 container px-5 mx-auto">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div className="py-20">
                <div className="container mx-auto px-6 text-center md:px-12">
                  <div className="mb-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                      <div>
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                          Vehicle Drivers
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-8/12">
                          Please find below a list of drivers whom you can contact if you are interested in hiring them.
                        </p>
                      </div>

                      <div className="mt-4 mr-0 mb-0 ml-0 sm:mt-0">
                        <p className="sr-only">Search Drivers</p>
                        <div className="relative">
                          <div className="flex items-center pt-0 pr-0 pb-0 pl-3 absolute inset-y-0 left-0 pointer-events-none">
                            <p>
                              <FiSearch className="w-5 h-5 text-gray-400" />
                            </p>
                          </div>
                          <input
                            placeholder="Search... "
                            type="text"
                            ref={text}
                            onChange={onChange}
                            className="block  pt-3 pr-0 pb-3 pl-24 lg:mx-auto lg:w-full py-3 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {drivers !== null ? (
                    <div className="grid gap-28 py-20 md:grid-cols-3 md:gap-12">
                      {
                        filteredDrivers !== null ?
                          filteredDrivers.map(driver => (
                            <DriverCard key={driver._id} driver={driver} />
                          ))
                          :
                          drivers.map(driver => (
                            <DriverCard key={driver._id} driver={driver} />
                          ))
                      }
                    </div>
                  )
                    : <div>loading...</div>
                  }

                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Drivers;
