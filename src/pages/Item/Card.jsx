import React from "react";


const Card = ({ item }) => {

    return (
        <div className="item bg-white w-[200px] h-[350px] m-2 rounded-lg shadow-lg">
            <div className="top">
                <img
                    className="w-[200px] h-[200px] object-cover  p-2"
                    src={item.image}
                    alt="img"
                />
            </div>
            <div className="bottom flex flex-col justify-center items-start p-3 bg-">
                <div className="title font-semibold text-xs my-1">
                    {item.title}
                </div>
                <div className="category text-xs font-light my-1">
                    5.4 cm (6.1-inch) display1
                </div>

                <div className="pricing flex items-center">
                    {" "}
                    <div className="price ">{item.price} ETB</div>
                    <div className="ml-2 text-xs ">
                        $<del>1320</del>
                    </div>
                </div>
                <div className="flex items-center my-2">
                    <button className="border px-3 py-1 text-xs rounded-lg mr-1 ">
                        Buy Now
                    </button>
                    <button className="border px-3 py-1 text-xs rounded-lg ">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;