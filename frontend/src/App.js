import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserAuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import UserState from './context/user/UserState';
import ItemState from './context/item/ItemState';
import BlogState from './context/blog/BlogState';
import ChatState from './context/chat/ChatState';
import JobState from './context/job/JobState'; // Import JobState

import {
  Home,
  Admin,
  Supplier,
  ItemDetail,
  CarDetail,
  EditItemDetail,
  AddItem,
  Jobs,
  JobDetail,
  Blogs,
  BlogDetail,
  Posting,
  Drivers,
  DriverDetail,
  ServiceProviders,
  ServiceProviderDetail,
  Chat,
  Login,
  Register,
  Profile,
  Employees,
  Customers,
  Line,
  Bar,
  Pie,
  Financial,
  AboutUs,
  FAQ,
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
    <UserAuthState>
      <UserState>
        <ChatState>
          <ItemState>
            <JobState> {/* Wrap the JobState component */}
              <BlogState>
                <AlertState>
                  <Router>
                    <Routes>
                      {/* dashboard  */}
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/admin-dashboard" element={<Admin />} />

                      <Route path="/item-detail" element={<ItemDetail />} />
                      <Route path="/car-detail" element={<CarDetail />} />
                      <Route path="/supplier-dashboard" element={<Supplier />} />
                      <Route path="/supplier/edit-item-detail" element={<EditItemDetail />} />
                      <Route path="/supplier/add-item" element={<AddItem />} />

                      {/* pages  */}
                      {/* <Route path="/orders" element={<Orders />} /> */}
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/customers" element={<Customers />} />

                      {/* charts  */}
                      <Route path="/line" element={<Line />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/financial" element={<Financial />} />

                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/job/:id" element={<JobDetail />} />

                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blog/:blogId" element={<BlogDetail />} />
                      <Route path="/blog-posting" element={<Posting />} />

                      <Route path="/drivers" element={<Drivers />} />
                      <Route path="/driver-detail/:id" element={<DriverDetail />} />

                      <Route path="/serviceproviders" element={<ServiceProviders />} />
                      <Route path="/service-provider-detail/:id" element={<ServiceProviderDetail />} />
                      <Route path="/chat" element={<Chat />} />

                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />

                      <Route path="/aboutus" element={<AboutUs />} />
                      <Route path="/faq" element={<FAQ />} />
                    </Routes>
                  </Router>
                </AlertState>
              </BlogState>
            </JobState>
          </ItemState>
        </ChatState>
      </UserState>
    </UserAuthState>
  );
};

export default App;
