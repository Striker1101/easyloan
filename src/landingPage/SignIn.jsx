import React, { useState } from "react";
import { Container } from "react-bootstrap";

import "../Components/Styles/Landing/SignIn.css";
import Email from "../Components/LandingPages/SignIn/Email";
import Password from "../Components/LandingPages/SignIn/Password";
import { Link } from "react-router-dom";

const SignIn = ({ setNavColor }) => {
  setNavColor(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: true,
    showPassword: false,
  });

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmitEmail = () => {
    // Logic to send verification code
    // Assuming verification code is received and validated
    setFormData((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  function handleSubmitPassword() {
    console.log("submited");
  }

  return (
    <Container className="p-3 m-3">
      <h2 className="pt-5 mt-5">RESGISTER WITH US TODAY </h2>
      <div className="pt-3 mt-3">
        <div>
          {/* ArrowLeft */}
          <h4>Cancel</h4>
        </div>
        <div className="d-flex flex-column  align-items-center justify-content-center gap-4 ">
          <img src="./loanlogo.jpg" alt="loanlogo" />
          {/* Email Verification Step */}
          <Email
            formData={formData}
            handleFormData={handleFormData}
            handleSubmitEmail={handleSubmitEmail}
          />

          {/* set password */}
          <Password
            formData={formData}
            handleFormData={handleFormData}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmitPassword={handleSubmitPassword}
          />
          <div>
            Not yet a Customer?{" "}
            <Link to={"/signup"} aria-label="register">
              Register
            </Link>
          </div>
          <div>
            Forgotten your Password <Link to={"/reset_password"}>Retrive</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
