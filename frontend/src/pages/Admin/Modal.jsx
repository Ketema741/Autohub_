import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Header } from '../../components';


const Modal = ({ User, handleModalClose }) => {
    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                {/* Modal content */}
                <div
                    action="#"
                    className="relative bg-white rounded-lg shadow dark:bg-gray-700"
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
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">

                                    <p
                                        className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                    >
                                        {`${User.firstName}  ${User.lastName}`}
                                    </p>

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <p
                                        className="text-gray-900 text-xl block w-full p-2.5 dark:text-white"
                                    >
                                        {User.email}
                                    </p>

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