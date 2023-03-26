import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  AboutUs,
  Home,
  Jobs,
  Blogs,
  BlogDetail,
  Drivers,
  Supplier,
  ItemDetail,
  ServiceProviders,
  Ecommerce,
  Orders,
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

  return (
    <BrowserRouter>
      <Routes>
        {/* dashboard  */}
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Ecommerce />} />

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
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/serviceproviders" element={<ServiceProviders />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Item-detail" element={<ItemDetail />} />
        <Route path="/blog-detail" element={<BlogDetail />} />
        {/* <Route path="/faq" element={<FAQ />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
