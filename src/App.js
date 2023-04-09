import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SupplierAuthState from './context/supplierAuth/AuthState';
import AlertState from './context/alert/AlertState';
import SupplierState from './context/supplier/SupplierState';
import ItemState from './context/item/ItemState';

import {
  AboutUs,
  Home,
  Jobs,
  Blogs,
  BlogDetail,
  Drivers,
  Supplier,
  EditItemDetail,
  ItemDetail,
  ServiceProviders,
  Orders,
  Login,
  Register,
  Profile,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  Editor,
} from './pages';

import { useStateContext } from './context/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <SupplierAuthState>
      <SupplierState>
        <ItemState>
          <AlertState>
            <Router>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

                <Route path="/supplier" element={<Supplier />} />
                <Route path="supplier/edit-item-detail" element={<EditItemDetail />} />

                <Route path="/jobs" element={<Jobs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route
                  path="/serviceproviders"
                  element={<ServiceProviders />}
                />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/item-detail" element={<ItemDetail />} />
                <Route path="/blog-detail" element={<BlogDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/faq" element={<FAQ />} /> */}
              </Routes>
            </Router>
          </AlertState>
        </ItemState>
      </SupplierState>
    </SupplierAuthState>
  );
};

export default App;
