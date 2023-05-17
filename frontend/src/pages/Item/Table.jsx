import React from 'react';
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Dropdown = ({ label, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="py-4">
            <button
                className="flex justify-between items-center w-full"
                onClick={handleClick}
            >
                <span className="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">{label}</span>
                {isOpen ?
                    <div className="mr-3 rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <BsChevronUp />
                    </div>
                    :
                    <div className="mr-3 rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <BsChevronDown />
                    </div>}
            </button>
            {isOpen && <div className="mt-2">{content}</div>}
        </div>
    );
}

const DropdownContainer = () => {
    return (
        <div className="mt-20 flex justify-center">
            <div className="w-full md:w-3/4  bg-gray-100 rounded shadow-lg overflow-hidden">
                <p className="p-5 font-semibold text-xl text-center">
                    Detail Description
                </p>
                <section className="shadow row border-gray-200">
                    <div className="border-b">
                        <Dropdown
                            label="Brand"
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">The brand or manufacturer of the item</li>
                                    <li className="pb-2">
                                        The brand or manufacturer of the item
                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Model "
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">
                                        The model of the item
                                    </li>
                                    <li className="pb-2">
                                        The model of the item
                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Type Of The Item"
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">Truck</li>
                                    <li className="pb-2">
                                        The type of the item (e.g. SUV, sedan, truck, etc.)
                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Manufacturing Date"
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">Year</li>
                                    <li className="pb-2">
                                        The year the item was manufactured                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Description"
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">Description</li>
                                    <li className="pb-2">
                                        A detailed description of the item
                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Availability"
                            content={
                                <ul className="pl-4">
                                    <li className="pb-2">Availability</li>
                                    <li className="pb-2">
                                        Whether the item is currently available for purchase or
                                        not
                                    </li>
                                    <li className="pb-2">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>

                </section>
            </div>
        </div>
    );
}

export default DropdownContainer
