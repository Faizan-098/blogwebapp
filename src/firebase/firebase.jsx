// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCpQIQl2lUh9Hioqlt4HXuMryV91Zxv8EU",
  authDomain: "blogwepapp.firebaseapp.com",
  projectId: "blogwepapp",
  storageBucket: "blogwepapp.firebasestorage.app",
  messagingSenderId: "21867593961",
  appId: "1:21867593961:web:c9b9b09a06efdd170a7078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const fireDB = getFirestore(app)
export{
  auth,
  fireDB
}