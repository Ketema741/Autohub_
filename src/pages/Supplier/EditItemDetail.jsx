import React, { useEffect } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import EditItem from './EditItemForm'


import ImageGallery from './ItemImages';
import {
    Navbar,
    Footer,
    SupplierSidebar,
} from '../../components';

import { useStateContext } from '../../context/ContextProvider';


const EditItemDetail = () => {
    const {
        currentColor,
        editItem,
        setEditItem,
    } = useStateContext();

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
            <div className="flex flex-wrap items-top">
                <div className="w-full md:w-1/2 z-1 bg-gray-100 rounded shadow-lg overflow-hidden">
                    <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide text-blue-800   border-gray-200">Edit Item</div>
                 
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="table-auto w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Property</th>
                                            <th className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 bg-white">
                                        <tr>
                                            <td className="px-3 py-4 text-sm text-gray-500">Brand</td>
                                            <td className="px-3 py-4 text-sm">
                                                The brand or manufacturer of the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-4 text-sm text-gray-500">Model</td>
                                            <td className="px-3 py-4 text-sm">
                                                The model of the item
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="px-3 py-4 text-sm text-gray-500">Type</td>
                                            <td className="px-3 py-4 text-sm">
                                                The type of the item (e.g. SUV, sedan, truck, etc.)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-4 text-sm text-gray-500">Year</td>
                                            <td className="px-3 py-4 text-sm">
                                                The year the item was manufactured
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="px-3 py-4 text-sm text-gray-500">Color</td>
                                            <td className="px-3 py-4 text-sm">
                                                The color of the item
                                            </td>
                                        </tr>
                                        <tr >
                                            <td className="px-3 py-4 text-sm">Description</td>
                                            <td className="px-3 py-4 text-sm">
                                                A detailed description of the item
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-4 text-sm text-gray-500">Availability</td>
                                            <td className="px-3 py-4 text-sm">
                                                Whether the item is currently available for purchase or
                                                not
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <TooltipComponent content="Edit" position="BottomCenter">

                            <button type="button" onClick={() => setEditItem(true)} className="mb-4 rounded-full hover:bg-blue-600 p-4 hover:shadow-lg" style={{ backgroundColor: currentColor }}>
                                <span className=" font-medium text-white">
                                    <AiOutlineEdit />
                                </span>
                            </button>
                        </TooltipComponent>
                    </div>
                </div>

                {/* gallery */}
                <div className="w-full md:w-1/2 relative z-0 px-5 md:px-0 md:py-16">
                    <div className="text-white rounded-b md:rounded-b-none md:rounded-r shadow-lg overflow-hidden" style={{ height: '400px', overflowY: 'scroll' }}>
                        <div className="text-lg font-medium uppercase p-4 text-center border-b tracking-wide" style={{ backgroundColor: currentColor }}>Item Images</div>
                        <ImageGallery currentColor={currentColor} />
                        <div class="flex justify-center pb-2 bg-gray-200">
                            <TooltipComponent content="Add" position="RightCenter">
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
            {editItem && <EditItem />}
        </div>
    );
}


const EditDetail = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
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
                    <div>
                        <EditItemDetail />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default EditDetail;
