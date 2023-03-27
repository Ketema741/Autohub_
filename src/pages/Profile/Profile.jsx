import React from 'react'
import NavBar from './Navbar'
import About from './About'
import Experience from './Experience'
import ProfileCard from './ProfileCard'
import FriendCard from './FriendCard'

const Profile = () => {
    return (
        <div className="bg-gray-100">
            <NavBar />
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <ProfileCard />
                        <div className="my-4"></div>
                        <FriendCard />
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <About />
                        <div className="my-4"></div>
                        <Experience />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

