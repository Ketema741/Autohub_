import React, { useEffect, useContext } from 'react';

import {
  AdminNavbar,
  Footer,
  AdminSidebar,

} from '../../components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useStateContext } from '../../context/ContextProvider';
import AdminContent from './AdminContent';

import Suppliers from './Suppliers/Suppliers';
import Drivers from './Drivers/Drivers';
import ServiceProviders from './ServiceProviders/ServiceProviders';
import Orders from './Orders/Orders';
import Experts from './Experts/Experts';
import Jobs from './Jobs/Jobs';
import UserContext from '../../context/user/userContext';
import AnalyticsContext from '../../context/analytics/analyticsContext';

const Admin = () => {
  const userContext = useContext(UserContext);
  const analyticsContext = useContext(AnalyticsContext);

  const { getCustomerByLocation, customersByLocation } = analyticsContext;
  const { customerOrders, getCustomerOrders, verifyPayment, isPaymentVerified } = userContext

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    handleClick,
    isClicked,
  } = useStateContext();


  useEffect(() => {
    getCustomerOrders();
    getCustomerByLocation();
  }, [])


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
          <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full overflow-hidden '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 overflow-hidden'
          }
        >
          <AdminNavbar />

          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          </div>
          <div>
            {(!isClicked.suppliers && !isClicked.drivers && !isClicked.serviceProviders && !isClicked.experts && !isClicked.jobs && !isClicked.orders) &&
              <AdminContent customersByLocation={customersByLocation} />
            }
            {isClicked.suppliers && <Suppliers />}
            {isClicked.drivers && <Drivers />}
            {isClicked.serviceProviders && <ServiceProviders />}
            {isClicked.experts && <Experts />}
            {isClicked.jobs && <Jobs />}
            {isClicked.orders && <Orders customerOrders={customerOrders} verifyPayment={verifyPayment} isPaymentVerified={isPaymentVerified} />}


          </div>
          <Footer />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
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

export default Admin;
