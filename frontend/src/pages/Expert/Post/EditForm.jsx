import React, { useState, useContext, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { customToolbarSettings } from './Toolbar';
const Parse = require("html-react-parser")
const EditForm = ({ updateBlog, blog, setEditItem, currentColor }) => {

    const [formState, setFormState] = useState({
        category: blog.category,
        title: blog.title,
        excerpt: blog.excerpt,
        takeaways: blog.takeaways,
        description: blog.description,
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBlog(formState, blog._id)
    };

    return (
        <div className=" bg-half-transparent fixed inset-0 z-10  flex justify-center items-center overflow-y-auto">
            <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>Make A Blog Post</p>
                    <button
                        type="button"
                        onClick={() => setEditItem(false)}
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
                                        <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={formState.category}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">

                                    <div className="mb-5">
                                        <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formState.title}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3">

                                    <div className="mb-5 ">
                                        <label htmlFor="excerpt" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Excerpt
                                        </label>
                                        <textarea
                                            id="excerpt"
                                            name="excerpt"
                                            value={formState.excerpt}
                                            onChange={handleChange}
                                            className="min-h-[100px] w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-full px-3">
                                    <div className="mb-5">
                                        <label htmlFor="takeaways" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Takeaways
                                        </label>
                                        <textarea
                                            id="takeaways"
                                            name="takeaways"
                                            value={formState.takeaways}
                                            onChange={handleChange}
                                            className="min-h-[100px] w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-5">
                                <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Detail Description
                                </label>
                                <RichTextEditorComponent
                                    change={(args) => setFormState({ ...formState, description: args.value })}
                                    toolbarSettings={customToolbarSettings}
                                >
                                    <div>{Parse(blog.description)}</div>
                                    <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                </RichTextEditorComponent>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="hover:shadow-form rounded-md bg-[rgb(106,100,241)] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    style={{ backgroundColor: currentColor }}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditForm;
