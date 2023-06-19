import React, { useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../../context/ContextProvider';
import { DeleteWarning } from '../../../components';
import EditForm from './EditForm';
import { toast } from 'react-toastify';

const Posts = ({ blog, deleteBlog }) => {

    const { currentColor } = useStateContext();
    const [showWarning, setShowWarning] = useState(false);

    const [editItem, setEditItem] = useState(false);

    const handleDeleteConfrim = () => {
        deleteBlog(blog._id);
        toast.dismiss();
    }
    const handleDelete = () => {
        toast.dark(
            <div className="flex flex-col items-center">
                <div className="mr-2">Are you sure you want to delete this item?</div>
                <div className="flex items-center">
                    <button
                        className=" bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={handleDeleteConfrim}
                    >
                        Delete
                    </button>
                    <button
                        className="marker:bg-gray-300 hover:bg-gray-400 bg-gray-300 text-gray-700 px-3 py-1 rounded ml-2"
                        onClick={() => {
                            toast.dismiss();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                autoClose: false,
                draggable: false,
            }
        );
    };


    return (
        <div className="w-50 bg-white p-3 rounded-xl shadow-xl ">
            <img className="h-52 w-full object-cover" src={blog.blogImages?.length > 0 ? blog.blogImages[0] : "https://i.imgur.com/5yeBVeM.jpeg"} alt="example image 1" />

            <div className="z-0 mt-1 flex space-x-4 flex-wrap">
                <TooltipComponent content="Delete" position="BottomCenter">
                    <button
                        type="button"
                        onClick={handleDelete}
                        style={{ color: currentColor }}
                        className="z-0 relative text-xl rounded-full hover:bg-light-gray"
                    >
                        <FaTrashAlt />
                    </button>
                </TooltipComponent>
                <TooltipComponent content="Edit" position="BottomCenter">
                    <button
                        type="button"
                        onClick={() => setEditItem(!editItem)}
                        style={{ color: currentColor }}
                        className="relative text-xl rounded-full hover:bg-light-gray"
                    >
                        <FiEdit />
                    </button>
                </TooltipComponent>

            </div>

            <h3 className="py-4 text-2xl font-semibold text-gray-800 dark:text-white">
                {blog.title}
            </h3>
            <p className=" mb-6 text-gray-600 dark:text-gray-300">
                {blog.excerpt}
            </p>

            {editItem && <EditForm currentColor={currentColor} setEditItem={setEditItem} blog={blog} />}
            {showWarning && <DeleteWarning handleDelete={handleDelete} setShowWarning={setShowWarning} />}
        </div>

    );
}
export default Posts