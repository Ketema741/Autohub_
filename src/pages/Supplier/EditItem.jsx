import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../context/ContextProvider';

const EditItem = () => {
  const { currentColor, setEditItem } = useStateContext();
  const onChange = (e) => {
    console.log('onChange')
  }

  const onSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0 flex justify-center items-center">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:bg-[#484B52] max-w-screen w-full sm:w-full md:w-full lg:w-full xl:w-1/2 2xl:w-1/3">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg" style={{ color: currentColor }}>Edit Item</p>
          <button
            type="button"
            onClick={() => setEditItem(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>

        <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-5 w-full">
          <form>
            <div className="flex flex-col mb-6">
              <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Item Name</label>
              <div className="relative">
                <input
                  id="name"
                  type="name"
                  name="name"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Item title"
                  onChange={onChange}
                  required
                  minLength="6"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="price" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Price:</label>
              <div className="relative">
                <input
                  id="price"
                  type="text"
                  name="price"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="price"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="category" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Category:</label>
              <div className="relative">
                <input
                  id="category"
                  type="text"
                  name="category"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="category"
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="description" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Description:</label>
              <div className="relative">
                <input
                  id="description"
                  type="text"
                  name="description"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="description"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="quantity" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Quantity:</label>
              <div className="relative">
                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="quantity"
                  onChange={onChange}
                  required
                />
              </div>
            </div>


            <div className="flex w-full">
              <button type="submit" className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span className="mr-2 uppercase">Update</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>

  );
};

export default EditItem;