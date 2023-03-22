import React from 'react';
import product8 from '../../data/product8.jpg';
import avatar from '../../data/avatar.jpg';

const DetailCard = () => {
  return (
    <div className="mt-5">
      <div
        className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
        style={{ height: "24em" }}
      >
        <div
          className="absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <img
          src={product8}
          className="absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <a
            href="#"
            className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
          >
            Bike Engine
          </a>
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            Bike Engine: Understanding the Heart of Your Motorcycle
          </h2>
          <div className="flex mt-3">
            <img
              src={avatar}
              className="h-10 w-10 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="font-semibold text-gray-200 text-sm">
                {" "}
                Ketema Girma{" "}
              </p>
              <p className="font-semibold text-gray-400 text-xs"> 22 March </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        <p className="pb-6">
          If you own a motorcycle, you already know how thrilling it can be to
          ride one. The freedom, the rush of wind in your face, the sense of
          adventure – it’s a feeling that’s hard to beat. But have you ever
          stopped to think about what makes your motorcycle go? The answer is
          simple: the bike engine. The engine is the heart of your motorcycle,
          responsible for generating the power that propels the bike forward.
          It’s a complex piece of machinery that requires a lot of knowledge and
          skill to design and build. In this article, we’ll take a closer look
          at bike engines, how they work, and what makes them so special.
        </p>
        <h2 className="text-2xl text-gray-800 font-semibold mb-4 mt-4">
          Types Of Engine
        </h2>
        <h3 className="text-xl text-gray-800 font-semibold mb-4 mt-4">
          1. Single-Cylinder Engines
        </h3>
        <p className="pb-6">
          There are several different types of bike engines, each with its own
          unique characteristics. Here are some of the most common types:
          Single-cylinder engines are the simplest and most common type of bike
          engine. They consist of just one cylinder and are typically found on
          smaller, more affordable motorcycles. Single-cylinder engines are
          known for their efficiency and reliability, but they don’t provide as
          much power as larger engines.
        </p>
        <h3 className="text-xl text-gray-800 font-semibold mb-4 mt-4">
          2. Twin-Cylinder Engines
        </h3>
        <p className="pb-6">
          Twin-cylinder engines have two cylinders arranged in a V shape.
          They’re more powerful than single-cylinder engines and are often found
          on mid-range motorcycles. Twin-cylinder engines are also smoother and
          more refined than single-cylinder engines, making them a popular
          choice among riders.
        </p>
        <h3 className="text-xl text-gray-800 font-semibold mb-4 mt-4">
          3. Four-Cylinder Engines
        </h3>
        <p className="pb-6">
          Four-cylinder engines have four cylinders arranged in a straight line.
          They’re the most powerful type of bike engine and are typically found
          on high-performance motorcycles. Four-cylinder engines are known for
          their smoothness and responsiveness, but they’re also more expensive
          and harder to maintain than smaller engines.
        </p>
        

        <div className="border-l-4 border-gray-500 pl-4 mb-6 italic rounded">
          Finally, bike engines are special because they’re the key to the
          unique riding experience that only a motorcycle can provide. The sound
          and feel of a bike engine revving up, the acceleration and speed, the
          wind rushing past – all of these elements come together to create a
          one-of-a-kind sensation that can’t be replicated by any other mode of
          transportation.
        </div>
       
      </div>
    </div>
  );
};

export default DetailCard;
