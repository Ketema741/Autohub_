import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../../context/ContextProvider';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { customToolbarSettings } from './Toolbar';


const CarForm = ({ handleData, getCategories }) => {

    const [content, setContent] = useState('');

    const { currentColor, setEditItem } = useStateContext();

    const initialValues = {
        make: '',
        quantity: '',
        model: '',
        price: null,
        description: '',
        year: null,
        engine: null,
        seatingCapacity: null,
        fuelType: null,
        carImages: null,
        color: null,
        isAvailable: null,
    };

    const validationSchema = Yup.object().shape({
        make: Yup.string().required('make is required'),
        quantity: Yup.string()
            .required('Quantity is required')
            .min(1, 'Quantity must be at least 1 character long'),
        model: Yup.string().required('Model is required'),
        price: Yup.string()
            .required('Price is required')
            .min(1, 'Price must be at least 1 characters long'),

        year: Yup.string().required('Manufacturing Date is required'),
        engine: Yup.string().required('Engine is required'),
        isAvailable: Yup.string().required('Availablity is required'),
        seatingCapacity: Yup.string()
            .required('Seating Capacity is required')
            .min(1, 'Seating Capacity Price must be at least 1 characters long'),

        fuelType: Yup.string().required('Fuel Type is required'),
        color: Yup.string().required('color is required'),
    });

    useEffect(() => {
        getCategories()
    }, []);

    const handleSubmit = (values) => {
        values.description = content;
        handleData(values);
    };

    return (
        <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
            <div
                className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg"
                style={{ width: '70%', height: '90%' }}
            >
                <div className="flex justify-between items-center p-4 m-4">
                    <p className="font-semibold text-lg" style={{ color: currentColor }}>
                        Add Car Property
                    </p>
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
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <Form>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="make" className="mb-3 block text-base font-medium text-[#07074D]">
                                                make
                                            </label>
                                            <Field
                                                type="text"
                                                name="make"
                                                id="make"
                                                placeholder="Car make"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="make" component="div" className="text-red-500" />
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

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="engine" className="mb-3 block text-base font-medium text-[#07074D]">
                                                engine
                                            </label>
                                            <Field
                                                type="text"
                                                name="engine"
                                                id="engine"
                                                placeholder="Car engine"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="engine" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="seatingCapacity" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Seating Capacity
                                            </label>
                                            <Field
                                                type="number"
                                                name="seatingCapacity"
                                                id="seatingCapacity"
                                                placeholder="Car seatingCapacity"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="seatingCapacity" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="fuelType" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Fuel Type
                                            </label>
                                            <Field
                                                type="text"
                                                name="fuelType"
                                                id="fuelType"
                                                placeholder="Car fuelType"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="fuelType" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="color" className="mb-3 block text-base font-medium text-[#07074D]">
                                                Color
                                            </label>
                                            <Field
                                                type="text"
                                                name="color"
                                                id="color"
                                                placeholder="Car color"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="color" component="div" className="text-red-500" />
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
                                <div className="mb-5">
                                    <label htmlFor="quantity" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Select Availability
                                    </label>
                                    <Field
                                        as="select"
                                        name="isAvailable"
                                        id="isAvailable"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    >
                                        <option value="">Select Availability</option>

                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Field>
                                    <ErrorMessage name="isAvailable" component="div" className="text-red-500" />

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
                                                name="year"
                                                id="year"
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                            <ErrorMessage name="year" component="div" className="text-red-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="quantity" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Detail Description
                                    </label>
                                    <RichTextEditorComponent change={args => setContent(args.value)} toolbarSettings={customToolbarSettings}>
                                        <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                                    </RichTextEditorComponent>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="rounded-md w-full py-4 px-8 flex justify-center items-center bg-[#1E4DB7] text-white font-medium text-lg"
                                    >
                                        Add Item
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

export default CarForm;