import React, { Fragment, useContext, useEffect } from 'react';

import { useStateContext } from '../../context/ContextProvider';
import ItemContext from '../../context/item/itemContext';
import ItemCard from './ItemCard'
import CarouselList from './CarouselList'
import { brands } from '../../data/dummy';
import { Carousel, initTE } from "tw-elements";
initTE({ Carousel });

const Items = () => {
    const { currentColor } = useStateContext();

    const itemContext = useContext(ItemContext)
    const { filtered, publicItems, getPublicItems, loading } = itemContext


    useEffect(() => {
        getPublicItems()
        
    }, []);

    return (
        <div className="focus:outline-none px-8">
            <div className="mx-auto container pt-24 ">
                <div className="flex flex-wrap gap-x-2 gap-y-8 items-center justify-center">
                    {publicItems !== null ? (
                        <Fragment>
                            {filtered !== null ?
                                filtered.map((item) => (
                                    <ItemCard item={item} currentColor={currentColor} />
                                ))
                                :
                                publicItems.data.map((item) => (
                                    <ItemCard item={item} currentColor={currentColor} />
                                ))
                            }

                        </Fragment>
                    )
                        :
                        <div>loading...</div>
                    }

                </div>
                <div className="container pt-24">
                    <div className="flex justify-center m-8">
                        <p className="text-2xl font-bold">Popular Brands </p>
                    </div>
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center text-center">
                        {brands.map((item) => (
                            <div key={item.id} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-52  p-5 pt-9 rounded-2xl " >
                                <button
                                    type="button"
                                    style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                    className="text-4xl opacity-0.9 rounded-full  p-7 hover:drop-shadow-xl"
                                >
                                    {item.icon}
                                </button>
                                <p className="mt-3">
                                    <span className="text-lg font-semibold">{item.title}</span>
                                    <span className={`text-sm text-${item.pcColor} ml-2`}>
                                        {item.percentage}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* <CarouselList /> */}
            </div>

        </div>

    );
};

export default Items;
