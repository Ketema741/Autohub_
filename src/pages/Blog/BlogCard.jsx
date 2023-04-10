import React from "react";
import { NavLink } from 'react-router-dom'
import { useStateContext } from "../../context/ContextProvider";

// const BlogCard = () => {

//   return (
//     <section className="text-gray-600 body-font">
//       <div className="container px-5 py-24 mx-auto">
//         <div className="flex flex-wrap -m-4">
//           <div className="p-4 md:w-1/3">
//             <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
//               <img
//                 className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
//                 src="https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
//                 alt="blog"
//               />
//               <div className="p-6">
//                 <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                   CATEGORY-1
//                 </h2>
//                 <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
//                   The Catalyzer
//                 </h1>
//                 <p className="leading-relaxed mb-3">
//                   Photo booth fam kinfolk cold-pressed sriracha leggings
//                   jianbing microdosing tousled waistcoat.
//                 </p>
//                 <div className="flex items-center flex-wrap p-3">
//                   <NavLink to='/blog-detail' className="bg-gradient-to-r text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{backgroundColor:currentColor}}>
//                     Learn more
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>


//           <div className="p-4 md:w-1/3">
//             <div className="h-full rounded-xl shadow-cla-violate bg-gradient-to-r from-pink-50 to-red-50 overflow-hidden">
//               <img
//                 className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
//                 src="https://images.unsplash.com/photo-1624628639856-100bf817fd35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
//                 alt="blog"
//               />
//               <div className="p-6">
//                 <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                   CATEGORY-1
//                 </h2>
//                 <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
//                   The Catalyzer
//                 </h1>
//                 <p className="leading-relaxed mb-3">
//                   Photo booth fam kinfolk cold-pressed sriracha leggings
//                   jianbing microdosing tousled waistcoat.
//                 </p>
//                 <div className="flex items-center flex-wrap p-3">
//                   image.png
//                 </div>
//               </div>
//             </div>
//           </div>


//           <div className="p-4 md:w-1/3">
//             <div className="h-full rounded-xl shadow-cla-pink bg-gradient-to-r from-fuchsia-50 to-pink-50 overflow-hidden">
//               <img
//                 className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
//                 src="https://images.unsplash.com/photo-1631700611307-37dbcb89ef7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
//                 alt="blog"
//               />
//               <div className="p-6">
//                 <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                   CATEGORY-1
//                 </h2>
//                 <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
//                   The Catalyzer
//                 </h1>
//                 <p className="leading-relaxed mb-3">
//                   Photo booth fam kinfolk cold-pressed sriracha leggings
//                   jianbing microdosing tousled waistcoat.
//                 </p>
//                 <div className="flex items-center flex-wrap p-3">
// <NavLink to='/blog-detail' className="bg-gradient-to-r from-fuchsia-300 to-pink-400 hover:scale-105  shadow-cla-blue px-4 py-1 rounded-lg">
//   Learn more
// </NavLink>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogCard;

import { FaClock } from 'react-icons/fa';

import prodcut1 from '../../data/product1.jpg'
import prodcut2 from '../../data/product2.jpg'
import prodcut3 from '../../data/product3.jpg'
import prodcut4 from '../../data/product4.jpg'
import prodcut5 from '../../data/product5.jpg'

function BlogPost() {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  return (
    <div className="mt-20 text-gray-900  pr-0 pb-14 pl-0">
      <div className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
        <div className="flex flex-col items-center sm:px-5 md:flex-row">
          <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
            <div className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16 md:space-y-5">
              <div className=" bg-blue-500 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2 uppercase ">
                <p className="inline mr-1">
                  <FaClock />
                </p>
                <p className="inline text-xs font-medium">New</p>
              </div>
              <a className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">Write anything. Be creative.</a>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <p className="text-sm font-medium inline">author:</p>
                <a className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1 underline">Ketema G:</a>
                <p className="inline text-sm font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                <p className="text-gray-200 text-sm font-medium inline mt-0 mr-1 mb-0 ml-1">1hr 20min. read</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="block">
              <img
                src={prodcut1} className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 sm:px-5 gap-x-8 gap-y-16">
          <div class=" flex flex-col items-start rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
            <div class="relative w-full">
              <img src={prodcut5} className="object-cover w-full mb-4 overflow-hidden shadow-sm max-h-56" />
              <div class="p-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                <p class="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>Travel</p>
              </div>
            </div>


            <div className="pl-3 pb-1">
              <a class="text-lg font-bold sm:text-xl md:text-2xl">Explore the world's hidden gems</a>
              <p class="mt-2 text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                    <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Betselot T.</a>
                    <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                  </a>
                  <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
                  </p>
                </div>

                <div className="flex items-center flex-wrap p-3">
                  <NavLink to='/blog-detail' className=" text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div class=" flex flex-col items-start rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
            <div class="relative w-full">
              <img src={prodcut2} className="object-cover w-full mb-4 overflow-hidden shadow-sm max-h-56" />
              <div class="p-1 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                <p class="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>Travel</p>
              </div>
            </div>


            <div className="pl-3 pb-1">
              <a class="text-lg font-bold sm:text-xl md:text-2xl">Explore the world's hidden gems</a>
              <p class="mt-2 text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                    <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Betselot T.</a>
                    <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                  </a>
                  <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
                  </p>
                </div>

                <div className="flex items-center flex-wrap p-3">
                  <NavLink to='/blog-detail' className="  text-white hover:scale-105  px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div class=" flex flex-col items-start rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
            <div class="relative w-full">
              <img src={prodcut3} className="object-cover w-full mb-4 overflow-hidden shadow-sm max-h-56" />
              <div class="p-1 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                <p class="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>Travel</p>
              </div>
            </div>


            <div className="pl-3 pb-1">
              <a class="text-lg font-bold sm:text-xl md:text-2xl">Explore the world's hidden gems</a>
              <p class="mt-2 text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                    <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Betselot T.</a>
                    <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                  </a>
                  <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
                  </p>
                </div>

                <div className="flex items-center flex-wrap p-3">
                  <NavLink to='/blog-detail' className=" text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div class=" flex flex-col items-start rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
            <div class="relative w-full">
              <img src={prodcut4} className="object-cover w-full mb-4 overflow-hidden shadow-sm max-h-56" />
              <div class="p-1 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                <p class="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>Travel</p>
              </div>
            </div>


            <div className="pl-3 pb-1">
              <a class="text-lg font-bold sm:text-xl md:text-2xl">Explore the world's hidden gems</a>
              <p class="mt-2 text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                    <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Betselot T.</a>
                    <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                  </a>
                  <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
                  </p>
                </div>

                <div className="flex items-center flex-wrap p-3">
                  <NavLink to='/blog-detail' className=" text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div class=" flex flex-col items-start rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden col-span-12 space-y-3 sm:col-span-6 xl:col-span-4 ">
            <div class="relative w-full">
              <img src={prodcut5} className="object-cover w-full mb-4 overflow-hidden shadow-sm max-h-56" />
              <div class="p-1 absolute bottom-0 left-1/2 transform -translate-x-1/2 mx-auto w-1/2  text-white bg-opacity-83 rounded-sm">
                <p class="p-1 text-center mx-auto" style={{ backgroundColor: "#101d2c" }}>Travel</p>
              </div>
            </div>


            <div className="pl-3 pb-1">
              <a class="text-lg font-bold sm:text-xl md:text-2xl">Explore the world's hidden gems</a>
              <p class="mt-2 text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="pt-2 pr-0 pb-0 pl-0">
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">
                    <a className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-0 underline">Betselot T.</a>
                    <p className="inline text-xs font-medium mt-0 mr-1 mb-0 ml-1">· 10th, April 2023 ·</p>
                  </a>
                  <p className="inline text-xs font-medium text-gray-300 mt-0 mr-1 mb-0 ml-1">1hr 20min.
                  </p>
                </div>

                <div className="flex items-center flex-wrap p-3">
                  <NavLink to='/blog-detail' className=" text-white hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg" style={{ backgroundColor: currentColor }}>
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default BlogPost