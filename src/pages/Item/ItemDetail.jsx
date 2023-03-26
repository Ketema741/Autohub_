import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import ItemOverview from './ItemOverview';

const ItemDetail = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
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
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
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
          {themeSettings && <ThemeSettings />}
          <ItemOverview />
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Property</th>
                      <th className="px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border px-4 py-2">Brand</td>
                      <td className="border px-4 py-2">
                        The brand or manufacturer of the item
                      </td>
                    </tr>
                    <tr className="bg-gray">
                      <td className="border px-4 py-2">Model</td>
                      <td className="border px-4 py-2">
                        The model of the item
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border px-4 py-2">Type</td>
                      <td className="border px-4 py-2">
                        The type of the item (e.g. SUV, sedan, truck, etc.)
                      </td>
                    </tr>
                    <tr className="bg-gray">
                      <td className="border px-4 py-2">Year</td>
                      <td className="border px-4 py-2">
                        The year the item was manufactured
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border px-4 py-2">Color</td>
                      <td className="border px-4 py-2">
                        The color of the item
                      </td>
                    </tr>
                    <tr className="bg-gray">
                      <td className="border px-4 py-2">Price</td>
                      <td className="border px-4 py-2">
                        The price of the item
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border px-4 py-2">Description</td>
                      <td className="border px-4 py-2">
                        A detailed description of the item
                      </td>
                    </tr>
                    <tr className="bg-gray">
                      <td className="border px-4 py-2">Availability</td>
                      <td className="border px-4 py-2">
                        Whether the item is currently available for purchase or
                        not
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
