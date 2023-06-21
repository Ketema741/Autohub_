import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from './Button';
import UserContext from '../context/user/userContext';
import { Header } from '../components';

const Checkout = ({ user }) => {
    const userContext = useContext(UserContext);
    const { chapaPaymentURL, order, checkOutOrder } = userContext;

    const [formData, setFormData] = useState({
        amount: order.totalAmount,
        currency: "ETB",
        email: user.email || '',
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        phone_number: user.phone || ''
    });

    useEffect(() => {
        if(chapaPaymentURL?.payment_status_data.status == "success"){
            window.location.href = chapaPaymentURL.payment_status_data.data.checkout_url
        } else {
            toast.info("Unable Redirect To Chapa Payment Page Try Again Leter")
        }
    }, [chapaPaymentURL])


    // Function to handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        checkOutOrder(order._id, formData);
    }




    return (
        <div className="bg-half-transparent w-full fixed nav-item top-0 right-0">
            <div className="mx-auto h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-[550px] p-8">
                <div className="flex justify-between items-center">
                    <Button
                        icon={<MdOutlineCancel />}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="2xl"
                        borderRadius="50%"
                    />
                </div>
                <Header category="Confirmation" title="Chapa Payment" />
                <div className="max-h-[400px] overflow-y-auto">
                    {order &&
                        <div>
                            {order.items &&
                                <div className="flex space-x-14 items-center">
                                    <p className="font-semibold text-xl text-gray-700">Number Of Items </p>
                                    <p className="font-semibold text-lg text-green-500">{order.items.length}</p>
                                </div>
                            }
                            <div className="flex space-x-14 items-center">
                                <p className="font-semibold text-xl text-gray-700">Total Amount </p>
                                <p className="font-semibold text-lg text-green-500">{order.totalAmount}</p>

                            </div>
                        </div>
                    }
                    <form
                        onSubmit={handleCheckout}
                        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                    >


                        {/* Modal body */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="currency"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Currency
                                    </label>

                                    <select
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="ETB">ETB</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="first_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="first_name"
                                        required
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="last_name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="last_name"
                                        required
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="phone_number"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        name="phone_number"
                                        id="phone_number"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="phone_number"
                                        required
                                        value={formData.phone_number}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                checkout
                            </button>
                        </div>
                    </form>
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

export default Checkout;
