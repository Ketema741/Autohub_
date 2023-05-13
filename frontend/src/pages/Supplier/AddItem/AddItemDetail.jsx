import React, { useState } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';

import { useStateContext } from '../../../context/ContextProvider';
import CarForm from './CarForm'
import AccessoryForm from './AccessoryForm'


const AddItemDetail = () => {


    // delete item image
    const handleDelete = (imgObj) => {
        const public_id = imgObj.public_id;
        setImageToRemove(public_id);
        removeImage(public_id);
        setImageToRemove(null);
        setImages((prev) => prev.filter((img) => img.public_id !== public_id));
    };

    const [selectedImages, setSelectedImages] = useState([]);
    const [itemData, setItemData] = useState(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const selectedImagePreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                selectedImagePreviews.push(reader.result);
                if (selectedImagePreviews.length === files.length) {
                    setSelectedImages(selectedImagePreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const {
        currentColor,
        editItem,
        setEditItem,
    } = useStateContext();

    const handleData = (data) => {
        setEditItem(false)
        setItemData(data)

    };


    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const handleSubmit = () => {
        console.log(selectedImages);
    };


    const [uploadType, setUploadType] = useState('car');
    const handleRadioChange = (e) => {
        setUploadType(e.target.value);
    };


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
            <div className="flex flex-wrap items-top">
                <div className="w-full md:w-1/2 z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                    <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide  border-gray-200" style={{ color: currentColor }}>Add Item</div>
                    <div class="flex justify-center">
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
                                </>
                                :

                                <p>{itemData.title} </p>
                            }
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

                {/* images */}
                <div className="w-full md:w-1/2 relative z-0 px-5 md:px-0 md:py-16 ">
                    <div className="text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden bg-gray-200" style={{ height: '400px', overflowY: 'scroll' }}>
                        <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide" style={{ backgroundColor: currentColor }}>Item Images</div>
                        {selectedImages ?
                            <p className="p-5 text-center text-base font-medium text-[#07074D]">Selected Images</p>
                            :
                            <p className="p-5 text-center text-base font-medium text-[#07074D]">No Selected Images</p>
                        }

                        <div class="flex justify-center pb-2 bg-gray-200">
                            <div>
                                {selectedImages &&

                                    <div className="flex  w-full flex-wrap  p-5 bg-gray-200">
                                        <div className="grid grid-cols-3 gap-3">
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className="w-35 bg-white p-3">
                                                    <img
                                                        className="h-40 w-full object-cover"
                                                        src={image}
                                                        alt={`Selected ${index + 1}`}

                                                    />
                                                    <div className="mt-3 flex">
                                                        <div className="mr-auto">
                                                            <button onClick={() => removeImage(index)} className=" text-gray-400 hover:text-red-600">
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </div>}

                                <div className="flex justify-center items-center">
                                    <input type="file" onChange={handleImageChange} multiple />
                                </div>
                                <button onClick={handleSubmit} disabled={selectedImages.length === 0} className="m-4 rounded-full hover:bg-blue-600 px-4 py-2 hover:shadow-lg" style={{ backgroundColor: currentColor }} >
                                    Submit
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {editItem &&
                <div>
                    {uploadType == "car" ?
                        <CarForm handleData={handleData} itemData={itemData} />
                        :
                        <AccessoryForm handleData={handleData} itemData={itemData} />
                    }
                </div>
            }
        </div>
    );
}
export default AddItemDetail