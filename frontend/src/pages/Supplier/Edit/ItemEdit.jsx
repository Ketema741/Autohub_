import React, { useState, useEffect } from 'react';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '../../../context/ContextProvider';
import { customToolbarSettings } from '../AddItem/Toolbar';

const Parse = require("html-react-parser")

const ItemEdit = (itemProps) => {
  const {
    item,
    setEditModal,
    handleData,
    categories
  } = itemProps


  const { currentColor } = useStateContext();

  const [formState, setFormState] = useState({
    name: item.name,
    categoryId: item.category,
    price: item.price,
    quantity: item.quantity,
    description: item.description,
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleData(formState, item._id);
  };

  return (
    <div className="bg-half-transparent fixed inset-0 flex justify-center items-center overflow-y-auto">
      <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>

        <div className="flex justify-between items-center p-4 m-4">
          <p className="font-semibold text-lg" style={{ color: currentColor }}>Add Car Accessory Property</p>

          <button
            type="button"
            onClick={() => setEditModal(false)}
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
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                      Item name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formState.name}
                      placeholder="Item name"
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                      Item price
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formState.price}
                      placeholder="Item price"
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label htmlFor="quantity" className="mb-3 block text-base font-medium text-[#07074D]">
                      Item Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={formState.quantity}
                      placeholder="Item quantity"
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label htmlFor="categoryId" className="mb-3 block text-base font-medium text-[#07074D]">
                      Item Category
                    </label>
                    <select
                      name="categoryId"
                      id="Category"
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      {categories ? (
                        categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <option value="">loading ..</option>
                      )}
                    </select>
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
                <RichTextEditorComponent
                  change={(args) => setFormState({ ...formState, description: args.value })}
                  toolbarSettings={customToolbarSettings}
                >
                  <div>{Parse(formState.description)}</div>
                  <Inject services={[HtmlEditor, Toolbar, Link, QuickToolbar, Table]} />
                </RichTextEditorComponent>
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-[#1E4DB7 py-3 px-8 text-center text-base font-semibold text-white outline-none"
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

export default ItemEdit;
