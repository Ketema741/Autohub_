import React, { useEffect, useContext } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Navbar,
  Footer,
  Sidebar,
} from '../../components';

import { useStateContext } from '../../context/ContextProvider';
import ItemTable from './ItemTable'
import ItemContext from '../../context/item/itemContext';
import AuthContext from '../../context/auth/authContext';


const Supplier = () => {
  const itemContext = useContext(ItemContext)
  const authContext = useContext(AuthContext)

  const {
    getCategories,
    supplierItems,
    getPrivateItems
  } = itemContext;

  const { user } = authContext;


  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
  } = useStateContext();

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getPrivateItems(user?._id);
  }, [supplierItems])

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">

        {activeMenu ? (
          <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white overflow-hidden ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg overflow-hidden">
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
          <div>

            {supplierItems &&
              <ItemTable  />
            }

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

export default Supplier;
