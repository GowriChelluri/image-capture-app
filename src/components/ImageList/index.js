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
          const { latitude, longitude } = metadata.customMetadata;
          const imageName = imageRef.name.split('.').slice(0, -1).join('.');
          const timestamp = new Date(metadata.timeCreated).toLocaleString();
          imageUrls.push({ url, latitude, longitude, name: imageName, timestamp });
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
            <img src={image.url} alt={`Captured ${index + 1}`} className='captured-image' />
            <p className='description'>Name: {image.name}</p>
            <p className='description'>Timestamp: {image.timestamp}</p>
            <p className='description'>Latitude: {image.latitude}</p>
            <p className='description'>Longitude: {image.longitude}</p>
          </div>
        ))}
      
    </div>
  );
};

export default ImageList;
