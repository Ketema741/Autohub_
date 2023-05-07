import React, { useState, useContext } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Table, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { useStateContext } from '../../../context/ContextProvider';
import { customToolbarSettings } from './Toolbar';
import ItemContext from '../../../context/item/itemContext';


const CarForm = () => {
  const itemContext = useContext(ItemContext);
  const { addItem } = itemContext;

  const { currentColor, setEditItem } = useStateContext();

  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    model: '',
    quantity: '',
    material: '',
    price: '',
    color: '',
    manufacturingDate: '',
    description: '',
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.description = content
    console.log(formData);

    // addItem(formData, images)
  };

  return (
    <div className=" bg-half-transparent fixed inset-0  flex justify-center items-center overflow-y-auto">
      <div className="mt-24 float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3 overflow-y-auto rounded-lg" style={{ width: "70%", height: "90%" }}>
        <div className="flex justify-between items-center p-4 m-4">
          <p className="font-semibold text-lg" style={{ color: currentColor }}>Add Accessory Property</p>
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
                    <label
                      htmlFor="Title"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Item Title
                    </label>
                    <input
                      type="text"
                      name="Title"
                      id="Title"
                      value={formData.title}
                      onChange={onChange}
                      placeholder="Item Title"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="category"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Item Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={onChange}
                      placeholder="Category"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="brand"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      value={formData.brand}
                      onChange={onChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="material"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    id="material"
                    value={formData.material}
                    onChange={onChange}
                    placeholder="e.g. Polyester"
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="Color"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      id="color"
                      value={formData.clor}
                      onChange={onChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="quantity"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={onChange}
                  placeholder="5"
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="price"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={onChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Manufacturing Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.manufacturingDate}
                      onChange={onChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
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

export default CarForm;