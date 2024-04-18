// src/components/ImageList.js
import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase/firebase';
import './index.css'

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = storage.ref();
      const imagesRef = storageRef.child('images');
      const imageUrls = [];

      await imagesRef.listAll().then(async (result) => {
        for (const imageRef of result.items) {
          const url = await imageRef.getDownloadURL();
          const metadata = await imageRef.getMetadata();
          const latitude = metadata.customMetadata ? metadata.customMetadata.latitude : 'Unknown';
          const longitude = metadata.customMetadata ? metadata.customMetadata.longitude : 'Unknown';
          imageUrls.push({ url, latitude, longitude });
        }
      });

      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div className='images-container'>
      
      {images.map((image, index) => (
        <div key={index} className='images-gps-container'>
          <img src={image.url} alt={`Captured ${index + 1}`} className="captured-image" />
          <p className='location'>Latitude: {image.latitude}</p>
          <p className='location'>Longitude: {image.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
