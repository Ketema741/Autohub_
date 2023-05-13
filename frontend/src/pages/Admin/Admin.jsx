import React, { useEffect } from 'react';

import {
  AdminNavbar,
  Footer,
  AdminSidebar,

} from '../../components';


import { useStateContext } from '../../context/ContextProvider';
import AdminContent from './AdminContent';

import Suppliers from './Suppliers/Suppliers';
import Drivers from './Drivers/Drivers';
import ServiceProviders from './ServiceProviders/ServiceProviders';
import Orders from './Orders/Orders';
import Experts from './Experts/Experts';
import Jobs from './Jobs/Jobs';

const Admin = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    handleClick("adminBoard");
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">

        {activeMenu ? (
          <div className="w-58 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <AdminSidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <AdminSidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-56 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <AdminNavbar />

          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          </div>
          <div>
            {isClicked.suppliers && <Suppliers />}
            {isClicked.drivers && <Drivers />}
            {isClicked.serviceProviders && <ServiceProviders />}
            {isClicked.experts && <Experts />}
            {isClicked.jobs && <Jobs />}
            {isClicked.orders && <Orders />}

            {!isClicked.suppliers && !isClicked.drivers && !isClicked.serviceProviders && !isClicked.experts && !isClicked.jobs && !isClicked.orders && <AdminContent />}

          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Admin;
