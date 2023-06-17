import React, { useState, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../../context/ContextProvider';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { customToolbarSettings } from './Toolbar';

import AuthContext from '../../../context/auth/authContext';

const Edit = ({ handleModalClose, user }) => {
    const authContext = useContext(AuthContext);
    const { updateUser } = authContext;

    const [content, setContent] = useState('');

    const { currentColor } = useStateContext();
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDay: '',
        bio: '',
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.bio = content
        updateUser(formData, user._id, "caraficionados")

    };

    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>
                        Car Aficionados Profile Edit Form
                    </p>
                    <button
                        type="button"
                        onClick={handleModalClose}
                        style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
                        className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>

                <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-5 w-full">
                    <div className="mx-auto w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="firstName"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={onChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="lastName"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={onChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="email"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={onChange}
                                            placeholder='e.g. autohub@gmail.com'
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="phone"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={onChange}
                                            placeholder='e.g. autohub@gmail.com'
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="-mx-3 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                            htmlFor="birthDay"
                                            className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                            Birth Day
                                        </label>
                                        <input
                                            type="date"
                                            name="birthDay"
                                            id="birthDay"
                                            value={formData.birthDay}
                                            onChange={onChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="bio"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Bio
                                </label>
                                <RichTextEditorComponent change={args => setContent(args.value)} toolbarSettings={customToolbarSettings}>
                                    <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                </RichTextEditorComponent>
                            </div>

                            <div>
                                <button type='submit'
                                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    style={{ backgroundColor: currentColor }}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Edit;