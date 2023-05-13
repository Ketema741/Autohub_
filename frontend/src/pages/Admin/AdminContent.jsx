import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import {
  Stacked,
  Pie,
  Button,
  LineChart,
  SparkLine
} from '../../components';
import {
  recentTransactions,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
  pieChartData,
} from '../../data/dummy';

import { useStateContext } from '../../context/ContextProvider';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);


const AdminContent = () => {
  const {
    currentMode,
    currentColor,
  } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg   p-8 m-3 flex justify-center items-center gap-10 rounded-2xl md:w-804">
          <div className='w-auto'>
            <p className="text-2xl font-semibold ">AutoHub System Users</p>
            <p className="text-gray-400">
              A graphical representation of users.

            </p>
          </div>

          <div className="">
            <Pie
              id="pie-chart"
              data={pieChartData}
              legendVisiblity={false}
              height="420px"
            />
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className=" border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl font-semibold">$48,487</p>

                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <button className='rounded-md p-3 bg-gradient-to-r from-sky-600 to-cyan-400 text-white'>
                  Download Report
                </button>
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3 bg-gradient-to-r from-sky-600 to-cyan-400 "

          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  $63,448.78
                </p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor='sky-600'
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">$43,246</p>
              <p className="text-gray-400">Yearly sales</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Recent Transactions</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add"
                borderRadius="10px"
              />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Sales Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
