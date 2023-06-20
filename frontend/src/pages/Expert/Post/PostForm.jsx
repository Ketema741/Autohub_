import React, { useState, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { RiDeleteBinLine } from 'react-icons/ri';

import { customToolbarSettings } from './Toolbar';
import UploadImage from '../../../cloudinary/UploadImage';

const PostForm = ({ postBlog, setAddBlog, currentColor }) => {
    const [formState, setFormState] = useState({
        title: "",
        excerpt: "",
        summary: "",
        description: "",
        takeaways: "",
        category: "",
    });

    // image upload start here
    const [images, setImages] = useState([]);
    const [imageToRemove, setImageToRemove] = useState();

    const handleDelete = (imgObj) => {
        const public_id = imgObj.public_id;
        setImageToRemove(public_id);
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    };
    // image upload end here

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (images && images.length > 0) {
            formState.blogImage = images[0]
            console.log(formState);
            postBlog(formState)
        }
    };

    return (
        <div className=" bg-half-transparent fixed inset-0 z-10  flex justify-center items-center overflow-y-auto">
            <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>Make A Blog Post</p>
                    <button
                        type="button"
                        onClick={() => setAddBlog(false)}
                        style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
                        className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <MdOutlineCancel />
                    </button>
                </div>

                <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-5 w-full">
                    <div className="mx-auto w-full">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Image
                                </label>
                                <UploadImage setImages={setImages} />
                            </div>
                        </div>
                        {images &&
                            <div className="flex  w-full flex-wrap  p-5">
                                <div className="grid grid-cols-3 gap-3">
                                    {images.map((image, index) => (
                                        <div key={index} className="w-35 bg-white p-3">
                                            <img
                                                src={image.url}
                                                alt={`Selected ${index + 1}`}
                                                className="h-40 w-full object-cover"
                                            />
                                            {imageToRemove !== image.public_id && (
                                                <div className="mt-3 flex">
                                                    <div className="mr-auto">
                                                        <button onClick={() => handleDelete(image)} className=" text-gray-400 hover:text-red-600">
                                                            <RiDeleteBinLine />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                    }
                                </div>
                            </div>
                        }
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
                                            required
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
                                            required

                                            value={formState.title}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">

                                    <div className="mb-5">
                                        <label htmlFor="excerpt" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Excerpt
                                        </label>
                                        <textarea
                                            id="excerpt"
                                            name="excerpt"
                                            required

                                            value={formState.excerpt}
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="takeaways" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Takeaways
                                        </label>
                                        <textarea
                                            id="takeaways"
                                            name="takeaways"
                                            value={formState.takeaways}
                                            required
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label htmlFor="summary" className="mb-3 block text-base font-medium text-[#07074D]">
                                            summary
                                        </label>
                                        <textarea
                                            id="summary"
                                            name="summary"
                                            value={formState.summary}
                                            required
                                            onChange={handleChange}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                                    <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                </RichTextEditorComponent>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    style={{ backgroundColor: currentColor }}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
