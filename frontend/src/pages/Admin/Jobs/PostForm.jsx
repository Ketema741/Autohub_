import React, { useState, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useStateContext } from '../../../context/ContextProvider';
import { customToolbarSettings } from '../../Job/Toolbar';
import UploadImage from '../../../cloudinary/UploadImage';

import JobContext from '../../../context/job/jobContext';

const PostForm = ({ handleData }) => {
    const jobContext = useContext(JobContext);
    const { addJob } = jobContext;
    const { currentColor } = useStateContext();
    const [content, setContent] = useState('');

    const initialValues = {
        title: '',
        location: '',
        salary: '',
        description: '',
        image: '',

    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        location: Yup.string().required('Location is required'),
        salary: Yup.string().required('Salary is required'),
    });

    // image upload start here
    const [images, setImages] = useState([]);
    const [imageToRemove, setImageToRemove] = useState();

    const handleDelete = (imgObj) => {
        const public_id = imgObj.public_id;
        setImageToRemove(public_id);
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    };  // image upload end here


    const handleSubmit = (values) => {
        const formData = {
            ...values,
            description: content,
            jobImages: images && images.length > 0 ? images[0].url : null,
        };
        if (formData.jobImages) {
            addJob(formData);
        }
        console.log(formData);
    };

    return (
        <div className="bg-half-transparent fixed inset-0 flex justify-center items-center overflow-y-auto">
            <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: '70%', height: '90%' }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>
                        Make A Job Post
                    </p>
                    <button type="button" onClick={handleData} style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }} className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray">
                        <MdOutlineCancel />
                    </button>
                </div>

                <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-5 w-full">
                    <div className="mx-auto w-full">
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-5">
                                        <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Title
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="title"
                                            id="title"
                                            placeholder="Enter job title"
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500" />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Location
                                        </label>
                                        <Field
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Enter job location"
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="location" component="div" className="text-red-500" />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="salary" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Salary
                                        </label>
                                        <Field
                                            type="text"
                                            name="salary"
                                            id="salary"
                                            placeholder="Enter job salary"
                                            className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <ErrorMessage name="salary" component="div" className="text-red-500" />
                                    </div>

                                    <div className="mb-5">
                                        <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
                                            Detail Description
                                        </label>
                                        <RichTextEditorComponent change={(args) => setContent(args.value)} toolbarSettings={customToolbarSettings}>
                                            <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                        </RichTextEditorComponent>

                                    </div>
                                    <div className="mb-5 flext justify-center">
                                        {images.length > 0 &&
                                            <img src={images[0].url} alt="job image" />
                                        }
                                    </div>
                                    <div className="mb-5 flext justify-center">
                                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                                            Job Description Image
                                        </label>
                                        <UploadImage setImages={setImages} />

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
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
