import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Init";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

let uid = "";
export function checkAuth() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        uid = user.uid;
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

export async function getDocument(col, userId) {
  try {
    if (!userId) {
      // If userId is not provided, try to get the current user's ID
      userId = firebase.auth().currentUser?.uid;
    }

    if (!userId) {
      // If currentUser?.uid is null, use the default value passed as userId
      return {
        status: false,
        message: "User ID not provided.",
      };
    }

    const userRef = firebase.firestore().collection(col).doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
      const userData = doc.data();
      return { status: true, datas: userData };
    } else {
      return {
        status: false,
        message: "No such document! Please fill this form.",
      };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
}

// for object /string / number data
export async function updateDocument(col, data) {
  try {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection(col).doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
      // Document exists, update it with values from personal variable
      await userRef.update(data);

      return {
        status: true,
        message: "Document updated successfully!",
      };
    } else {
      // Document does not exist, create it with values from personal variable
      await userRef.set(data);
      return {
        status: true,
        message: "Document created successfully!",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

export async function uploadFile(file) {
  try {
    // Generate a unique filename using the user's ID
    const userId = firebase.auth().currentUser.uid;
    const filename = userId + "_" + file.name;

    // Reference to Firebase Storage
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(filename);

    // Upload file to Firebase Storage
    await fileRef.put(file);

    // Get download URL for the uploaded file
    const downloadURL = await fileRef.getDownloadURL();

    return {
      status: true,
      message: "File uploaded successfully!",
      downloadURL,
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

export async function updateRegion(data) {
  const userId = firebase.auth().currentUser.uid;
  const userDocumentRef = firebase.firestore().collection("loan").doc(userId);

  try {
    // Check if the document exists
    const docSnapshot = await userDocumentRef.get();

    if (!docSnapshot.exists) {
      // If the document doesn't exist, create it with the 'region' field as an empty map
      await userDocumentRef.set({ region: {} });
    }

    // Update Firestore document with provided data under the 'region' field
    await userDocumentRef.set(
      {
        region: firebase.firestore.FieldValue.arrayUnion(data),
      },
      { merge: true }
    );

    console.log("true");
    return { status: true, message: "" };
  } catch (error) {
    console.error("Error updating region:", error);
    return { status: false, message: error.message };
    // Handle error
  }
}

export function getLiveDocument(col, id) {
  return new Promise((resolve, reject) => {
    let userId = firebase.auth().currentUser?.uid;
    if (!userId) {
      userId = id;
    }

    const userRef = firebase.firestore().collection(col).doc(userId);
    const unsubscribe = userRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          const userData = doc.data().region; // Adjust this based on your data structure
          resolve({ status: true, data: userData });
        } else {
          resolve({
            status: false,
            data: "No such document! Please fill this form.",
          });
        }
      },
      (error) => {
        reject(error);
      }
    );

    // Return the unsubscribe function to cleanup on component unmount
    return unsubscribe;
  });
}

export async function deleteRegion(index) {
  const userId = firebase.auth().currentUser.uid;
  const userDocumentRef = firebase.firestore().collection("loan").doc(userId);

  try {
    // Update Firestore document to remove element at specified index from 'region' field
    await userDocumentRef.update({
      region: firebase.firestore.FieldValue.arrayRemove(index),
    });
    console.log("true");
    return { status: true, message: "" };
  } catch (error) {
    console.error("Error deleting region:", error);
    return { status: false, message: error.message };
    // Handle error
  }
}

export async function submitFile(id, documentType, file) {
  let userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    userId = id;
  }
  try {
    // Storage reference for uploading files
    const storageRef = firebase.storage().ref();

    // If document type includes "ID", user must upload two files (front and back view)
    const frontFileRef = storageRef.child(`files/${userId}/${file.name}_front`);
    const backFileRef = storageRef.child(`files/${userId}/${file.name}_back`);

    // Upload front and back view files to Firebase Storage
    await frontFileRef.put(file.front);
    await backFileRef.put(file.file);

    // Get the download URLs for the uploaded front and back view files
    const frontUrl = await frontFileRef.getDownloadURL();
    const backUrl = await backFileRef.getDownloadURL();

    const filesDocumentRef = firebase
      .firestore()
      .collection("files")
      .doc(userId);

    // Check if the document exists
    const docSnapshot = await filesDocumentRef.get();

    if (!docSnapshot.exists) {
      // If the document doesn't exist, create it with the 'region' field as an empty map
      await filesDocumentRef.set({ region: {} });
    }
    // Update Firestore document with provided data under the 'region' field
    await filesDocumentRef.set(
      {
        region: firebase.firestore.FieldValue.arrayUnion({
          frontUrl,
          backUrl,
          documentType,
        }),
      },
      { merge: true }
    );

    return { status: true, message: "File submitted successfully." };
  } catch (error) {
    return { status: false, message: error.message };
  }
}

export function logout() {
  console.log("in");
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "/";
      console.log("out");
      // Redirect or perform any other action after logout
    })
    .catch((error) => {
      return { message: error.message, status: false };
    });
}
