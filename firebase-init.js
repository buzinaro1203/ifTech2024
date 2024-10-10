// Import the functions you need from the SDKs you need


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log('firebase called')
const firebaseConfig = {
  apiKey: "AIzaSyDTNhFE-13RSjXkqXkySnt4gNqoOPXmph8",
  authDomain: "phmeter-83d7e.firebaseapp.com",
  projectId: "phmeter-83d7e",
  storageBucket: "phmeter-83d7e.appspot.com",
  messagingSenderId: "13425144594",
  appId: "1:13425144594:web:f71a3f8e26f49c9f9939cb",
  measurementId: "G-XF90R3TCNL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
