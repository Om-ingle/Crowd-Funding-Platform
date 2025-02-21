// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdMNls05ihCJRx25lZydUKstS8ZdgBJI0",
  authDomain: "crowd-funding-platform-18f0b.firebaseapp.com",
  projectId: "crowd-funding-platform-18f0b",
  storageBucket: "crowd-funding-platform-18f0b.firebasestorage.app",
  messagingSenderId: "717609051501",
  appId: "1:717609051501:web:ea75978cd196f84e346664",
  measurementId: "G-CCNLTH2ME9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);