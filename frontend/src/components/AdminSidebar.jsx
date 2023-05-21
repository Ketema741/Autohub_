import React from 'react';
import { Link } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { FaUser } from 'react-icons/fa';
import { BiGridAlt, BiBookOpen, BiHomeAlt } from 'react-icons/bi';
import { MdOutlineCancel, MdOutlineWork } from 'react-icons/md';
import { BsCurrencyExchange } from 'react-icons/bs';
import { GrServices } from 'react-icons/gr';
import { AiFillCar, AiOutlineShoppingCart } from 'react-icons/ai';

import Logo from '../data/logo.svg'
import avatat from '../data/avatar.jpg'
import { useStateContext } from '../context/ContextProvider';



const AdminSidebar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link type="button"
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img className="mt-6   rounded-xl" src={Logo} alt="logo AutoHub" style={{ height: "140px", width: "140px" }} />
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-4">
            <div className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-2 pb-3 transition duration-300 md:w-4/16 lg:ml-0 lg:w-[20%] xl:w-[15%] 2xl:w-[10%] dark:bg-gray-800 dark:border-gray-700">
              <div>
                <div className="mt-8 text-center">
                  <img src={avatat} alt="" className="m-auto h-10 w-10 rounded-full object-cover lg:h-28 lg:w-28" />
                  <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">Ketema G.</h5>
                  <span className="hidden text-gray-400 lg:block">Admin</span>
                </div>
                <div className="border border-gray-300 my-4"></div>
                <ul className="mt-8 space-y-2 tracking-wide">
                  <li>
                    <button type="button" onClick={() => handleClick("adminBoard")} aria-label="dashboard" className="relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white">
                      <BiGridAlt className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Dashboard</span>
                    </button>
                  </li>
                  {/* <li>
                    <Link to="/" className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <BiHomeAlt className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">Home</span>
                    </Link>
                  </li> */}
                  <li>

                    <button type="button" onClick={() => handleClick("suppliers")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <BsCurrencyExchange className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Suppliers</span>
                    </button>
                  </li>

                  <li>
                    <button type="button" onClick={() => handleClick("serviceProviders")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <GrServices className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Service Providers</span>
                    </button>
                  </li>

                  <li>
                    <button type="button" onClick={() => handleClick("drivers")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <AiFillCar className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Drivers</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => handleClick("jobs")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <MdOutlineWork className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Jobs</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => handleClick("orders")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <AiOutlineShoppingCart className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="-mr-1 font-medium">Orders</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => handleClick("experts")} className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300">
                      <BiBookOpen className="h-5 w-5 fill-current text-gray-600 group-hover:text-cyan-600 dark:group-hover:text-sky-400" />
                      <span className="group-hover:text-gray-700 dark:group-hover:text-gray-50">Expert</span>
                    </button>
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </>
      )
      }
    </div>
  );
};

export default AdminSidebar;
