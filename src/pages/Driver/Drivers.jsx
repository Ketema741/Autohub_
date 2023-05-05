import React, { useEffect } from 'react';
import { FiSettings, FiSearch } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  Navbar,
  Footer,
  Sidebar,
} from '../../components';
import { DriverCard } from '../index';
import { useStateContext } from '../../context/ContextProvider';


const Drivers = () => {
  const drivers = [
    {
      name: 'John Doe',
      vehicle: 'Toyota Camry',
      experience: 5,
      phone: '555-555-5555',
      address: '123 Main St, Anytown USA',
      imageUrl: '../../data/avatar4.jpg',
    },
    {
      name: 'Jane Smith',
      vehicle: 'Honda Civic',
      experience: 3,
      phone: '555-555-5555',
      address: '456 Main St, Anytown USA',
      imageUrl: '../../data/avatar4.jpg',
    },
  ];

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">


        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
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
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
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
                            placeholder="Search Drivers "
                            type="search"
                            className="block pt-2 pr-0 pb-2 pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* {drivers.map((driver) => ( */}
                  {/* <DriverCard key={driver.name} {...driver} /> */}
                  <DriverCard />
                  {/* ))} */}
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
