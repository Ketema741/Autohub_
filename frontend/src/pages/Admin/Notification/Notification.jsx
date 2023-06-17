import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from 'react-icons/ri';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from '../../../components';
import ChatContext from '../../../context/chat/chatContext';

const Notification = () => {
    const chatContext = useContext(ChatContext);
    const {
        sendNotificationToMany,
    } = chatContext;

    const initialValues = {
        message: '',
        content: '',
        category: '',
    };

    const validationSchema = Yup.object().shape({
        message: Yup.string().required('Subject is required'),
        content: Yup.string().required('Description is required'),
        category: Yup.string().required('User type is required'),
    });

    const handleSubmit = (values) => {
        console.log(values)
        sendNotificationToMany(values);
    };

    return (
        <div className="mt-24 container px-4 mx-auto overflow-hidden">
            <div className="m-2 md:m-10 mt-4 p-2 md:p-10 bg-white rounded-3xl overflow-hidden">
                <Header category="" title="Send Notification" />
                <div className="flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-300 dark:border-gray-700 md:rounded-lg">
                                <div className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={handleSubmit}
                                        validationSchema={validationSchema}
                                    >
                                        <Form>
                                            <div className="p-4 flex flex-wrap bg-gray-50 dark:bg-gray-800">
                                                <div className="flex justify-center w-full px-3">
                                                    <div className="mb-3">
                                                        <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">
                                                            Select User
                                                        </label>
                                                        <Field
                                                            as="select"
                                                            name="category"
                                                            id="Category"
                                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="all">All Users</option>
                                                            <option value="drivers">Drivers</option>
                                                            <option value="suppliers">Suppliers</option>
                                                            <option value="serviceProviders">Service providers</option>
                                                            <option value="aficionados">Car Aficionados</option>
                                                        </Field>
                                                        <ErrorMessage name="category" component="div" className="text-red-500" />
                                                    </div>
                                                </div>

                                                <div className="w-full px-3 sm:w-1/2">
                                                    <div className="flex-none h-24 p-4 pt-0">
                                                        <div className="px-4 pt-4 mb-2 sm:mb-0">
                                                            <div className="relative flex">
                                                                <Field
                                                                    as="textarea"
                                                                    placeholder="Subject"
                                                                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                                                                    name="message"
                                                                />
                                                            </div>
                                                            <ErrorMessage name="message" component="div" className="text-red-500" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="w-full px-3 sm:w-1/2">
                                                    <div className="flex-none h-24 p-4 pt-0">
                                                        <div className="px-4 pt-4 mb-2 sm:mb-0">
                                                            <div className="relative flex">
                                                                <span className="absolute inset-y-0 flex items-center">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                                                                    >
                                                                        <RiSendPlaneFill className="h-6 w-6 text-gray-600" />
                                                                    </button>
                                                                </span>
                                                                <Field
                                                                    as="textarea"
                                                                    placeholder="Write your message!"
                                                                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                                                                    name="content"
                                                                />
                                                            </div>
                                                            <ErrorMessage name="content" component="div" className="text-red-500" />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Notification;
