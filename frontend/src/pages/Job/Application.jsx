import React, { useEffect, useState, useContext } from "react";
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import AuthContext from './../../context/auth/authContext';
import { useNavigate } from 'react-router-dom'

const Application = ({ togglePopup }) => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext);
    const { user, isUserAuthenticated } = authContext
    const { currentColor } = useStateContext();

    useEffect(() => {
        if (!isUserAuthenticated) {
            navigate("/login");
        }
        if (user && user.role != "driver" ) {
            navigate("/login");
        }
    }, []);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
        licenseNumber: user?.licenseNumber || "",
        licenseExpiryDate: user?.licenseExpiryDate ||"",
        drivingExperience: user?.drivingExperience || "",
        hasCDL: false,
        drivingRecord: user?.drivingRecord || "",
        employmentHistory: user?.employmentHistory || "",
        references: user?.references ||"",
        availability: user?.availability || "",
        additionalCertifications: user?.additionalCertifications || "",
        vehicleType: user?.vehicleType || "",
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // addItem(formData, images)
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>Apply for Driver Position</p>
                    <button
                        type="button"
                        onClick={togglePopup}
                        style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
                        className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>

                <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-5 w-full">
                    <div className="mx-auto w-full">

                        {step === 1 && (
                            <form onSubmit={handleNext}>
                                <h2 className="text-xl font-semibold mb-2">
                                    Step 1: Personal Information
                                </h2>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="firstName"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="lastName"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="email"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="phone"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="address"
                                            >
                                                Address
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="tel"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Next
                                </button>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleNext}>
                                <h2 className="text-xl font-semibold mb-2">
                                    Step 2: Licensing and Experience
                                </h2>
                                <div className="-mx-3 flex flex-wrap">


                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="licenseNumber"
                                            >
                                                Driver's License Number
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="licenseNumber"
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="licenseExpiryDate"
                                            >
                                                License Expiry Date
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="licenseExpiryDate"
                                                name="licenseExpiryDate"
                                                value={formData.licenseExpiryDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="drivingExperience"
                                            >
                                                Years of Driving Experience
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="drivingExperience"
                                                name="drivingExperience"
                                                value={formData.drivingExperience}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="hasCDL"
                                            >
                                                Commercial Driver's License (CDL)
                                            </label>
                                            <select
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="hasCDL"
                                                name="hasCDL"
                                                value={formData.hasCDL}
                                                onChange={handleInputChange}
                                                required
                                            >
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="w-full px-3 sm:w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="drivingRecord"
                                            >
                                                Driving Record
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="drivingRecord"
                                                name="drivingRecord"
                                                value={formData.drivingRecord}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
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
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Next
                                    </button>

                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-xl font-semibold mb-2">
                                    Step 3: Work History and Additional Information
                                </h2>
                                <div className="-mx-3 flex flex-wrap">

                                    <div className="w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="employmentHistory"
                                            >
                                                Employment History
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="employmentHistory"
                                                name="employmentHistory"
                                                value={formData.employmentHistory}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="references"
                                            >
                                                References
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="references"
                                                name="references"
                                                value={formData.references}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="availability"
                                            >
                                                Availability
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="availability"
                                                name="availability"
                                                value={formData.availability}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="additionalCertifications"
                                            >
                                                Additional Certifications
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                id="additionalCertifications"
                                                name="additionalCertifications"
                                                value={formData.additionalCertifications}
                                                onChange={handleInputChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-5">
                                            <label
                                                className="block text-gray-700 font-semibold mb-2"
                                                htmlFor="vehicleType"
                                            >
                                                Vehicle Type
                                            </label>
                                            <input
                                                className="w-full border border-gray-400 p-2 rounded-md"
                                                type="text"
                                                id="vehicleType"
                                                name="vehicleType"
                                                value={formData.vehicleType}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

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
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Application;
