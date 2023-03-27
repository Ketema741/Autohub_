import React, { useState } from 'react';
import SelectType from './SelectType';
import SupplierRegistration from './SupplierRegistration';
import DriverRegistration from './DriverRegistration';
import VehicleExpertRegistration from './VehicleExpertRegistration';


const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState(null);
    const [carSupplierInfo, setCarSupplierInfo] = useState(null);
    const [driverInfo, setDriverInfo] = useState(null);
    const [vehicleExpertInfo, setVehicleExpertInfo] = useState(null);

    const handleSelectType = (userType) => {
        setUserType(userType);
        setStep(2);
    }
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

    const handleVehicleExpertRegistration = (info) => {
        setVehicleExpertInfo(info);
        setStep(3);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ userType, carSupplierInfo, driverInfo, vehicleExpertInfo });
        // Perform form submission logic here
    }

    let formComponent;

    switch (step) {
        case 1:
            formComponent = <SelectType onSelect={handleSelectType} />;
            break;
        case 2:
            switch (userType) {
                case 'carSupplier':
                    formComponent = <SupplierRegistration onSubmit={handleCarSupplierRegistration} handlePrev={handlePrev} />;
                    break;
                case 'driver':
                    formComponent = <DriverRegistration onSubmit={handleDriverRegistration} handlePrev={handlePrev} />;
                    break;
                case 'vehicleExpert':
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
                    <p>User Type: {userType}</p>
                    {carSupplierInfo && (
                        <>
                            <p>Company Name: {carSupplierInfo.companyName}</p>
                            <p>Contact Information: {carSupplierInfo.contactInfo}</p>
                        </>
                    )}
                    {driverInfo && (
                        <>
                            <p>Driver's License Number: {driverInfo.licenseNumber}</p>
                            <p>Vehicle Make and Model: {driverInfo.vehicleMakeModel}</p>
                        </>
                    )}
                    {vehicleExpertInfo && (
                        <>
                            <p>Expertise: {vehicleExpertInfo.expertise}</p>
                            <p>Certifications: {vehicleExpertInfo.certifications}</p>
                        </>
                    )}
                    <button type="submit">Submit Registration</button>
                </form>
            );
            break;
        default:
            formComponent = null;
    }

    return (
        <div className="mt-24 container px-5 mx-auto">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="absolute w-full h-full bg-gray-900 opacity-50" />
                <div className="relative bg-white w-1/2 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">
                        Autohub Registration
                    </h2>
                    {formComponent}
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm