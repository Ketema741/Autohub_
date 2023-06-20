import React from 'react';
import CloudinaryUploadPdf from './CloudinaryUploadPdf';

const UploadFile = ({ setFiles }) => {
  const handleOpenWidget = (file) => {
    const { secure_url, public_id } = file;
    setFiles((prev) => [...prev, { url: secure_url, public_id: public_id }]);
    console.log("File uploaded successfully: ", secure_url);
  };

  return (
    <CloudinaryUploadPdf handleUploadComplete={handleOpenWidget} />
  );
};

export default UploadFile;
