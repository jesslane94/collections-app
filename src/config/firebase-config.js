// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANvOxnMiXVFP4VTicr4snLB1qvNderV4c",
  authDomain: "collections-90baf.firebaseapp.com",
  projectId: "collections-90baf",
  storageBucket: "collections-90baf.appspot.com",
  messagingSenderId: "690634412512",
  appId: "1:690634412512:web:000ba23ff6181e358e9b85",
  measurementId: "G-Q4ZS7HSEGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);