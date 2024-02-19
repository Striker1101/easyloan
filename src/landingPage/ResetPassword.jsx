import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Email from "../Components/LandingPages/ResetPassword/Email.jsx";
import { Link } from "react-router-dom";

const ResetPassword = ({ setNavColor, setOnDash }) => {
  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(false);

  const [formData, setFormData] = useState({
    email: "",
    show: true,
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
    console.log("send");
  };

  return (
    <Container className="p-3 ">
      <h2 className="pt-5 mt-5 text-primary ">RETRIVE YOUR ACCOUNT </h2>
      <div className="pt-3 mt-3">
        <div className="d-flex flex-column  align-items-center justify-content-center gap-4 ">
          <img src="./loanlogo.jpg" alt="loanlogo" />
          {/* Email Verification Step */}
          <Email
            formData={formData}
            handleFormData={handleFormData}
            handleSubmitEmail={handleSubmitEmail}
          />
          <div>
            Already a Customer then <Link to={"/signin"}>Login</Link>
          </div>

          <div>
            Not yet a Customer?{" "}
            <Link to={"/signup"} aria-label="register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
