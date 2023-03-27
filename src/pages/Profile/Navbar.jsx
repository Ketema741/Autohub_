
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiMenu, FiChevronUp } from "react-icons/fi";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleOpen = () => setOpen(!open);
    const toggleDropdownOpen = () => setDropdownOpen(!dropdownOpen);

    const handleDropdownToggle = () => {
        setDropdownOpen((prevDropdownOpen) => !prevDropdownOpen);
      }

    return (
        <div className="w-full text-black bg-white">
            <div
                xData="{ open: false }"
                className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
            >
                <div className="p-4 flex flex-row items-center justify-between">
                    <a
                        href="#"
                        className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        User profile
                    </a>
                    <button
                        className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
                        onClick={toggleOpen}
                    >
                        {open ? (
                            <FiChevronUp className="w-6 h-6" />
                        ) : (
                            <FiMenu className="w-6 h-6" />
                        )}
                    </button>
                </div>
                <nav
                    className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${open ? "flex" : "hidden"
                        }`}
                >
                    <div className="relative" xData="{ open: false }">
                        <button
                            onClick={toggleDropdownOpen}
                            className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent  md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                        >
                            <span>Jane Doe</span>
                            <FaUser className="inline h-6 rounded-full" />
                            <FiChevronUp
                                className={`inline w-4 h-4 transition-transform duration-200 transform ${dropdownOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />
                        </button>
                        <div className="relative">
                            
                            <div
                                className={`absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${dropdownOpen ? "block" : "hidden"
                                    } transition duration-300 ease-in-out transform ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                                    }`}
                            >
                                <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                                <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Settings</a>
                                <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Help</a>
                                <div class="border-b"></div>
                                <a class="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                    href="#">Logout</a>
                            </div>
                            </div>
                        </div>                       
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default Navbar

