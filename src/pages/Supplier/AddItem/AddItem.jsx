import React, { useEffect, useState } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { FiSettings } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

import {
    Navbar,
    Footer,
    SupplierSidebar,
    ThemeSettings,
} from '../../../components';
import { useStateContext } from '../../../context/ContextProvider';


import ImageGallery from '../ItemImages';
import CarForm from './CarForm'
import AccessoryForm from './AccessoryForm'
import ItemInfo from './ItemInfo';
import ItemImages from './../ItemImages';


const AddItemDetail = () => {
    const {
        currentColor,
        editItem,
        setEditItem,
    } = useStateContext();
    const [uploadType, setUploadType] = useState('car'); // default value is 'car'
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
                        <div class="flex justify-center pb-2 bg-gray-200">
                            <TooltipComponent content="Add Images" position="RightCenter">
                                <button type="button" class=" rounded-full hover:bg-blue-600 p-4 hover:shadow-lg" style={{ backgroundColor: currentColor }}>
                                    <span class="font-medium text-white">
                                        <AiOutlinePlus />
                                    </span>
                                </button>
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


const AddItem = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
    } = useStateContext();

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }
    }, []);

    return (
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings" position="Top">
                        <button
                            type="button"
                            onClick={() => setThemeSettings(true)}
                            style={{ background: currentColor, borderRadius: '50%' }}
                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                        >
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                        <SupplierSidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-secondary-dark-bg">
                        <SupplierSidebar />
                    </div>
                )}

                <div
                    className={
                        activeMenu
                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>

                    {themeSettings && <ThemeSettings />}

                    <AddItemDetail />
                    <Footer />

                </div>
            </div>
        </div>
    );
};

export default AddItem;
