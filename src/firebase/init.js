// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHi2WhpxTZ2fVS_mmDCUSyT1zp01W5-Fg",
    authDomain: "movie-app-ce96a.firebaseapp.com",
    projectId: "movie-app-ce96a",
    storageBucket: "movie-app-ce96a.firebasestorage.app",
    messagingSenderId: "877991224235",
    appId: "1:877991224235:web:1309f2e2796da18031e8ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

export default db;