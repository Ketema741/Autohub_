import React from 'react';
import avatar from '../../assets/useravatar.svg'
import moment from 'moment'

const ProfileCard = ({ user, currentColor, handleShow }) => {
  return (
    <div className="bg-white p-3 border-t-4 b" style={{ borderColor: currentColor }}>
      <div className="mt-8 text-center">
        <img src={user.profileImage? user.profileImage:avatar} alt="" className="m-auto h-24 w-24 rounded-full object-cover lg:h-28 lg:w-28" />
        <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">
          {user.firstName}
        </h5>
        <span className="hidden text-gray-400 lg:block">{user.role}</span>
      </div>
      <div className="border border-gray-300 my-4"></div>

      {user.role == "driver" &&
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          Having a complete profile greatly enhances our ability to evaluate your skills and match you with suitable job opportunities. It demonstrates your commitment and professionalism, and it allows us to assess how your expertise aligns with our clients' requirements.
        </h3>
      }
      {user.role == "supplier" &&
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          A complete profile not only boosts your chances of finding new clients but also enables us to promote your services effectively within our network. It showcases your commitment to excellence and allows us to confidently recommend you to clients seeking reliable and professional car and accessory suppliers.
        </h3>
      }

      {user.role == "expert" &&
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          Having a comprehensive expert profile greatly increases your credibility and allows us to showcase your expertise to our community effectively. It demonstrates your commitment to delivering valuable information and insights to our audience while enabling us to better understand how your expertise aligns with our users' needs.
        </h3>
      }

      {user.role == "serviceProvider" &&
        <h3 className="text-gray-600 font-lg text-semibold leading-6">
          Having a comprehensive service provider profile enhances your credibility and allows us to showcase your expertise effectively to our users. It demonstrates your commitment to delivering exceptional vehicle services while enabling us to better understand how your offerings align with our customers' needs.
        </h3>
      }

      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
        <li className="flex items-center py-3">
          <span className="mx-auto">
            <button onClick={handleShow} className={`bg-${currentColor} py-1 px-2 rounded text-white text-sm`} style={{ backgroundColor: currentColor }}>
              Edit
            </button>
          </span>
        </li>
        <li className="flex items-center py-3 text-sm">
          <span className=''>Member since</span>
          <span className="ml-auto">
            {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
