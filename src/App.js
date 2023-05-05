import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SupplierAuthState from './context/supplierAuth/AuthState';
import AlertState from './context/alert/AlertState';
import SupplierState from './context/supplier/SupplierState';
import ItemState from './context/item/ItemState';
import BlogState from './context/blog/BlogState';

import {
  AboutUs,
  FAQ,
  Home,
  ItemDetail,

  Jobs,
  Chat,

  Blogs,
  BlogDetail,
  Posting,

  Drivers,
  DriverDetail,

  Supplier,
  EditItemDetail,
  AddItem,
  Orders,

  ServiceProviders,

  Login,
  Register,
  Profile,
  Employees,
  Customers,
  Line,
  Bar,
  Pie,
  Financial,
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
          <BlogState>
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


                  {/* charts  */}
                  <Route path="/line" element={<Line />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/financial" element={<Financial />} />

                  <Route path="/supplier" element={<Supplier />} />
                  <Route path="supplier/edit-item-detail" element={<EditItemDetail />} />
                  <Route path="supplier/add-item" element={<AddItem />} />

                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blog/:blogId" element={<BlogDetail />} />
                  <Route path="/blog-posting" element={<Posting />} />

                  <Route path="/drivers" element={<Drivers />} />
                  <Route path="/driver-detail/:id" element={<DriverDetail />} />
                  <Route path="/serviceproviders" element={<ServiceProviders />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/item-detail" element={<ItemDetail />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/chat" element={<Chat />} />
                </Routes>
              </Router>
            </AlertState>
          </BlogState>
        </ItemState>
      </SupplierState>
    </SupplierAuthState>
  );
};

export default App;
