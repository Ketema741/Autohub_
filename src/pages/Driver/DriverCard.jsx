import React from 'react';


const DriverCard = () => {

    return (
        <div className="holder">
            <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                <img className="max-h-20 w-full opacity-80 absolute top-0"   src="https://unsplash.com/photos/h0Vxgz5tyXA/download?force=true&w=640" alt="" />
                <div className="profile w-full flex m-3 ml-4 text-black">
                    <img className="w-28 h-28 p-1 bg-white rounded-full" style={{ zIndex: 0 }} style={{ zIndex: 0 }} src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt=""/>
                    <div className="title mt-11 ml-3 font-bold flex flex-col">
                        <div className="name break-word" style={{ zIndex: 1 }}>Sarah</div>
                        {/* add [dark] className for bright background  */}
                        <div className="add font-semibold text-sm italic dark">Model</div>
                    </div>
                    </div>
                    <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                    <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Contact</div>
                </div>
            </div>
            {/* <!-- card end --> */}
            <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                <img className="max-h-20 w-full opacity-80 absolute top-0"  src="https://unsplash.com/photos/iFPBRwZ4I-M/download?force=true&w=640" alt="" />
                <div className="profile w-full flex m-3 ml-4 text-black">
                    <img className="w-28 h-28 p-1 bg-white rounded-full" style={{ zIndex: 0 }} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt=""/>
                    <div className="title mt-11 ml-3 font-bold flex flex-col">
                        <div className="name break-words " style={{ zIndex: 1 }}>Ricky</div>
                        <div className="add font-semibold text-sm italic dark">Designer</div>
                    </div>
                    </div>
                    <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                    <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Contact</div>
                </div>
            </div>
            {/* <!-- card end --> */}
            <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                <img className="max-h-20 w-full opacity-80 absolute top-0"   src="https://unsplash.com/photos/w1_4YH5IhDg/download?force=true&w=640" alt="" />
                <div className="profile w-full flex m-3 ml-4 text-black">
                <img className="w-28 h-28 p-1 bg-white rounded-full" style={{ zIndex: 0 }} src="https://i.imgur.com/JFHjdNr.jpg" alt=""/>
                <div className="title mt-11 ml-3 font-bold flex flex-col">
                    <div className="name break-words " style={{ zIndex: 1 }}>Dexter</div>
                    {/* <!--  add [dark] className for bright background --> */}
                    <div className="add font-semibold  text-sm italic dark">Director</div>
                </div>
                </div>
                <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Contact</div>
                </div>
            </div>
            {/* <!-- card end --> */}
            <div className="card border w-96 hover:shadow-none relative flex flex-col mx-auto shadow-lg m-5">
                <img className="max-h-20 w-full opacity-80 absolute top-0" src="https://unsplash.com/photos/TMxUnMAAwFA/download?force=true&w=640" alt="" />
                <div className="profile w-full flex m-3 ml-4 text-white">
                <img className="w-28 h-28 p-1 bg-white rounded-full" style={{ zIndex: 0 }} src="https://i.imgur.com/zLCYdR9.jpg" alt=""/>
                <div className="title mt-11 ml-3 font-bold flex flex-col">
                    <p className="name break-words  text-black" style={{ zIndex: 1 }}>Jhon</p>
                    {/* <!--  add [dark] className for bright background --> */}
                    <div className="add font-semibold text-sm italic text-black dark">CEO</div>
                </div>
                </div>
                <div className="buttons flex absolute bottom-0 font-bold right-0 text-xs text-gray-500 space-x-0 my-3.5 mr-3">
                <div className="add border rounded-l-2xl rounded-r-sm border-gray-300 p-1 px-4 cursor-pointer hover:bg-gray-700 hover:text-white">Contact</div>
                </div>
            </div>
        {/* <!-- card end --> */}
        </div>
    )
}

export default DriverCard