import React from 'react';
import { Pie, } from '../../components';
import Notification from './Notification/Notification';

const AdminContent = ({ customersByLocation }) => {

  let pieChartData = "";

  if (customersByLocation && customersByLocation.length >= 0) {
    // Count the number of occurrences for each location
    const locationCounts = customersByLocation.map((location) => ({
      location: location._id,
      count: location.count,
    }));

    // Calculate the total count
    const totalCount = locationCounts.reduce((acc, curr) => acc + curr.count, 0);

    // Calculate the percentage for each location
    const locationPercentages = locationCounts.map((location) => ({
      x: location.location,
      y: (location.count / totalCount) * 100,
      text: `${((location.count / totalCount) * 100).toFixed(2)}%`,
    }));

    pieChartData = locationPercentages.map((location) => ({
      x: location.x,
      y: location.y,
      text: location.text,
    }));
    console.log(pieChartData)
  }


  return (
    <div className="mt-24">
      <div className="flex gap-x-10 gap-y-5 flex-wrap justify-center">
        <Notification />
        {pieChartData &&
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg   p-8 m-3 ml-10 flex justify-center items-center gap-1 rounded-2xl md:w-804">
            <div className='w-auto'>
              <p className="text-2xl font-bold mb-4 ">
                AutoHub Users
              </p>
              <p className="text-gray-400 leading-8">
                Mapping the Vibrant Customer Landscape: A Comprehensive Visual Representation of the Diverse Customer Groups and their Interactions within Addis Ababa Subcity.
              </p>
            </div>

            <div className="">
              <Pie
                id="pie-chart"
                data={pieChartData}
                legendVisiblity
                height="420px"
                name="System Users"
              />
            </div>
          </div>
        }




      </div>

    </div>
  );
};

export default AdminContent;
