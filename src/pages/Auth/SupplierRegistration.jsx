import React, { useState } from 'react';

const SupplierRegistration = ({ onSubmit, handlePrev }) => {
    const [companyName, setCompanyName] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ companyName, contactInfo });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-2">
                Step 2: Car and Accessory Supplier Registration
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    Company Name:
                </label>
                <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                    Contact Information:
                </label>
                <input className="w-full border border-gray-400 p-2 rounded-md" type="text" value={contactInfo} onChange={(event) => setContactInfo(event.target.value)} />
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

export default SupplierRegistration