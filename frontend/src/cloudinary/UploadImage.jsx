import React from 'react'
import CloudinaryUploadWidget from './CloudinaryUploadWidget';

const UploadImage = ({ setImages }) => {

    const handleOpenWidget = (file) => {
        const { secure_url, public_id } = file;
        setImages((prev) => [...prev, { url: secure_url, public_id: public_id }]);
        console.log("image uploaded successfully ", secure_url);
    };

    return (
        <CloudinaryUploadWidget handleOpenWidget={handleOpenWidget} />
    )
}

export default UploadImage