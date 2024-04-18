// src/components/Camera.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { storage } from '../../firebase/firebase';
import './index.css'

const Camera = () => {
  const webcamRef = useRef(null);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [photoName, setPhotoName] = useState('');

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setShowSavePopup(true);
  };

  const handleSavePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const storageRef = storage.ref();
    const imageName = `${photoName}_${Date.now()}.jpg`;
    const imageRef = storageRef.child(`images/${imageName}`);
    await imageRef.putString(imageSrc, 'data_url', {
      contentType: 'image/jpeg',
      customMetadata: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });
    setShowSavePopup(false);
    setPhotoName('');
    alert('Image captured and saved successfully with GPS location!');
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return (
    <div className='camera-btn-container'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture} className='btn'>Capture</button>
      {showSavePopup && (
        <div className="save-popup">
          <input
            type="text"
            placeholder="Enter photo name"
            value={photoName}
            onChange={(e) => setPhotoName(e.target.value)}
          />
          <button onClick={handleSavePhoto}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Camera;
