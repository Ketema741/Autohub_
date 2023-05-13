import React from 'react';
import { AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BsPersonCircle, BsCheck2Circle } from 'react-icons/bs';
import { FiMessageSquare } from 'react-icons/fi';
import background from '../../brands/bg-3.jpg'


const Chat = () => {
    const MyComponent = () => {
        const cards = Array.from({ length: 100 }, (_, index) => (
            <a href='#' key={index} className="block border-b ">
                <div className={` border-l-2 ${index == 2 ? 'border-blue-500 bg-blue-100' : ' border-transparent hover:bg-gray-100'} p-3 space-y-4`}>
                    <div className='flex flex-row items-center space-x-2'>
                        <BsCheck2Circle className='h-4 w-4' />
                        <strong className='flex-grow text-sm'> Nicola Tesla</strong>
                        <div className='text-sm text-gray-600'>5hr</div>
                    </div>

                    <div className='flex flex-row space-x-1 items-center'>
                        <BsPersonCircle className='flex-none h-3 w-3' />
                        <div className='flex-grow truncate'> some message content will be here also I am going to participate in a hackaton</div>
                    </div>
                </div>
            </a>
        ));

        return <div>{cards}</div>;
    }



    const Message = () => {
        const cards = Array.from({ length: 10 }, (_, index) => (
            <div className={`flex  ${index % 2 !== 0 ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-2`}>
                <BsPersonCircle className='flex-none' />
                <div className='flex flex-col'>
                    <div className={`flex  ${index % 2 !== 0 ? 'flex-row-reverse bg-gray-200 ' : 'flex-row bg-blue-200'} space-x-2 rounded p-5`}>
                        some Conversation message goes here
                    </div>
                    <div className='text-sm text-gray-500'>5hr ago</div>
                </div>
            </div>
        ));

        return <div>{cards}</div>;
    }


    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <div className="flex flex-col justify-between flex-none w-16 bg-gray-200 p-3">
                <div className='flex flex-col space-y-4'>
                    <a className='relative'>

                        <FiMessageSquare className="rounded-full  w-8 h-8" />
                        <div className='absolute top-0 right-0 bg-red-500 w-4 h-4 text-xs text-white rounded-full text-center'>5</div>

                    </a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                </div>
                <div className='flex flex-col space-y-4'>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                    <a><div className="rounded-full bg-gray-400 w-8 h-8"></div></a>
                </div>
            </div>
            <div className="w-64 flex-none bg-gray-100 p-4 flex flex-col space-y-4">
                <div className='flex flex-row justify-between items-center mb-6'>
                    <h1 className='flex-auto font-semibold text-3xl'> Inbox</h1>
                    <AiOutlineSearch className='flex-none w-4 h-4' />
                </div>

                <div className='h-64 bg-red-200'></div>
                <div className='h-64 bg-red-200'></div>
            </div>

            <div className="flex flex-row flex-auto rounded-tl-lg border-l shadow-xl bg-white">
                <div className='flex flex-col w-1/5'>
                    <div className='flex-none h-24 bg-red-300'> top </div>
                    <div className='flex-auto overflow-y-auto'>
                        <MyComponent />
                    </div>
                </div>
                <div className='w-3/5 border-l border-r border-gray-400 flex flex-col'>
                    <div className='flex-none h-20 flex flex-row justify-between items-center p-5 border-b'>
                        <div className='flex flex-col spaxe-y-1'>
                            <strong> Nicola Tesla</strong>
                            <input type='text' placeholder='Add Conversation Title' className='text-sm text-black outline-none focus:boerder-b hover:boerder-b border-dashed placeholder-gray-600' />
                        </div>
                        <AiOutlineStar />
                    </div>
                    <div className="flex-auto overflow-y-auto p-5 space-4"
                        style={{
                            backgroundImage: `url(${background})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }} >

                        <Message />
                    </div>
                    <div className='flex-none h-40 p-4 pt-0'>
                        <textarea className='h-full w-full outline-none border hover:border-blue-600 focus:border-blue-600 shadow-lg rounded p-4'> Hi</textarea>
                    </div>
                </div>


                <div className='w-1/5 bg-gray-200'>second</div>
            </div>

        </div>
    )
}

export default Chat;