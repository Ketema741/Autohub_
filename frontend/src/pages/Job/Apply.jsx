import React, { useState, useContext, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { customToolbarSettings } from './Toolbar';
import ItemContext from '../../context/item/itemContext';


const Apply = ({ togglePopup }) => {
    const itemContext = useContext(ItemContext);
    const { addItem } = itemContext;
    const [content, setContent] = useState('');

    const { currentColor, setEditItem } = useStateContext();
   
    const initialValues = {
        title: '',
        category: '',
        brand: '',
        quantity: '',
        model: '',
        price: '',
        description: '',
        manufacturingDate: '',
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),
        brand: Yup.string().required('Brand is required'),
        quantity: Yup.string()
            .required('quantity is required')
            .min(1, 'quantity must be at least 1 characters long'),
        model: Yup.string().required('model is required'),
        price: Yup.string().required('Price is required'),
        manufacturingDate: Yup.string().required('manufacturingDate is required'),
    });

    const validateForm = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = ' Title is required';
        }
        if (!values.category) {
            errors.category = ' Category is required';
        }
        if (!values.brand) {
            errors.brand = ' Brand is required';
        }
        if (!values.quantity) {
            errors.quantity = 'quantity is required';
        } else if (values.quantity.length < 5) {
            errors.quantity = 'quantity must be at least 5 characters long';
        }

        if (!values.manufacturingDate) {
            errors.manufacturingDate = 'Manufacturing Date is required';
        }

        if (!values.model) {
            errors.model = 'model is required';
        }

        if (!values.price) {
            errors.price = 'price is required';
        } else if (values.price.length < 10) {
            errors.price = 'price must be at least 10 characters long';
        }

       

        return errors;
    };

    


    const handleSubmit = (values) => {
        values.description = content
        console.log(values)
        handleData(values)
        // setUploadType('')
        // addItem(formData, images)

    };

    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>Add Car Property</p>
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
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validate={validateForm}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="title" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Item title
                                            </label>
                                            <Field
                                                type="text"
                                                name="title"
                                                id="Title"
                                                placeholder="Item Title"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="title" component="div" className="text-red-500" />
                                        </div>

                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="category" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Item Category
                                            </label>
                                            <Field
                                                type="text"
                                                name="category"
                                                id="Category"
                                                placeholder="Category"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="category" component="div" className="text-red-500" />
                                        </div>

                                    </div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="brand" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Brand
                                            </label>
                                            <Field
                                                type="text"
                                                name="brand"
                                                id="Brand"
                                                placeholder="Car Brand"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="brand" component="div" className="text-red-500" />
                                        </div>

                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="model" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Model
                                            </label>
                                            <Field
                                                type="text"
                                                name="model"
                                                id="Model"
                                                placeholder="Car Model"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="model" component="div" className="text-red-500" />
                                        </div>

                                    </div>
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="quantity" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Quantity
                                    </label>
                                    <Field
                                        type="number"
                                        name="quantity"
                                        id="Quantity"
                                        placeholder="5"
                                        min="0"
                                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    <ErrorMessage name="quantity" component="div" className="text-red-500" />
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Price
                                            </label>
                                            <Field
                                                type="number"
                                                name="price"
                                                id="price"
                                                placeholder="price"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="price" component="div" className="text-red-500" />
                                        </div>
                                    </div>

                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Manufacturing Date
                                            </label>
                                            <Field
                                                type="date"
                                                name="manufacturingDate"
                                                id="ManufacturingDate"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="manufacturingDate" component="div" className="text-red-500" />
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-5">
                                    <label
                                        htmlFor="quantity"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Detail Description
                                    </label>
                                    <RichTextEditorComponent change={args => setContent(args.value)} toolbarSettings={customToolbarSettings}>
                                        <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                    </RichTextEditorComponent>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        style={{ backgroundColor: currentColor }}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Apply;