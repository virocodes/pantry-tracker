// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGYeUmO6p9lT0iqMnNrQAwsSW4pI-rzBA",
  authDomain: "pantry-tracker-4a3e7.firebaseapp.com",
  projectId: "pantry-tracker-4a3e7",
  storageBucket: "pantry-tracker-4a3e7.appspot.com",
  messagingSenderId: "606396643835",
  appId: "1:606396643835:web:ebb0af24e8b53327f0f35e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore}