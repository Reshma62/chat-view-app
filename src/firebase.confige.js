// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl5Qleg-F5Lb53N3XLCgPOLtN0soYC9sg",
  authDomain: "chat-view-app.firebaseapp.com",
  projectId: "chat-view-app",
  storageBucket: "chat-view-app.appspot.com",
  messagingSenderId: "864781392007",
  appId: "1:864781392007:web:335e6456e1992a22924022",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;
