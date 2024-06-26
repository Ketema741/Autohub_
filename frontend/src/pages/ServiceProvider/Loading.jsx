import React from 'react';

const Loading = () => {
    return (
        <div className="mb-8 p-4 group space-y-8 border-t-4 bg-white shadow-md border-gray-100 dark:border-gray-800">
            <div className="animate-pulse flex flex-col space-x-4 space-y-8">
                <div
                    className="object-cover bg-slate-400 w-full mb-4 overflow-hidden h-56 transition duration-500 hover:scale-105"                >
                </div>
                <div className="p-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                    <p className="p-1 text-center mx-auto"></p>

                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="flex justify-center item-center h-12 w-12 rounded-full bg-slate-700 ">{"."}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
