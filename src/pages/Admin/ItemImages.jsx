import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

import product1 from '../../data/product1.jpg'
import product2 from '../../data/product2.jpg'
import product3 from '../../data/product3.jpg'
import product4 from '../../data/product4.jpg'
import product5 from '../../data/product5.jpg'


const itemImages = [
    {
        id: 1,
        imageSrc: product1,
    },
    {
        id: 2,
        imageSrc: product2,
    },
    {
        id: 3,
        imageSrc: product3,
    },
    {
        id: 4,
        imageSrc: product4,
    },
    {
        id: 5,
        imageSrc: product5,
    },
];

const ItemImages = () => {

    const handleDelete = (id) => {
        console.log(id)
    }

    return (
        <div className="flex min-h-screen w-full flex-wrap  p-5 bg-gray-200">
            <div className="grid grid-cols-2 gap-3">
                {itemImages.map((item) => (
                    <div key={item.id} className="w-35 bg-white p-3">
                        <img className="h-40 w-full object-cover" src={item.imageSrc} alt="item" />
                        <div className="mt-3 flex">
                            <div className="mr-auto">
                                <button onClick={() => handleDelete(item.id)} className=" text-gray-400 hover:text-gray-600">
                                    <RiDeleteBinLine  />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ItemImages;