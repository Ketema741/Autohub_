import React from 'react';
import BlogTab from './BlogTab';

import resume from '../../brands/undraw_road_to_knowledge_m8s0.svg';
import Comment from './Comment';
const Parse = require('html-react-parser')


const DetailCard = ({ blog }) => {

  return (
    <div className="bg-white bg-opacity-50 p-4 mt-5 shadow-2xl rounded-t-lg">
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
        <img src={resume} className="w-full h-full z-0  rounded-t-md object-cover" />
        <div className="p-4 absolute bottom-0 left-0 z-20">

          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            Lets See {blog?.title}
          </h2>

        </div>
      </div>

      {blog.description &&
        <div id="detail" className="flex flex-col space-y-6 p-4 lg:px-0 mt-12 text-black max-w-screen-md mx-auto text-lg leading-relaxed">
          {Parse(blog.description)}
          {/* <BlogTab /> */}
        </div>
      }
    </div>
  );
};

export default DetailCard;
