import React, { useContext, useEffect } from 'react';

import { useStateContext } from '../../context/ContextProvider';
import ItemContext from '../../context/item/itemContext';
import ItemCard from './ItemCard'

const Items = () => {
    const { currentColor } = useStateContext();

    const itemContext = useContext(ItemContext)
    const { filtered, publicItems, getPublicItems, loading } = itemContext


    useEffect(() => {
        getPublicItems()
    }, []);

    return (
        <div tabIndex={0} className="focus:outline-none px-8">
            <div className="mx-auto container pt-24 ">
                <div className="flex flex-wrap items-center lg:justify-between justify-center">
                    {publicItems && publicItems.map((item) => (
                        <ItemCard item={item} currentColor={currentColor} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Items;
