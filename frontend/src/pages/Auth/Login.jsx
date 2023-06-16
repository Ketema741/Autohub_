import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { MdLock } from 'react-icons/md';
import { FaEnvelope } from 'react-icons/fa';
import { FiUserPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import loginsvg from '../../brands/undraw_access_account_re_8spm.svg'

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const { setAlert } = alertContext;
    const { userLogin, error, isUserAuthenticated, loadUser, userLoading } = authContext;

    useEffect(() => {
        if (isUserAuthenticated) {
            setIsLoading(false)
            loadUser()
            navigate('/');
        }

        if (error) {
            setAlert(error, 'danger');
            setIsLoading(false)
        }

        // eslint-disable-next-line
    }, [loadUser, error, isUserAuthenticated, props.history]);

    const initialValues = {
        email: '',
        password: '',
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        if (errors) {
            setIsLoading(false);
        }
        return errors;
    };

    const handleSubmit = (values) => {
        setIsLoading(true);
        userLogin(values);
    };

    return (

        <div className="mt-24 min-w-screen  bg-white flex items-center justify-center px-5 py-1">

            <div className=" bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: "1000px" }}>
                <div className="md:flex w-full ">
                    <div className="hidden md:block w-1/2  py-10 px-10">
                        <img src={loginsvg} className="" />

                    </div>
                    <div className=" flex flex-col items-center justify-center">
                        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 rounded-md w-full max-w-md">
                            <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login To Your Account</div>
                            <button className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-200 hover:bg-gray-300">
                                <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><FcGoogle /></span>
                                <span>Login with Google</span>
                            </button>
                            <div className="relative mt-10 h-px bg-gray-300">
                                <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                    <span className="bg-gray-100 px-4 text-xs text-black uppercase"> Or Login With Email</span>
                                </div>
                            </div>
                          
                            

                            {isLoading &&
                                <div className="flex justify-center items-center">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
                                        <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-blue-500 border-t-transparent"></div>
                                    </div>
                                </div>

                            }
                            <div className="mt-10">
                                <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
                                    <Form>
                                        <div className="flex flex-col mb-6">
                                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                    <span><FaEnvelope /></span>
                                                </div>

                                                <Field
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                                    placeholder="E-Mail Address"
                                                />
                                            </div>
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        <div className="flex flex-col mb-6">
                                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                            <div className="relative">
                                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                    <span><MdLock /></span>
                                                </div>

                                                <Field
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                        </div>

                                        <div className="flex items-center mb-6 -mt-4">
                                            <div className="flex ml-auto">
                                                <a href="#" className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-blue-700">Forgot Your Password?</a>
                                            </div>
                                        </div>

                                        <div className="flex w-full">
                                            <button
                                                type="submit"
                                                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
                                            >
                                                <span className="mr-2 uppercase">Login</span>
                                                <span><MdLock /></span>
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className="flex justify-center items-center mt-6">
                                <a href="#" target="_blank" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
                                    <span>
                                        <FiUserPlus className="h-6 w-6" />
                                    </span>
                                    <span className="ml-2">You don't have an account?</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
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
    )
};
export default Login


