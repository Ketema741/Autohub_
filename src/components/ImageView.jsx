import React, { useState } from 'react';

function ImageView() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        <img
          src="https://picsum.photos/200"
          className="w-32 h-32 m-2 cursor-pointer"
          onClick={() => handleImageClick('https://picsum.photos/800')}
        />
        <img
          src="https://picsum.photos/200"
          className="w-32 h-32 m-2 cursor-pointer"
          onClick={() => handleImageClick('https://picsum.photos/801')}
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="max-w-3xl w-full p-4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-0 right-0 p-2"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <img src={selectedImage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageView;
