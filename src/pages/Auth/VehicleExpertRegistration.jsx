import React, { useState } from 'react';

const VehicleExpertRegistration = ({ onSubmit, handlePrev }) => {
    const [expertise, setExpertise] = useState('');
    const [certifications, setCertifications] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ expertise, certifications });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-2">
                Step 2: Vehicle Expert Registration
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    Expertise:
                </label>
                <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={expertise} onChange={(event) => setExpertise(event.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    Certifications:
                </label>
                <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={certifications} onChange={(event) => setCertifications(event.target.value)} />
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
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default VehicleExpertRegistration