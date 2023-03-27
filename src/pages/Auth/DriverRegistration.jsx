import React, { useState } from 'react';

const DriverRegistration = ({ onSubmit, handlePrev }) => {
    const [licenseNumber, setLicenseNumber] = useState('');
    const [vehicleMakeModel, setVehicleMakeModel] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ licenseNumber, vehicleMakeModel });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-2">
                Step 2: Vehicle Expert Registration
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    Vehicle Make Model:
                    <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={vehicleMakeModel} onChange={(event) => setLicenseNumber(event.target.value)} />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    License Number:
                    <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={licenseNumber} onChange={(event) => setVehicleMakeModel(event.target.value)} />
                </label>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    onClick={handlePrev}
                >
                    Previous
                </button>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    type="submit"
                    disabled={!licenseNumber || !vehicleMakeModel}
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default DriverRegistration