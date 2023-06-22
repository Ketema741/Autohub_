import React from 'react';
import Logo from '../data/logo.svg';
import { FaGithub, FaLinkedin  } from 'react-icons/fa';

const Footer = () => (
  <div className="bg-white mt-24 border-t border-gray-100 ">
    <div className=" dark:bg-gray-800 pt-6">
      <div className="container m-auto space-y-8 px-6 text-gray-600 dark:text-gray-300 md:px-12 lg:px-20">
        <div>
          <div className="mb-6 items-center justify-between gap-6 py-6 sm:flex md:mb-16 md:space-y-6 md:py-0">
            <img className="mt-6   rounded-xl" src={Logo} alt="logo AutoHub"  style={{height:"140px", width:"140px" }} />
            <div className="mt-6 flex flex-col-reverse flex-wrap gap-6 sm:mt-0 sm:flex-row sm:items-center">
              <select
                name="langage"
                id="langae"
                className="w-full rounded-xl dark:bg-gray-900 px-4 py-2 sm:w-max"
              >
                <option value="en">English</option>
                <option value="fr" disabled>Amharic</option>
              </select>
              <div className="flex gap-6">
                <a href="https://github.com/Ketema741" target="blank" aria-label="github" className="hover:text-primary">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/ketema-girma-608729228/" target="blank" aria-label="twitter" className="hover:text-primary">
                  <FaLinkedin  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6 pb-16 sm:grid-cols-3 md:grid-cols-5">
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-200">Categories</h6>
                <ul className="mt-4 list-inside space-y-4">
                  
                  <li>
                    <a href="#" className="transition hover:text-primary">Chat</a>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-primary">Blog</a>
                  </li>
                 
                  <li>
                    <a href="#" className="transition hover:text-primary">Jobs</a>
                  </li>
                </ul>
              </div>
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-200">Partners</h6>
                <ul className="mt-4 list-inside space-y-4">
                  <li>
                    <a href="#" className="transition hover:text-primary">AAU</a>
                  </li>
                  
                  
                </ul>
              </div>
              <div>
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-200">AutoHub</h6>
                <ul className="mt-4 list-inside space-y-4">
                  <li>
                    <a href="#" className="transition hover:text-primary">About Us</a>
                  </li>
                  
                  <li>
                  </li>
                  <li>
                    <a href="#" className="transition hover:text-primary">FAQ</a>
                  </li>
                  
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-3 md:col-span-2">
                <h6 className="text-lg font-medium text-gray-700 dark:text-gray-200">Contact</h6>
                <ul className="mt-4 list-inside space-y-4">
                  <li>
                    <a href="tel:+243996660436" className="transition hover:text-primary"
                    >+2519 1232 3811</a>
                  </li>
                  <li>
                    <a href="mailto:autohubcarcare6@gmail.com" className="transition hover:text-primary"
                    >autohubcarcare6@gmail.com</a>
                  </li>
                 
                </ul>
              </div>
            </div>
            <div className="flex justify-between border-t border-cyan-800 py-8 text-gray-200">
              <span>&copy; AutoHub 20023 <span id="year"></span></span>
              <span>All right reserved</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default Footer;
