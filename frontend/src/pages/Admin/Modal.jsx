import React from 'react'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { Header } from '../../components';


const Modal = ({ User, handleModalClose }) => {
    
    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                {/* Modal content */}
                <div
                    action="#"
                    className="relative dark:bg-gray-700"
                >
                    {/* Modal header */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">

                        <Header category="Checkout" title="User Detail" />

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleModalClose}
                            data-modal-hide="editUserModal"
                        >
                            <AiOutlineClose className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-6 space-y-6">
                        {User !== null ?
                            <div className=" p-3 ">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span >
                                        <AiOutlineUser className="text-blue-800 h-5" />
                                    </span>
                                    <span className="tracking-wide">About</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{User.firstName} </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{User.lastName}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Gender</div>
                                            <div className="px-4 py-2">Male</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">{User.phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Current Address</div>
                                            <div className="px-4 py-2">{User.address}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Email</div>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={`mailto:${User.email}`}>{User.email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Birthday</div>
                                            <div className="px-4 py-2">{User.birthDay}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            : <div> loading ...</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal