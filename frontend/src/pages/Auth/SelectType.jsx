import React from 'react';
import welcome from '../../brands/undraw_welcome_cats_thqn.svg'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const SelectType = ({ onSelect }) => {
  const validationSchema = Yup.object({
    role: Yup.string().required('User Type is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values) => {
    onSelect(values);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };
  

  return (
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
      <div className="md:flex w-full">
        <div className="mt-24 hidden md:block w-1/2  p-10 ">
          <img src={welcome} alt="welcome" />
        </div>
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validateForm}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Step 1: Choose Your User Type</p>
              </div>
              <div className="flex -mx-3 flex-col">
                <div className="w-1/2 px-3 mb-5">
                  <label className="text-xs font-semibold px-1">User Type</label>
                  <Field
                    as="select"
                    className="w-full border border-gray-400 p-2 rounded-md"
                    name="role"
                  >
                    <option value="">Select Type</option>
                    <option value="user">Normal User</option>
                    <option value="supplier">Car or Accessory Supplier</option>
                    <option value="driver">Driver</option>
                    <option value="expert">Vehicle Expert</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-500" />
                </div>

                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">First name</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <Field
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        name="firstName"
                        placeholder="First name"
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" className="text-red-500" />
                  </div>
                  

                  <div className="w-1/2 px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Last name</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                      </div>
                      <Field
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        name="lastName"
                        placeholder="Last name"
                      />
                    </div>
                    <ErrorMessage name="lastName" component="div" className="text-red-500" />
                  </div>

                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <Field
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        name="email"
                        placeholder="kgirma@example.com"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>

                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label className="text-xs font-semibold px-1">Password</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <Field
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        name="password"
                        placeholder="************"
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>

                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className=" mb-5 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit" >Next</button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>

  );
}

export default SelectType;



