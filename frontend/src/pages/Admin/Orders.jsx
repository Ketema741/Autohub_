import React, { useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids';
import { FiSettings } from 'react-icons/fi';

import {
  Header,
  Navbar,
  Footer,
  SupplierSidebar,
  
} from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { ordersData, contextMenuItems, ordersGrid } from '../../data/dummy';

const Orders = () => {
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
          
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Orders" />
            <GridComponent
              id="gridcomp"
              dataSource={ordersData}
              allowPaging
              allowSorting
              allowExcelExport
              allowPdfExport
              contextMenuItems={contextMenuItems}
              editSettings={editing}
            >
              <ColumnsDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {ordersGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>
              <Inject
                services={[
                  Resize,
                  Sort,
                  ContextMenu,
                  Filter,
                  Page,
                  ExcelExport,
                  Edit,
                  PdfExport,
                ]}
              />
            </GridComponent>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Orders;
