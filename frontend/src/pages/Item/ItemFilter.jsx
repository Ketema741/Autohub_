import React, { useContext, useEffect, useRef } from 'react';

import { FaSearch } from 'react-icons/fa';

import ItemContext from '../../context/item/itemContext';

const ItemFilter = () => {

    const itemContext = useContext(ItemContext)
    const text = useRef('')

    useEffect(() => {
        if (filtered == null) {
            text.current.value = ''
        }
    })

    // we just need the item dispatch without state.

    const { filterItems, clearFilter, filtered } = itemContext

    const onChange = (e) => {
        if (e.target.value !== '') {
            filterItems(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div className="relative flex items-center">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="w-full h-8 px-3 pr-8 text-sm font-medium placeholder-gray-400 border border-gray-200 rounded-full focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300"
                    placeholder="Search..."
                    onChange={onChange}
                    ref={text}
                />
                <button className="absolute right-2 top-20">
                    <FaSearch className="text-gray-400" />
                </button>
            </form>
        </div>

    );
};

export default ItemFilter;