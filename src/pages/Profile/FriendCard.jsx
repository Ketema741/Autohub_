import React from 'react'
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const FriendCard = () => {
    return (
        <div className="bg-white p-3 hover:shadow">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
                    <AiOutlineUsergroupAdd className="h-5 fill-current" />
                </span>
                <span>Similar Profiles</span>
            </div>
            <div className="grid grid-cols-3">
                <div className="text-center my-2">
                    <img className="h-16 w-16 rounded-full mx-auto" src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg" alt="" />
                    <a href="#" className="text-main-color">Kojstantin</a>
                </div>
                <div className="text-center my-2">
                    <img className="h-16 w-16 rounded-full mx-auto" src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4" alt="" />
                    <a href="#" className="text-main-color">James</a>
                </div>
                <div className="text-center my-2">
                    <img className="h-16 w-16 rounded-full mx-auto" src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg" alt="" />
                    <a href="#" className="text-main-color">Natie</a>
                </div>
                <div className="text-center my-2">
                    <img className="h-16 w-16 rounded-full mx-auto" src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png" alt="" />
                    <a href="#" className="text-main-color">Casey</a>
                </div>
            </div>
        </div>

    )
}

export default FriendCard