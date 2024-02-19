import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Init";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export function checkAuth() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in
            resolve({ status: true, user });
          } else {
            // User is signed out
            resolve({ status: false, user: null });
          }
          // Cleanup function
          unsubscribe();
        });
      });
}
