// src/firebase/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC47ZAgLOi6mCEhHb2l94qpNQoUqrLNUcQ",
    authDomain: "image-capture-app-a937c.firebaseapp.com",
    projectId: "image-capture-app-a937c",
    storageBucket: "image-capture-app-a937c.appspot.com",
    messagingSenderId: "495141364372",
    appId: "1:495141364372:web:e59bec27b5faf04af60a81"
  // Your Firebase config
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase }; // Export both storage and firebase explicitly
