import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';

import { themeColors } from '../data/dummy';

const EditItem = () => {
  const { setColor, setMode, currentMode, currentColor, setEditItem } = useStateContext();

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Edit Item</p>
          <button
            type="button"
            onClick={()=> setEditItem(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="p-4">
        <form>
          <div class="mb-4">
            <label class="block font-semibold text-gray-700" for="header-input">
              Header
            </label>
            <input class="form-input mt-1 block w-full rounded-md border-gray-300" id="header-input" type="text" name="header" placeholder="Enter header" required />
          </div>
          <div class="mb-4">
            <label class="block font-semibold text-gray-700" for="description-input">
              Description
            </label>
            <textarea class="form-textarea mt-1 block w-full rounded-md border-gray-300" id="description-input" name="description" rows="3" placeholder="Enter description" required></textarea>
          </div>
          <div class="mt-8">
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" type="submit">
              Update Item
            </button>
          </div>
        </form>

        </div>
      </div>
    </div>

  );
};

export default EditItem;