import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Header } from '../../components';
const Parse = require('html-react-parser')

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
                        {User ?
                            <div className=" p-3 ">
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Name</div>
                                            <div className="px-4 py-2">{User.firstName} {User.lastName}</div>
                                        </div>

                                        {User.accountId &&
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold"> Bank Account</div>
                                                <div className="px-4 py-2">{User.accountId}</div>
                                            </div>
                                        }
                                        {User.vendorName &&
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">  Vendor Name</div>
                                                <div className="px-4 py-2">{User.vendorName}</div>
                                            </div>
                                        }
                                        {User.email &&
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold"> Email</div>
                                                <div className="px-4 py-2">{User.email}</div>
                                            </div>
                                        }
                                        {User.address &&
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold"> Address</div>
                                                <div className="px-4 py-2">{User.address}</div>
                                            </div>
                                        }
                                        {User.experience &&
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold"> Experience</div>
                                                <div className="px-4 py-2">{User.experience}</div>
                                            </div>
                                        }
                                    </div>
                                    {User.workHistory &&
                                        <div className="flex flex-col">
                                            <div className="px-4 py-2 font-semibold"> Work History</div>
                                            <div className="px-4 py-2">{User.workHistory}</div>
                                        </div>
                                    }
                                    {User.bio &&
                                        <div className="flex flex-col">
                                            <div className="px-4 py-2 font-semibold"> Detail Description</div>
                                            <div className="px-4 py-2">{Parse(User.bio)}</div>
                                        </div>
                                    }
                                    {User.education &&
                                        <div className="flext flex-col">
                                            <div className="px-4 py-2 font-semibold"> Education</div>
                                            <div className="px-4 py-2">{User.education}</div>
                                        </div>
                                    }
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