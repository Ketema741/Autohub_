

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
                <span className="py-2 pl-4 pr-3 text-left text-base font-semibold text-gray-900">{label}</span>
                {isOpen ?
                    <div class="mr-3 rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <BsChevronUp />
                    </div>
                    :
                    <div class="mr-3 rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
                        <BsChevronDown />
                    </div>}
            </button>
            {isOpen && <div className="mt-2">{content}</div>}
        </div>
    );
}

const FAQCard = () => {
    return (
        <div className="mt-20 flex justify-center">
            <div className="w-full md:w-3/4  bg-gray-100 rounded shadow-lg overflow-hidden">
                <div class="flex flex-col items-center">
                    <h2 class="font-bold text-5xl mt-5 tracking-tight">
                        FAQ
                    </h2>
                    <p class="text-neutral-500 text-xl mt-3">
                        Frequenty asked questions
                    </p>
                </div>
                <section className="shadow row border-gray-200">
                    <div className="border-b">
                        <Dropdown
                            label="What types of vehicles can I sell on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        AutoHub allows you to sell all types of vehicles including cars, trucks, SUVs, motorcycles, boats, and more.                                    </li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="How do I create a seller account on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        To create a seller account on AutoHub, you need to visit the AutoHub website and click on the "Sell My Vehicle" button. Then, follow the steps to create your account.                                    </li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="How do I list my vehicle for sale on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">To list your vehicle for sale on AutoHub, you need to create a seller account and then provide the details of your vehicle such as make, model, year, mileage, and price. You can also upload photos of your vehicle.</li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="How do I edit or delete my vehicle listing on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">To edit or delete your vehicle listing on AutoHub, you need to log in to your seller account and navigate to the "My Listings" section. From there, you can edit the details of your listing or delete it.</li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="How do I search for vehicles on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">To search for vehicles on AutoHub, you can use the search bar on the AutoHub website to enter specific details such as make, model, year, price, and location. You can also use the advanced search options to narrow down your search.</li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                                        Viverra orci sagittis eu volutpat odio facilisis mauris
                                    </li>
                                </ul>
                            }
                        />
                    </div>
                    <div className="border-b">
                        <Dropdown
                            label="Can I sell accessories on AutoHub?"
                            content={
                                <ul className="pl-4">
                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">Yes, you can sell accessories on AutoHub. You need to create a seller account and then list your accessories for sale by providing details such as type, brand, and price.</li>

                                    <li className="text-neutral-600 mt-3 group-open:animate-fadeIn">
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

export default FAQCard
