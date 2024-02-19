// login user directly from Here

import React, { useState } from "react";
import { Container } from "react-bootstrap";

import "../Components/Styles/Landing/Signup.css";
import Email from "../Components/LandingPages/Signup.jsx/Email";
import VerificaionCode from "../Components/LandingPages/Signup.jsx/VerificationCode";
import Password from "../Components/LandingPages/Signup.jsx/Password";
import { Link } from "react-router-dom";

const Signup = ({ setNavColor, setOnDash }) => {
  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(false);

  const [email, setEmail] = useState({
    address: "",
    code: "",
    showEmail: true,
    showCode: false,
  });

  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setEmail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSendVerificationCode = () => {
    // Logic to send verification code
    // Assuming verification code is received and validated
    setEmail((prev) => ({
      ...prev,
      showEmail: false,
      showCode: true,
    })); // Show PIN step after successful verification
  };

  const handleCodeSave = () => {
    // Logic to create account and save details to database
    setEmail((prev) => ({
      ...prev,
      showCode: false,
    }));

    setPassword((prev) => ({
      ...prev,
      display: true,
    }));
  };

  function sendCode() {
    console.log("send");
  }

  const [password, setPassword] = useState({
    key: "",
    confirmKey: "",
    showPassword: false,
    display: false,
  });

  const togglePasswordVisibility = () => {
    setPassword((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };
  function handleChangePassword(e) {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmitPassword() {
    console.log("submited");
  }

  return (
    <Container className="p-3 ">
      <h2 className="pt-5 mt-5 text-primary">REGISTER WITH US TODAY </h2>
      <div className="pt-3 mt-3">
        <div className="d-flex flex-column  align-items-center justify-content-center gap-4 ">
          <img src="./loanlogo.jpg" alt="loanlogo" />
          {/* Email Verification Step */}
          <Email
            email={email}
            handleChangeEmail={handleChangeEmail}
            handleSendVerificationCode={handleSendVerificationCode}
          />

          {/* verification Step */}
          <VerificaionCode
            email={email}
            handleChangeEmail={handleChangeEmail}
            handleCodeSave={handleCodeSave}
            sendCode={sendCode}
          />

          {/* set password */}
          <Password
            password={password}
            handleChangePassword={handleChangePassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmitPassword={handleSubmitPassword}
          />
          <div>
            ALready a Customer?{" "}
            <Link to={"/signin"} aria-label="login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
