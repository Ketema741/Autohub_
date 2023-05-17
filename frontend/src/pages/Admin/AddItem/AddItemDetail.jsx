import React, { useState } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { AiOutlinePlus } from 'react-icons/ai';

import { useStateContext } from '../../../context/ContextProvider';
import CarForm from './CarForm'
import AccessoryForm from './AccessoryForm'
import CloudinaryUploadWidget from "../../../cloudinary/CloudinaryUploadWidget";


const AddItemDetail = () => {
    const [images, setImages] = useState([]);
    const [imageToRemove, setImageToRemove] = useState();

    const handleOpenWidget = (file) => {
        const { secure_url, public_id } = file;
        setImages((prev) => [...prev, { url: secure_url, public_id: public_id }]);
        console.log("image uploaded successfully ", secure_url);
    };

    // delete item image
    const handleDelete = (imgObj) => {
        const public_id = imgObj.public_id;
        setImageToRemove(public_id);
        removeImage(public_id);
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    };

    const {
        currentColor,
        editItem,
        setEditItem,
    } = useStateContext();

    const [uploadType, setUploadType] = useState('car');
    const handleRadioChange = (e) => {
        setUploadType(e.target.value);
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
            <div className="flex flex-wrap items-top">
                <div className="w-full md:w-1/2 z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                    <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide  border-gray-200" style={{ color: currentColor }}>Add Item</div>
                    <div className="flex justify-center">
                        <div className="m-5 mx-auto max-w-md text-center">
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
                                        value="car"
                                        checked={uploadType === 'car'}
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
                        </div>
                    </div>


                    {/* <ItemInfo /> */}
                    <div className="flex justify-center mt-4">
                        <TooltipComponent content="Add Item" position="LeftCenter">
                            <button type="button" onClick={() => setEditItem(true)} className="mb-4 rounded-full hover:bg-blue-600 p-4 hover:shadow-lg" style={{ backgroundColor: currentColor }}>
                                <span className=" font-medium text-white">
                                    <AiOutlinePlus />
                                </span>
                            </button>
                        </TooltipComponent>
                    </div>

                </div>

                {/* gallery */}
                <div className="w-full md:w-1/2 relative z-0 px-5 md:px-0 md:py-16 ">
                    <div className="text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden bg-gray-200" style={{ height: '400px', overflowY: 'scroll' }}>
                        <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide" style={{ backgroundColor: currentColor }}>Item Images</div>

                        <p className="p-5 text-center text-base font-medium text-[#07074D]">No Items Images</p>

                        {/* <ImageGallery currentColor={currentColor} /> */}
                        <div className="flex justify-center pb-2 bg-gray-200">
                            <TooltipComponent content="Add Images" position="RightCenter">
                                <CloudinaryUploadWidget handleOpenWidget={handleOpenWidget} />
                            </TooltipComponent>
                        </div>
                    </div>
                </div>
            </div>
            
            {editItem &&
                <div>
                    {uploadType == "car" ?
                        <CarForm />
                        :
                        <AccessoryForm />
                    }
                </div>
            }
        </div>
    );
}
export default AddItemDetail