import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import CarouselCard from './CarouselCard';
import { initalState } from './data';
import React from 'react';
import bg1 from '../../brands/bg-1.jpg'
import bg2 from '../../brands/bg-2.jpg'
import bg3 from '../../brands/bg-3.jpg'

const CarouselList = () => {


  return (

    <div>
      <div
        id="carouselDarkVariant"
        className="relative"
        data-te-carousel-init
        data-te-carousel-slide>
        {/* <!-- Carousel indicators --> */}
        <div
          className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators>
          <button
            data-te-target="#carouselDarkVariant"
            data-te-slide-to="0"
            data-te-carousel-active
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            aria-current="true"
            aria-label="Slide 1"></button>
          <button
            data-te-target="#carouselDarkVariant"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            data-te-slide-to="1"
            aria-label="Slide 1"></button>
          <button
            data-te-target="#carouselDarkVariant"
            className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
            data-te-slide-to="2"
            aria-label="Slide 1"></button>
        </div>

        {/* <!-- Carousel items --> */}
        <div
          className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {/* <!-- First item --> */}
          <div
            className="relative float-left -mr-[100%] w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade
            data-te-carousel-item
            data-te-carousel-active>
            <img
              src={bg1}
              className="block w-full"
              alt="Motorbike Smoke" />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          {/* <!-- Second item --> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade
            data-te-carousel-item>
            <img
              src={bg2}
              className="block w-full"
              alt="Mountaintop" />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          {/* <!-- Third item --> */}
          <div
            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            data-te-carousel-fade
            data-te-carousel-item>
            <img
              src={bg3}
              className="block w-full"
              alt="Woman Reading a Book" />
            <div
              className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-black md:block">
              <h5 className="text-xl">Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>

        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselDarkVariant"
          data-te-slide="prev">
          <span className="inline-block h-8 w-8 dark:grayscale">
            <FiChevronLeft className="h-6 w-6" />
          </span>
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Previous</span>
        </button>
        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselDarkVariant"
          data-te-slide="next">
          <span className="inline-block h-8 w-8 dark:grayscale">
            <FiChevronRight className="h-6 w-6" />

          </span>
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Next</span>
        </button>
      </div>
    </div>
  );
};

export default CarouselList;