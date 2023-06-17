import React from 'react';

const Loading = () => {
    return (
        <div className="mb-8 p-4 group space-y-8 border-t-4 bg-white shadow-md border-gray-100 dark:border-gray-800">
            <div className="animate-pulse flex flex-col space-x-4 space-y-8">
                <div className="mx-auto -mt-16 bg-slate-400 h-32 w-32 rotate-45 overflow-hidden rounded-[2rem]">
                    <div className="mx-auto h-full w-full -rotate-45 scale-125 object-cover transition duration-300 group-hover:scale-[1.4]"
                    >
                    </div>
                </div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
