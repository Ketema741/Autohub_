import React from 'react';

const ItemInfo = ({ item }) => {
    return (
        <div>
            <div className="block sm:flex lg:flex items-center justify-center">
                <div className="mt-4 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
                    <div className="text-2xl font-medium">20%</div>
                    <div className="block text-sm text-gray-600 mt-2">discount</div>
                </div>
                <div className="mt-4 mb-8 sm:m-8 md:m-0 md:mt-4 md:mb-8 lg:m-8 text-center">
                    <div className="text-2xl font-medium">234 ETB</div>
                    <div className="block text-sm text-gray-600 mt-2">price</div>
                </div>
            </div>
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
                            <tbody className="divide-y divide-gray-200 bg-white">
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
        </div>
    )
}

export default ItemInfo 