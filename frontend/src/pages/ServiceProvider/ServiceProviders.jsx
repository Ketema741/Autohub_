import React, { useContext, useEffect } from 'react';

import { Navbar, Footer, Sidebar } from '../../components';
import ServiceProviderCard from './ServiceProviderCard';
import { useStateContext } from '../../context/ContextProvider';
import Header from './Header'
import UserContext from '../../context/user/userContext';

const ServiceProviders = () => {
  const userContext = useContext(UserContext)
  const { getUsers, serviceProviders, filteredServiceProviders } = userContext

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
  } = useStateContext();

  useEffect(() => {
    getUsers("service-providers")

  }, [])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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
          <Header />
          <div className="relative py-16">
            <div className="container relative m-auto px-6 text-gray-500 md:px-12">
              {serviceProviders !== null ? (
                <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
                  {
                    filteredServiceProviders !== null ?
                      filteredServiceProviders.map(serviceProvider => (
                        <ServiceProviderCard key={serviceProvider._id} serviceProvider={serviceProvider} />
                      ))
                      :
                      serviceProviders.map(serviceProvider => (
                        <ServiceProviderCard key={serviceProvider._id} serviceProvider={serviceProvider} />
                      ))
                  }
                </div>
              )
                : <div>loading...</div>
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ServiceProviders;
