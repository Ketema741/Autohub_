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
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit">Submit Registration</button>
                </form>
            );
            break;
        default:
            formComponent = null;
    }

    return (

        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            {formComponent}
        </div>

    );

}

export default RegistrationForm