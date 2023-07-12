import React, { useEffect } from 'react';
import { Navbar, Footer, Sidebar } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import Ketema from '../../brands/me.png'
import Gatwech from '../../data/avatar3.png'
import Betsi from '../../assets/betsilot.jpg'
import AboutUsCard from './AboutUsCard';
import Dema from '../../assets/dema.jpg'
const AboutUs = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,

  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  // const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className=" flex relative dark:bg-main-dark-bg">

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
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <AboutUsCard />

          <div className="py-20">
            <div className="xl:container mx-auto px-6 md:px-12">
              <div className="mb-16 md:w-2/3 lg:w-1/2">
                <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl">
                  AutoHub Developers
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our web app was built by a team of passionate developers with a mission to empower African students by providing them with career guidance and collaboration opportunities.
                  We believe that with the right resources and support, every student can achieve their full potential and make a positive impact in their community.
                </p>
              </div>
              <div className="grid gap-6 px-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
                  <img
                    className="mx-auto h-[26rem] w-full grayscale object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src={Ketema}
                    alt="Ketema"
                    loading="lazy"
                    width="640"
                    height="805"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                    <div>
                      <h4 className="text-xl font-semibold dark:text-gray-700 text-white">Ketema Girma</h4>
                      <span className="block text-sm text-gray-500">CEO-Founder</span>
                    </div>
                    <p className="mt-8 text-gray-300 dark:text-gray-600">
                      Computer Science Graduate | MERN Stack Developer | Algorithmic Problem Solver | Seeking Opportunities to Drive Technological Innovation
                    </p>
                  </div>

                </div>
                <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
                  <img
                    className="mx-auto h-[26rem] w-full grayscale object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src={Betsi}
                    alt="Betsi"
                    loading="lazy"
                    width="640"
                    height="805"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                    <div>
                      <h4 className="text-xl font-semibold dark:text-gray-700 text-white">Betselot Tadele</h4>
                      <span className="block text-sm text-gray-500">CEO-Founder</span>
                    </div>
                    <p className="mt-8 text-gray-300 dark:text-gray-600">
                      I am a computer science student with a passion for using technology to make a positive impact in society
                    </p>
                  </div>

                </div>
                <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
                  <img
                    className="mx-auto h-[26rem] w-full grayscale object-cover object-top transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src={Gatwech}
                    alt="Gatwech"
                    loading="lazy"
                    width="640"
                    height="805"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                    <div>
                      <h4 className="text-xl font-semibold dark:text-gray-700 text-white">Gatwech Tap</h4>
                      <span className="block text-sm text-gray-500">CEO-Founder</span>
                    </div>
                    <p className="mt-8 text-gray-300 dark:text-gray-600">
                      I am a computer science student with a passion for using technology to make a positive impact in society
                    </p>
                  </div>

                </div>
                <div className="group relative rounded-3xl  space-y-6 overflow-hidden">
                  <img
                    className="mx-auto h-[26rem] w-full grayscale object-cover object-top ransition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    src={Dema}
                    alt="dema"
                    loading="lazy"
                    width="640"
                    height="805"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-max mt-auto px-8 py-6 bg-gray-800 dark:bg-white translate-y-24 transition duration-300 ease-in-out group-hover:translate-y-0">
                    <div>
                      <h4 className="text-xl font-semibold dark:text-gray-700 text-white">Dema Amano </h4>
                      <span className="block text-sm text-gray-500">CEO-Founder</span>
                    </div>
                    <p className="mt-8 text-gray-300 dark:text-gray-600">
                      I am a computer science student with a passion for using technology to make a positive impact in society
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>



          <Footer />
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
