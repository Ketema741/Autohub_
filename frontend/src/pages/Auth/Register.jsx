import React, { useState, useContext, useEffect } from 'react';

import SelectType from './SelectType';
import SupplierRegistration from './SupplierRegistration';
import DriverRegistration from './DriverRegistration';
import VehicleExpertRegistration from './VehicleExpertRegistration';
import NormalUserRegistration from './NormalUserRegistration';
import { useNavigate } from "react-router-dom";

import AuthContext from './../../context/auth/authContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const {user, register, logout } = authContext;

    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState(null);
    const [carSupplierInfo, setCarSupplierInfo] = useState(null);
    const [driverInfo, setDriverInfo] = useState(null);
    const [vehicleExpertInfo, setVehicleExpertInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);


    useEffect(() => {
        if(user && user.role){
            navigate('/');
        }
        // eslint-disable-next-line
    }, [user]);

    const handleSelectType = (userType) => {
        setUserType(userType);
        setStep(2);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const handleCarSupplierRegistration = (info) => {
        setCarSupplierInfo(info);
        setStep(3);
    }

    const handleDriverRegistration = (info) => {
        setDriverInfo(info);
        setStep(3);
    }
    const handleUserRegistration = (info) => {
        setUserInfo(info);
        setStep(3);
    }

    const handleVehicleExpertRegistration = (info) => {
        setVehicleExpertInfo(info);
        setStep(3);
    }

    const handleBackHome = () => {
        logout();
        navigate("/")
    }

    const handleRestart = () => {
        setCarSupplierInfo(null);
        setDriverInfo(null);
        setVehicleExpertInfo(null);
        setUserInfo(null);
        setStep(1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let mergedObject;

        if (carSupplierInfo) {
            mergedObject = { ...userType, ...carSupplierInfo };
        }
        else if (driverInfo) {
            mergedObject = { ...userType, ...driverInfo };
        }
        else if (vehicleExpertInfo) {
            mergedObject = { ...userType, ...vehicleExpertInfo };
        }
        else if (userInfo) {
            mergedObject = { ...userType, ...userInfo };
        }

        register(mergedObject)

    }

    let formComponent;

    switch (step) {
        case 1:
            formComponent = <SelectType onSelect={handleSelectType} />;
            break;
        case 2:
            switch (userType.userType) {
                case 'supplier':
                    formComponent = <SupplierRegistration onSubmit={handleCarSupplierRegistration} handlePrev={handlePrev} />;
                    break;
                case 'customer':
                    formComponent = <NormalUserRegistration onSubmit={handleUserRegistration} handlePrev={handlePrev} />;
                    break;
                case 'driver':
                    formComponent = <DriverRegistration onSubmit={handleDriverRegistration} handlePrev={handlePrev} />;
                    break;
                case 'caraficionados':
                    formComponent = <VehicleExpertRegistration onSubmit={handleVehicleExpertRegistration} handlePrev={handlePrev} />;
                    break;
                default:
                    formComponent = null;
            }
            break;
        case 3:
            formComponent = (
                <form onSubmit={handleSubmit}>
                    <h2>Step 3: Confirm Registration Information</h2>

                    {carSupplierInfo && (
                        <div className="my-8 bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">User Type: {userType.userType}</p>
                            <p className="mb-2">First Name: {userType.firstName}</p>
                            <p className="mb-2">Last Name: {userType.lastName}</p>
                            <p className="mb-2">Email: {userType.email}</p>
                            <p className="mb-2">Phone: {carSupplierInfo.phone}</p>
                            <p className="mb-2">Company Name: {carSupplierInfo.companyName}</p>
                        </div>
                    )}
                    {driverInfo && (
                        <div className="my-8 bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">First Name: {userType.firstName}</p>
                            <p className="mb-2">Last Name: {userType.lastName}</p>
                            <p className="mb-2">Email: {userType.email}</p>
                            <p className="mb-2">userType: {userType.userType}</p>
                            <p className="mb-2">Phone: {driverInfo.phone}</p>
                            <p className="mb-2">Vehicle Make and Model: {driverInfo.vehicleMakeModel}</p>
                            <p className="mb-2">Driver's License Number: {driverInfo.licenseNumber}</p>
                        </div>
                    )}
                    {vehicleExpertInfo && (
                        <div className="my-8 bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">First Name: {userType.firstName}</p>
                            <p className="mb-2">Last Name: {userType.lastName}</p>
                            <p className="mb-2">Email: {userType.email}</p>
                            <p className="mb-2">userType: {userType.userType}</p>
                            <p className="mb-2">Phone: {vehicleExpertInfo.phone}</p>
                        </div>
                    )}
                    {userInfo && (
                        <div className="my-8 bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">First Name: {userType.firstName}</p>
                            <p className="mb-2">Last Name: {userType.lastName}</p>
                            <p className="mb-2">Email: {userType.email}</p>
                            <p className="mb-2">Phone: {userInfo.phone}</p>
                        </div>
                    )}

                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                            onClick={handleRestart}
                        >
                            Restart
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            type="button"
                            onClick={handleBackHome}
                        >
                            Home Page
                        </button>
                    </div>
                </form>
            );
            break;
        default:
            formComponent = null;
    }

    return (

        <div className="mt-14 min-w-screen  bg-white flex items-center justify-center px-5 py-1">
            {formComponent}

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

}

export default RegistrationForm