import React, { useState, useContext, useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';

import CarForm from './CarForm';
import AccessoryForm from './AccessoryForm';

import ItemContext from '../../../context/item/itemContext';
import { useStateContext } from '../../../context/ContextProvider';

import UploadImage from '../../../cloudinary/UploadImage';

const Parse = require('html-react-parser')

const AddItemDetail = () => {

    const itemContext = useContext(ItemContext);
    const { addItem, categories, getCategories, createCategory } = itemContext;

    const [itemData, setItemData] = useState(null);

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

    const {
        currentColor,
        editItem,
        setEditItem,
    } = useStateContext();

    const handleData = (data) => {
        setEditItem(false)
        setItemData(data)
    };

    const [uploadType, setUploadType] = useState('cars');
    const handleRadioChange = (e) => {
        setUploadType(e.target.value);
    };

    const handleSubmit = () => {
        if (uploadType === 'cars') {
            itemData.carImages = images;
        } else {
            itemData.itemImages = images;
        }

        addItem(itemData, uploadType); // Update the itemData state

    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 ">
            <div className="flex flex-wrap items-top">
                <div className="w-full z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                    <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide  border-gray-200" style={{ color: currentColor }}>Add Item</div>
                    <div className="flex justify-center">
                        <div className="m-5 mx-auto max-w-md text-center">
                            {!itemData ?
                                <>
                                    <label className="mb-3 block text-base font-medium text-[#07074D]">
                                        What Do You Want To Upload ?
                                    </label>

                                    <div className="flex items-center space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="radio1"
                                                id="radioButton1"
                                                className="h-5 w-5"
                                                value="cars"
                                                checked={uploadType === 'cars'}
                                                onChange={handleRadioChange}
                                            />
                                            <label
                                                htmlFor="radioButton1"
                                                className="pl-3 text-base font-medium text-[#07074D]"
                                            >
                                                Car
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                name="radio1"
                                                id="radioButton2"
                                                className="h-5 w-5"
                                                value="accessory"
                                                checked={uploadType === 'accessory'}
                                                onChange={handleRadioChange}
                                            />
                                            <label
                                                htmlFor="radioButton2"
                                                className="pl-3 text-base font-medium text-[#07074D]"
                                            >
                                                Accessory
                                            </label>
                                        </div>
                                    </div>
                                </>
                                : <div></div>
                            }
                        </div>
                    </div>

                    { itemData &&
                        <div className='m-4 flex flex-col justify-start space-y-4'>
                            {itemData.make &&
                                <div>
                                <span className="text-bold">Title:</span>
                                     {itemData.make}
                                </div>
                            }
                            {itemData.name &&
                                <div>
                                <span className="text-bold">Title:</span>

                                     {itemData.name}
                                </div>
                            }

                            <div>
                            <span className="text-bold">Price:</span>

                                 {itemData.price}
                            </div>

                            {itemData.category &&
                                <div>
                                <span className="text-bold">Category:</span>

                                     {itemData.category}
                                </div>
                            }

                            {itemData.brand &&
                                <div>
                                <span className="text-bold">Brand: </span>

                                   {itemData.brand}
                                </div>
                            }

                            {itemData.model &&
                                <div>
                                <span className="text-bold">Model:</span>

                                     {itemData.model}
                                </div>
                            }

                            {itemData.isAvailable &&
                                <div>
                                <span className="text-bold">Is It Available:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }
                            {itemData.seatingCapacity &&
                                <div>
                                <span className="text-bold">Seating Capacity:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }

                            {itemData.engine &&
                                <div>
                                <span className="text-bold">Engine:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }
                            {itemData.fuelType &&
                                <div>
                                <span className="text-bold">Fuel Type:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }

                            {itemData.color &&
                                <div>
                                <span className="text-bold">Color:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }
                            {itemData.year &&
                                <div>
                                <span className="text-bold">Manufacturing Date:</span>

                                     {itemData.seatingCapacity}
                                </div>
                            }

                            <div>
                            <span className="text-bold">Quantity:</span>

                                 {itemData.quantity}
                            </div>


                            <div>
                                Description: {Parse(itemData.description)}
                            </div>
                        </div>
                    }

                    {/* <ItemInfo /> */}
                    {!itemData &&
                        <div className="flex justify-center mt-4">
                            <TooltipComponent content="Add Item" position="LeftCenter">
                                <button type="button" onClick={() => setEditItem(true)} className="mb-4 rounded-full hover:bg-blue-600 p-4 hover:shadow-lg" style={{ backgroundColor: currentColor }}>
                                    <span className=" font-medium text-white">
                                        <AiOutlinePlus />
                                    </span>
                                </button>
                            </TooltipComponent>
                        </div>
                    }

                    {/* images */}
                    <div className="w-full relative z-0 px-5 md:px-0 md:py-16 ">
                        <div className="text-white overflow-hidden" style={{ height: '400px', overflowY: 'scroll' }}>
                            <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide" style={{ color: currentColor }}>Item Images</div>
                            <div className="flex justify-center pb-2">
                                <div>
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

                                    <div className="flex flex-col justify-center space-y-24">

                                        <UploadImage setImages={setImages} />
                                        <button
                                            onClick={handleSubmit}
                                            type='submit'

                                            className="m-4 rounded-2xl hover:bg-blue-600 px-10 py-3 hover:shadow-lg"
                                            style={{ backgroundColor: currentColor }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

            {editItem &&
                <div>
                    {uploadType == "cars" ?
                        <CarForm
                            handleData={handleData}
                            itemData={itemData}
                            categories={categories}
                            getCategories={getCategories}
                            createCategory={getCategories}

                        />
                        :
                        <AccessoryForm
                            handleData={handleData}
                            itemData={itemData}
                            categories={categories}
                            getCategories={getCategories}
                            createCategory={getCategories}
                        />
                    }
                </div>
            }
        </div>
    );
}
export default AddItemDetail