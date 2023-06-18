import React from 'react'
import { FaBriefcase } from 'react-icons/fa';
const Parse = require('html-react-parser')

import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Experience = ({ currentColor, user }) => {
    return (
        <div className="bg-white p-3 shadow-sm rounded-sm">
            <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span style={{ color: currentColor }}>
                        <FaCheckCircle className="h-5" />
                    </span>
                    <span className="tracking-wide">Summary</span>
                </div>

                <div className="text-gray-800">{user.specializations}</div>
            </div>

            {user.bio &&
                <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span style={{ color: currentColor }}>
                            <FaTimesCircle className="h-5" />
                        </span>
                        <span className="tracking-wide">Detail</span>
                    </div>

                    <div className="text-gray-800">{Parse(user.bio)}</div>
                </div>
            }

        </div>
    )
}

export default Experience