// src/App.js
import React from 'react';
import Camera from './components/Camera';
import ImageList from './components/ImageList';
import './App.css'

const App = () => {
  return (
    <div className='bg-container'>
      <h1 style={{color:"white",fintSize:'40px'}}>Image Capture App</h1>
      <Camera />
      <ImageList />
    </div>
  );
};

export default App;
