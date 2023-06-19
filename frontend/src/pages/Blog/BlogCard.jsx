import React, { useContext } from 'react';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import BlogContext from './../../context/blog/blogContext';
import placeHolder from '../../assets/undraw_city_driver_re_9xyv.svg'

const BlogCard = ({ blogPost }) => {
  const blogContext = useContext(BlogContext)
  const { getBlog } = blogContext
  const navigate = useNavigate()

  const handleView = () => {
    getBlog(blogPost._id, blogPost.category)
    navigate(`/blog/${blogPost._id}`)
  }
  const { currentColor } = useStateContext();
  return (
    <div className=" flex flex-col items-start rounded-xl shadow-xl bg-white overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
      <div className="relative w-full">
        {blogPost.blogImages &&
          <img src={blogPost.blogImages.length > 0 ? blogPost.blogImages[0] : placeHolder} className="object-cover w-full mb-4 overflow-hidden max-h-56 transition duration-500 hover:scale-105" />
        }

        <div className="p-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
          <p className="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>{blogPost?.category}</p>
        </div>
      </div>
      <div className="pl-3 pb-1">
        <a className="text-lg font-bold sm:text-xl md:text-2xl">{blogPost?.title}</a>
        <p className="mt-2 text-sm text-black">{blogPost?.excerpt}</p>
        <div className="pt-2 pr-0 pb-0 pl-0">
          <div className="pt-2 pr-0 pb-0 pl-0">
            <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
              <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">{blogPost?.author?.firstName}</a>
              <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
            </a>
            <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
            </p>
          </div>

          <div className="flex items-center flex-wrap p-3">
            <button onClick={handleView} type='button' className=" text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard