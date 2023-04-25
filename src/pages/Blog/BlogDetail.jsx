import React, { useEffect, useState } from "react";


import { Navbar, Footer, Sidebar } from '../../components';
import DetailCard from './DetailCard';
import CommentSection from './Comment'
import { useStateContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom'

import bg from '../../data/product1.jpg'
import blogbg from '../../brands/blog/bg7.jpg'
// 2 7 11 16
import resume from '../../brands/undraw_road_to_knowledge_m8s0.svg'



const BlogDetail = () => {
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text: event.target.comment.value,
      replies: [],
    };
    setComments([...comments, newComment]);
    event.target.comment.value = '';
  };

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();
    const newReply = {
      id: comments[commentId - 1].replies.length + 1,
      text: event.target.reply.value,
    };
    const updatedComments = [...comments];
    updatedComments[commentId - 1].replies.push(newReply);
    setComments(updatedComments);
    event.target.reply.value = '';
  };

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative   dark:bg-main-dark-bg">

        {activeMenu ? (
          <div className="w-52 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg min-h-screen md:ml-52 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }


        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div className="mt-4 container mx-auto">


            <div className=" relative pt-16 pb-4 lg:pt-24 dark:bg-gray-900">
              <div className="relative xl:container m-auto px-6 md:px-12 lg:px-6">
                <h1 className="sm:mx-auto sm:w-10/12 md:w-2/3 font-black text-blue-900 text-3xl text-center sm:text-4xl md:text-5xl lg:w-auto lg:text-left xl:text-6xl dark:text-white">
                  A Journey of Growth and Success.
                  <span className="lg:block hidden"></span>

                  <span className="relative text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                    Discover the Insights and Tips on Our Blog!

                  </span>
                </h1>
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url(${blogbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              className="container mx-auto p-10 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                  <DetailCard />
                  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-14">
                      <img
                        alt='autho name'

                        className="h-24 w-24 align-middle rounded-full"
                        src={resume}
                      />
                    </div>
                    <h3 className="text-white mt-4 mb-4 text-xl font-bold">Ketema Girma</h3>
                    <p className="text-white text-ls">autho bio</p>
                  </div>

                  <CommentSection />

                </div>
                <div className="lg:col-span-4 col-span-1">
                  <div className="lg:sticky relative top-8">
                    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Related Posts</h3>
                      {/* {relatedPosts.map((post, index) => ( */}
                      <div className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                          <img src={bg} alt='{post.title}' className="h-14 w-14 align-middle bg-gray-200 rounded-full" />
                        </div>
                        <div className="flex-grow ml-4">
                          <p className="text-gray-500 font-xs">34hr ago</p>
                          <Link to={`/post/post`} className="text-md">Trip  </Link>
                        </div>
                      </div>
                      <div className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                          <img src={resume} alt='{post.title}' className="h-14 w-14 align-middle bg-gray-200 rounded-full" />
                        </div>
                        <div className="flex-grow ml-4">
                          <p className="text-gray-500 font-xs">34hr ago</p>
                          <Link to={`/post/post`} className="text-md">How car engine malfunction</Link>
                        </div>
                      </div>
                      {/* ))} */}
                    </div>
                    {/* <Categories /> */}
                    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
                      {/* {categories.map((category, index) => ( */}
                      <Link to={`/category/slug`}>
                        <span className={`cursor-pointer block border-b pb-3 mb-3`}>Motorciyle</span>
                      </Link>
                      <Link to={`/category/slug`}>
                        <span className={`cursor-pointer block border-b pb-3 mb-3`}>Sports</span>
                      </Link>
                      <Link to={`/category/slug`}>
                        <span className={`cursor-pointer block border-b-0 pb-3 mb-3`}>Trip</span>
                      </Link>
                      {/* ))} */}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 max-w-lg mx-auto my-8">
              {/* <Carousel /> */}

            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
