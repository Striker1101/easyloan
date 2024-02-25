import React, { useState } from "react";
import { Container } from "react-bootstrap";

import "../Components/Styles/Landing/SignIn.css";
import Email from "../Components/LandingPages/SignIn/Email";
import Password from "../Components/LandingPages/SignIn/Password";
import { Link } from "react-router-dom";
import { loginUser } from "../Firebase/Functions";

const SignIn = ({ setNavColor, setOnDash }) => {
  //set pros for on dash board and landing nav color
  setOnDash(false);
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

  async function handleSubmitPassword() {
    const result = await loginUser(formData.email, formData.password);

    alert(result.message);
  }

  return (
    <Container className="p-3 ">
      <h2 className="pt-5 mt-5 text-primary">LOGIN YOUR ACCOUNT </h2>
      <div className="pt-3 mt-3">
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
            Forgotten your Password <Link to={"/reset"}>Retrive</Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
