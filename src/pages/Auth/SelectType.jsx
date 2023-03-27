import React, { useState } from 'react';

const SelectType = ({ onSelect }) => {
  const [userType, setUserType] = useState(null);

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSelect(userType);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">
        Step 1: Choose Your User Type
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Choose Your User Type:
        </label>
        <select className="w-full border border-gray-400 p-2 rounded-md" value={userType} onChange={handleUserTypeChange}>
          <option value="">Select Type</option>
          <option value="carSupplier">Car and Accessory Supplier</option>
          <option value="driver">Driver</option>
          <option value="vehicleExpert">Vehicle Expert</option>
        </select>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" type="submit" disabled={!userType}>Next</button>
    </form>
  );
}

export default SelectType;
