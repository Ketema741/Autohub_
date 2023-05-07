import React, { useState } from 'react';
import welcome from '../../brands/undraw_welcome_cats_thqn.svg'

const SelectType = ({ onSelect }) => {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelect(formData);
  };

  return (
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
      <div className="md:flex w-full">
        <div className="mt-24 hidden md:block w-1/2  p-10 ">
          <img src={welcome} alt="welcome" />
        </div>
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
              <p>Step 1: Choose Your User Type</p>
            </div>
            <div className="flex -mx-3 flex-col">
              <div className="w-1/2 px-3 mb-5">
                <label className="text-xs font-semibold px-1">User Type</label>
                <select className="w-full border border-gray-400 p-2 rounded-md" name="userType" value={formData.userType} onChange={handleInputChange}>
                  <option value="">Select Type</option>
                  <option value="user">Normal User</option>
                  <option value="supplier">Car or Accessory Supplier</option>
                  <option value="driver">Driver</option>
                  <option value="expert">Vehicle Expert</option>
                </select>
              </div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-1">First name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                    <input
                      type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="first name" />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-1">Last name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                    <input type="text"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="last name" />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label for="" className="text-xs font-semibold px-1">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="kgirma@example.com" />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label for="" className="text-xs font-semibold px-1">Password</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      placeholder="************"

                    />
                  </div>
                </div>
              </div>
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button className=" mb-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit" disabled={!formData.userType}>Next</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default SelectType;



