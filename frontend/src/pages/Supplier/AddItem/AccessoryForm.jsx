import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../../context/ContextProvider';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { customToolbarSettings } from './Toolbar';

const CarForm = ({ handleData, categories, getCategories, createCategory }) => {

  const [newCategory, setNewCategory] = useState("");

  const [content, setContent] = useState('');

  const { currentColor, setEditItem } = useStateContext();
  const initialValues = {
    name: '',
    categoryId: '',
    quantity: null,
    price: null,
    description: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    categoryId: Yup.string().required('Category is required'),
    price: Yup.string()
    .required('Price is required')
    .min(1, 'Price must be at least 1 characters long'),

    quantity: Yup.string()
      .required('quantity is required')
      .min(1, 'quantity must be at least 1 characters long'),
  });

  useEffect(() => {
    getCategories()
  }, [])

  const handleCreateCategory = () => {
    if (newCategory.trim() !== "") {
      // createCategory()
      setNewCategory("");
    } else {
      alert("Please enter a category name.");
    }
  };

  const handleSubmit = (values) => {
    values.description = content
    handleData(values)
  };

  return (
    <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
      <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
        <div className="flex justify-between items-center p-4 m-4">
          <p className="font-semibold text-lg" style={{ color: currentColor }}>Add Car Accessory Property</p>
          <div>
            <input
              type="text"
              placeholder="Create New Category"
              className="rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleCreateCategory}
              className="rounded-md py-2 px-4 bg-[#5F63FF] text-white font-medium text-base ml-2"
            >
              Create
            </button>
          </div>
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
                      <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                        Item name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Item name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500" />
                    </div>

                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label htmlFor="categoryId" className="mb-3 block text-base font-medium text-[#07074D]">
                        Item Category
                      </label>
                      <Field
                        as="select"
                        name="categoryId"
                        id="Category"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >

                        <option value="">Select Category</option>
                        {categories ? (
                          categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        ) : (
                          <option value="">loading ..</option>
                        )}

                      </Field>
                      <ErrorMessage name="categoryId" component="div" className="text-red-500" />
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
                    id="quantity"
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
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="Description"
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
                    className="hover:shadow-form rounded-md bg-[#1E4DB7 py-3 px-8 text-center text-base font-semibold text-white outline-none"
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

export default CarForm;