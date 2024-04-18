import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import { storage } from '../../firebase/firebase';
import './index.css'

const Camera = () => {
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Get GPS location
    const position = await getCurrentPosition();

    // Upload image to Firebase storage with location data
    const { latitude, longitude } = position.coords;
    const storageRef = storage.ref();
    const imageName = `image_${Date.now()}.jpg`;
    const imageRef = storageRef.child(`images/${imageName}`);
    await imageRef.putString(imageSrc, 'data_url', {
      contentType: 'image/jpeg',
      customMetadata: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });

    alert('Image captured and uploaded successfully with GPS location!');
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleCaptureButtonClick = async () => {
    await capture();
  };

  return (
    <div className='camera-btn-container'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={480}
        height={480}
      />
      <button onClick={handleCaptureButtonClick} className='btn'>Capture</button>
    </div>
  );
};

export default Camera;
