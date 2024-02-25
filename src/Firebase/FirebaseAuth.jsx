// FirebaseAuth.js
import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { firebaseConfig } from "./Init";
import { Container } from "react-bootstrap";

const FirebaseAuth = ({ setNavColor, setOnDash }) => {
  console.log(firebase.apps);

  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(true);

  useEffect(() => {
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  useEffect(() => {
    // Import FirebaseUI
    import("firebaseui")
      .then((firebaseui) => {
        // Initialize FirebaseUI
        const ui = new firebaseui.auth.AuthUI(firebase.auth());

        // FirebaseUI Configuration
        const uiConfig = {
          signInSuccessUrl: "/dashboard", // Redirect URL after successful sign-in
          signInOptions: [
            // Enable email/password authentication
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Enable phone number authentication
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // Enable Google sign-in
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          ],
          // Display full-screen UI for mobile devices
          signInFlow: "popup",
        };

        // Start FirebaseUI authentication UI
        ui.start("#firebaseui-auth-container", uiConfig);
      })
      .catch((error) => console.error("Error loading FirebaseUI:", error));
  }, []);

  return (
    <div className="position-relative ">
      <div className="background-video">
        <video autoPlay loop muted>
          <source src="/background.mp4" type="video/mp4" />
          {/* Add additional <source> elements for other video formats if needed */}
          Your browser does not support the video tag.
        </video>
      </div>
      <Container>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="content bg-light rounded-circle shadow-lg p-4">
            <div id="firebaseui-auth-container"></div>
          </div>
          <div className="ml-4">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-bg-danger bg-brown rounded-circle p-2"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FirebaseAuth;
