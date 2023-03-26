import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from '../../components';
import { DriverCard } from '../index';
import { useStateContext } from '../../context/ContextProvider';

// import {
//   GridComponent,
//   ColumnsDirective,
//   ColumnDirective,
//   Resize,
//   Sort,
//   ContextMenu,
//   Filter,
//   Page,
//   ExcelExport,
//   PdfExport,
//   Edit,
//   Inject,
// } from '@syncfusion/ej2-react-grids';
// import { ordersData, contextMenuItems, ordersGrid } from '../../data/dummy';

const Drivers = () => {
  const drivers = [
    {
      name: "John Doe",
      vehicle: "Toyota Camry",
      experience: 5,
      phone: "555-555-5555",
      address: "123 Main St, Anytown USA",
      imageUrl: "../../data/avatar4.jpg",
    },
    {
      name: "Jane Smith",
      vehicle: "Honda Civic",
      experience: 3,
      phone: "555-555-5555",
      address: "456 Main St, Anytown USA",
      imageUrl: "../../data/avatar4.jpg",
    },
  ];

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
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
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
          <div></div>
          <div className="mt-24 container px-5 mx-auto">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              {drivers.map((driver) => (
                <DriverCard key={driver.name} {...driver} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Drivers;
