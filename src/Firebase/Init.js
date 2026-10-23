import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBNMdfifIZTghky_UOzpXhwu6dlJsJWOkk",
  authDomain: "loanswift-347e3.firebaseapp.com",
  projectId: "loanswift-347e3",
  storageBucket: "loanswift-347e3.appspot.com",
  messagingSenderId: "184327224800",
  appId: "1:184327224800:web:fe2531fffc2c20d97cff85",
  measurementId: "G-QG4VJETM4F",
};

// Guarded Modular initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Optional Analytics initialization
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

// Guarded Compat initialization for existing compat SDK calls
const firebaseApp = firebase.apps.length === 0
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { app, auth, db, storage, analytics };
export default app;
