import {intializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOUaq5jVvTFzm0nQJ9tOlQvBqleJ9bfrk",
  authDomain: "rwat-ca2-game.firebaseapp.com",
  projectId: "rwat-ca2-game",
  storageBucket: "rwat-ca2-game.firebasestorage.app",
  messagingSenderId: "804634327994",
  appId: "1:804634327994:web:35a6c1ac1443295f29bb83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
}

conts app = initializeApp(firebaseConfig);
const db = getFirestore(app);