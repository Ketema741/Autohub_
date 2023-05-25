import React, { useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import '../../App.css'

import { Navbar, Footer, SupplierSidebar } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { suppliersData, suppliersGrid } from './dummy';
import { Header } from '../../components';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor } = useStateContext();

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
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <SupplierSidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <SupplierSidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <Header category="" title="List Of Suppliers" />
              <GridComponent
                dataSource={suppliersData}
                enableHover={false}
                allowPaging
                pageSettings={{ pageCount: 5 }}
                selectionSettings={selectionsettings}
                toolbar={toolbarOptions}
                editSettings={editing}
                allowSorting
              >
                <ColumnsDirective>
                  {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                  {suppliersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
              </GridComponent>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>


  );
};

export default Customers;