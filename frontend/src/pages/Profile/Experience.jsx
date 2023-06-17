import React from 'react'
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';


const Experience = ({ currentColor, user }) => {
    return (
        <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2">
                <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span style={{ color: currentColor }}>
                            <FaBriefcase className="h-5" />
                        </span>
                        <span className="tracking-wide">Experience</span>
                    </div>
                    <ul className="list-inside space-y-2">

                        {user.workHistory &&
                            <li>
                                <div className="text-teal-600">Work History</div>
                                <div className="text-gray-500 text-xs">{user.workHistory}</div>
                            </li>
                            }
                        {user.experience &&
                            <li>
                                <div className="text-teal-600">Experience</div>
                                <div className="text-gray-500 text-xs">{user.experience}</div>
                            </li>}
                        {user.rating &&
                            <li>
                                <div className="text-teal-600">Rating</div>
                                <div className="text-gray-500 text-xs">{user.rating}</div>
                            </li>}
                    </ul>
                </div>
                {user.education &&
                    <div>
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span style={{ color: currentColor }}>
                                <FaGraduationCap className="h-5" />
                            </span>
                            <span className="tracking-wide">Education</span>
                        </div>
                        <ul className="list-inside space-y-2">
                            <li>
                                <div className="text-teal-600">{user.education}</div>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Experience