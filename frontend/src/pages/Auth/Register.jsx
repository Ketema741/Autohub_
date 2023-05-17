import React, { useState, useContext } from 'react';
import SelectType from './SelectType';
import SupplierRegistration from './SupplierRegistration';
import DriverRegistration from './DriverRegistration';
import VehicleExpertRegistration from './VehicleExpertRegistration';
import NormalUserRegistration from './NormalUserRegistration';
import AuthContext from './../../context/auth/authContext';
import { BsBuildingGear } from 'react-icons/bs';


const RegistrationForm = () => {
    const authContext = useContext(AuthContext);
    const { register } = authContext

    const [step, setStep] = useState(1);
    const [role, setrole] = useState(null);
    const [carSupplierInfo, setCarSupplierInfo] = useState(null);
    const [driverInfo, setDriverInfo] = useState(null);
    const [vehicleExpertInfo, setVehicleExpertInfo] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const handleSelectType = (role) => {
        setrole(role);
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

    const handleSubmit = (event) => {
        event.preventDefault();
        let mergedObject;

        if (carSupplierInfo) {
            mergedObject = { ...role, ...carSupplierInfo };
        }
        else if (driverInfo) {
            mergedObject = { ...role, ...driverInfo };
        }
        else if (expert) {
            mergedObject = { ...role, ...expert };
        }
        else if (user) {
            mergedObject = { ...role, ...user };
        }

        register(mergedObject)
    }

    let formComponent;

    switch (step) {
        case 1:
            formComponent = <SelectType onSelect={handleSelectType} />;
            break;
        case 2:
            switch (role.role) {
                case 'supplier':
                    formComponent = <SupplierRegistration onSubmit={handleCarSupplierRegistration} handlePrev={handlePrev} />;
                    break;
                case 'user':
                    formComponent = <NormalUserRegistration onSubmit={handleUserRegistration} handlePrev={handlePrev} />;
                    break;
                case 'driver':
                    formComponent = <DriverRegistration onSubmit={handleDriverRegistration} handlePrev={handlePrev} />;
                    break;
                case 'expert':
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
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">User Type: {role.role}</p>
                            <p className="mb-2">First Name: {role.firstName}</p>
                            <p className="mb-2">Last Name: {role.lastName}</p>
                            <p className="mb-2">Email: {role.email}</p>
                            <p className="mb-2">Phone: {carSupplierInfo.phone}</p>
                            <p className="mb-2">Phone: {carSupplierInfo.campnyName}</p>
                        </div>
                    )}
                    {driverInfo && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">First Name: {role.firstName}</p>
                            <p className="mb-2">Last Name: {role.lastName}</p>
                            <p className="mb-2">Email: {role.email}</p>
                            <p className="mb-2">Role: {role.role}</p>
                            <p className="mb-2">Phone: {driverInformation.phone}</p>
                            <p className="mb-2">Vehicle Make and Model: {driverInformation.vehicleMakeModel}</p>
                            <p className="mb-2">Driver's License Number: {driverInformation.licenseNumber}</p>
                        </div>
                    )}
                    {vehicleExpertInfo && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">First Name: {role.firstName}</p>
                            <p className="mb-2">Last Name: {role.lastName}</p>
                            <p className="mb-2">Email: {role.email}</p>
                            <p className="mb-2">Role: {role.role}</p>
                            <p className="mb-2">Phone: {vehicleExpertInfo.phone}</p>
                        </div>
                    )}
                    {userInfo && (
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="mb-2">Name: {role.firstName}</p>
                            <p className="mb-2">Email: {role.email}</p>
                            <p className="mb-2">Phone: {userInfo.phone}</p>
                        </div>
                    )}
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit">Submit Registration</button>
                </form>
            );
            break;
        default:
            formComponent = null;
    }

    return (

        <div className="mt-14 min-w-screen  bg-white flex items-center justify-center px-5 py-1">
            {formComponent}
        </div>

    );

}

export default RegistrationForm