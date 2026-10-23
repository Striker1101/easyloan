import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { db } from "./Init";

export let uid = "";

export function subscribeAuth(callback) {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      uid = user.uid;
      callback({ status: true, user });
    } else {
      uid = "";
      callback({ status: false, user: null });
    }
  });
}

export function checkAuth() {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        resolve({ status: true, user });
      } else {
        resolve({ status: false, user: null });
      }
      unsubscribe();
    });
  });
}

export async function getDocument(col, userId, status = true) {
  try {
    if (!userId && status) {
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

export async function updateRegion(col, data) {
  const userId = firebase.auth().currentUser.uid;
  const userDocumentRef = firebase.firestore().collection(col).doc(userId);
  const createdAt = new Date();
  const formData = {
    createdAt: createdAt,
    lastUpdatedAt: createdAt, // Set last updated at to created at initially
    ...data,
  };

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
        region: firebase.firestore.FieldValue.arrayUnion(formData),
      },
      { merge: true }
    );
    return { status: true, message: "Successful" };
  } catch (error) {
    return { status: false, message: error.message };
    // Handle error
  }
}

export function getLiveDocument(col, id, callback) {
  let userId = firebase.auth().currentUser?.uid || id;

  if (typeof callback === "function") {
    if (!userId) {
      callback({ status: false, data: [] });
      return () => {};
    }
    const userRef = firebase.firestore().collection(col).doc(userId);
    return userRef.onSnapshot(
      (doc) => {
        if (doc && doc.exists) {
          const userData = doc.data().region || [];
          callback({ status: true, data: userData });
        } else {
          callback({ status: false, data: [] });
        }
      },
      (error) => {
        console.error(`Error in getLiveDocument (${col}):`, error);
        callback({ status: false, message: error.message, data: [] });
      }
    );
  }

  return new Promise((resolve) => {
    if (!userId) {
      return resolve({ status: false, data: [] });
    }
    const userRef = firebase.firestore().collection(col).doc(userId);
    const unsubscribe = userRef.onSnapshot(
      (doc) => {
        unsubscribe();
        if (doc && doc.exists) {
          resolve({ status: true, data: doc.data().region || [] });
        } else {
          resolve({ status: false, data: [] });
        }
      },
      (error) => {
        unsubscribe();
        resolve({ status: false, message: error.message, data: [] });
      }
    );
  });
}

export async function deleteRegion(loanItemOrIndex) {
  try {
    const userId = firebase.auth().currentUser?.uid;
    if (!userId) {
      return { status: false, message: "User not authenticated." };
    }
    const userDocumentRef = firebase.firestore().collection("loan").doc(userId);
    const doc = await userDocumentRef.get();
    if (!doc.exists) {
      return { status: false, message: "No active loan record found." };
    }

    const currentRegion = doc.data().region || [];
    let updatedRegion = [];

    if (typeof loanItemOrIndex === "number") {
      updatedRegion = currentRegion.filter((_, idx) => idx !== loanItemOrIndex);
    } else if (typeof loanItemOrIndex === "object" && loanItemOrIndex !== null) {
      updatedRegion = currentRegion.filter((item) => {
        if (loanItemOrIndex.refId && item.refId) {
          return item.refId !== loanItemOrIndex.refId;
        }
        return !(
          Number(item.amount) === Number(loanItemOrIndex.amount) &&
          Number(item.duration) === Number(loanItemOrIndex.duration) &&
          item.reason === loanItemOrIndex.reason
        );
      });
    } else {
      await userDocumentRef.update({
        region: firebase.firestore.FieldValue.arrayRemove(loanItemOrIndex),
      });
      return { status: true, message: "Loan cancelled successfully." };
    }

    await userDocumentRef.update({ region: updatedRegion });
    return { status: true, message: "Loan cancelled successfully." };
  } catch (error) {
    console.error("Error deleting region:", error);
    return { status: false, message: error.message };
  }
}

export async function submitFile(id, documentType, fileData) {
  let userId = firebase.auth().currentUser?.uid;
  if (!userId) {
    userId = id;
  }
  try {
    const storageRef = firebase.storage().ref();
    const isId =
      documentType.toLowerCase().includes("id") ||
      documentType.toLowerCase().includes("passport");

    let frontUrl = "";
    let backUrl = "";
    const timestamp = Date.now();

    if (isId && fileData.front && fileData.file) {
      const frontName = `${timestamp}_front_${fileData.front.name}`;
      const backName = `${timestamp}_back_${fileData.file.name}`;
      const frontFileRef = storageRef.child(`files/${userId}/${frontName}`);
      const backFileRef = storageRef.child(`files/${userId}/${backName}`);

      await frontFileRef.put(fileData.front);
      await backFileRef.put(fileData.file);

      frontUrl = await frontFileRef.getDownloadURL();
      backUrl = await backFileRef.getDownloadURL();
    } else {
      const targetFile = fileData.file || fileData.front;
      if (!targetFile) {
        return { status: false, message: "No file selected for upload." };
      }
      const fileName = `${timestamp}_${targetFile.name}`;
      const singleFileRef = storageRef.child(`files/${userId}/${fileName}`);
      await singleFileRef.put(targetFile);

      backUrl = await singleFileRef.getDownloadURL();
      frontUrl = backUrl;
    }

    const filesDocumentRef = firebase
      .firestore()
      .collection("files")
      .doc(userId);

    const docSnapshot = await filesDocumentRef.get();

    if (!docSnapshot.exists) {
      await filesDocumentRef.set({ region: [] });
    }

    await filesDocumentRef.set(
      {
        region: firebase.firestore.FieldValue.arrayUnion({
          frontUrl,
          backUrl,
          documentType,
          uploadedAt: new Date().toISOString(),
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

export const handleSendCode = async (email) => {
  try {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost:3007";
    await firebase.auth().sendSignInLinkToEmail(email, {
      handleCodeInApp: true,
      url: `${origin}/signin`,
    });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("emailForSignIn", email);
    }
    return {
      status: true,
      message: "Verification link sent to email.",
    };
  } catch (error) {
    return {
      status: false,
      message: removeFirebasePrefix(error.message),
    };
  }
};

export const isEmailSignInLink = (url) => {
  if (typeof window === "undefined") return false;
  return firebase.auth().isSignInWithEmailLink(url || window.location.href);
};

export const completeEmailLinkSignIn = async (emailInput, url) => {
  try {
    const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    if (!firebase.auth().isSignInWithEmailLink(currentUrl)) {
      return { status: false, message: "Invalid or expired sign-in link." };
    }
    let email = emailInput;
    if (!email && typeof window !== "undefined") {
      email = window.localStorage.getItem("emailForSignIn");
    }
    if (!email) {
      return {
        status: false,
        requiresEmail: true,
        message: "Please enter your email to complete verification.",
      };
    }
    const result = await firebase.auth().signInWithEmailLink(email, currentUrl);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("emailForSignIn");
    }
    return {
      status: true,
      success: true,
      user: result.user,
      message: "Successfully signed in via email link!",
    };
  } catch (error) {
    return {
      status: false,
      success: false,
      message: removeFirebasePrefix(error.message),
    };
  }
};

export const createUser = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return {
      status: true,
      success: true,
      user: userCredential.user,
      message: "User created successfully.",
    };
  } catch (error) {
    return {
      status: false,
      success: false,
      message: removeFirebasePrefix(error.message),
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return {
      status: true,
      success: true,
      user: userCredential.user,
      message: "Login Successful",
    };
  } catch (error) {
    return {
      status: false,
      success: false,
      message: removeFirebasePrefix(error.message),
    };
  }
};

const removeFirebasePrefix = (str) => {
  return str.replace("Firebase: ", "");
};

// Function to reset password
export const resetPassword = async (email) => {
  // Check if email is provided
  if (!email) {
    return Promise.reject({
      status: false,
      message: "Email is required for password reset.",
    });
  }

  // Send password reset email
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {
      status: true,
      message: "Password reset email sent successfully.",
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export const getAllUsers = async () => {
  try {
    const usersCollection = await firebase
      .firestore()
      .collection("personal")
      .get();
    const users = usersCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    return { code: 500, message: "error", status: false };
  }
};

export const updateRegionStatus = async (
  col,
  loanId,
  regionIndex,
  newStatus
) => {
  try {
    // Get the loan document from the loan collection
    const loanRef = db.collection(col).doc(loanId);
    const loanDoc = await loanRef.get();

    if (!loanDoc.exists) {
      throw new Error("Loan document not found");
    }
    const updatedAt = new Date();
    // Update the status of the region at the specified index
    const regions = loanDoc.data().region;
    regions[regionIndex].status = newStatus;

    // update the last update data
    regions[regionIndex].lastUpdatedAt = updatedAt;

    // Update the loan document with the modified region array
    await loanRef.update({ region: regions });

    return { status: true, message: "Successful" };
  } catch (error) {
    return { status: false, message: error };
  }
};
