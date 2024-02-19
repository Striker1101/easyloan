// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBNMdfifIZTghky_UOzpXhwu6dlJsJWOkk",
  authDomain: "loanswift-347e3.firebaseapp.com",
  projectId: "loanswift-347e3",
  storageBucket: "loanswift-347e3.appspot.com",
  messagingSenderId: "184327224800",
  appId: "1:184327224800:web:fe2531fffc2c20d97cff85",
  measurementId: "G-QG4VJETM4F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
