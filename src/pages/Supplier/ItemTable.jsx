import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

import { DeleteWarning } from '../../components';
import { useStateContext } from '../../context/ContextProvider';

const ItemTable = ({ supplierItems }) => {
    const [showWarning, setShowWarning] = useState(false);
    const {
        currentColor
    } = useStateContext();

    // const handleDelete = () => {
    //   onDelete();
    //   setShowWarning(false);
    // };

    return (
        <div className="mt-24 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <div className="table-container overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Image</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Item Price</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Rating</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    {supplierItems.map((item) => (
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            <tr className="hover:bg-gray-50">
                                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                    <div className="relative h-20 w-20">
                                        <img
                                            className="h-full w-full rounded-md object-cover object-center"
                                            src={item.ProductImage}
                                            alt={item.ItemName}
                                        />
                                    </div>
                                </th>
                                <td className="px-6 py-4">{item.ItemName}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        {item.Status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                                            {item.Price} ETB
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                                            20% off
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">
                                            5
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-4">
                                        <button type="button" style={{ color: currentColor }} onClick={() => setShowWarning(true)}>
                                            <FaTrashAlt />
                                        </button>
                                        <Link to="edit-item-detail" style={{ color: currentColor }}>
                                            <FaEdit />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>))}
                </table>
                {showWarning && <DeleteWarning setShowWarning={setShowWarning} />}
            </div>
        </div>
    )
}

export default ItemTable