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

  Drivers,

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

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clghli57o1ujs01t3066xd2lw/master",
  cache: new InMemoryCache()
});

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
    <ApolloProvider client={client}>
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
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/serviceproviders" element={<ServiceProviders />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/item-detail" element={<ItemDetail />} />
                    <Route path="/blog-detail" element={<BlogDetail />} />
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
    </ApolloProvider>
  );
};

export default App;
