import React, { Fragment, useContext, useEffect } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import ItemContext from '../../context/item/itemContext';
import ItemCard from './ItemCard'
import { brands } from '../../data/dummy';
import Loading from './Loading';
import CarCard from './CarCard';

const Items = () => {
    const { currentColor } = useStateContext();

    const itemContext = useContext(ItemContext)
    const { filtered, cars, publicItems, getPublicItems, getCars } = itemContext


    useEffect(() => {
        getPublicItems()
        getCars()

    }, []);

    const RenderLoadings = () => {
        const loadings = [];

        for (let i = 0; i < 10; i++) {
            loadings.push(<Loading key={i} />);
        }

        return loadings;
    };

    return (
        <div className="focus:outline-none px-8">
            <div className="mx-auto container pt-24 ">
                {publicItems !== null ? (
                    <div className="flex flex-wrap gap-x-2 gap-y-8 items-center justify-center">
                        <Fragment>
                            {filtered !== null ?
                                filtered?.map((item) => (
                                    <ItemCard item={item} key={item._id} currentColor={currentColor} />
                                ))
                                :
                                publicItems.map((item) => (
                                    <ItemCard item={item} key={item._id} currentColor={currentColor} />
                                ))
                            }

                        </Fragment>
                    </div>
                )
                    :
                    <div className="mx-8 grid gap-32 py-4 md:grid-cols-3 md:gap-12">
                        <RenderLoadings />
                    </div>
                }
                <div className="container pt-24">
                    <div className="flex justify-center m-8">
                        <p className="text-2xl font-bold">Popular Brands </p>
                    </div>
                    <div className="flex m-3 flex-wrap justify-center gap-1 items-center text-center">
                        {brands && brands.map((item) => (
                            <div key={item.id} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-52  p-5 pt-9 rounded-2xl transition duration-500 hover:scale-105 hover:shadow-inner" >
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

                    {cars.length > 0 ? (
                        <div className="mt-24 flex flex-wrap gap-x-2 gap-y-8 items-center justify-center">
                            <Fragment>
                                {cars !== null &&
                                    cars.map((car) => (
                                        <CarCard key={car._id} item={car} currentColor={currentColor} />
                                    ))
                                }
                            </Fragment>
                        </div>
                    )
                        :
                        <div className="mx-8 grid gap-32 py-4 md:grid-cols-3 md:gap-12">
                            <RenderLoadings />
                        </div>
                    }

                </div>

            </div>

        </div>

    );
};

export default Items;
