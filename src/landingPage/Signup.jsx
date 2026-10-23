import React, { useState } from "react";
import "../Components/Styles/Landing/Signup.css";
import Email from "../Components/LandingPages/Signup.jsx/Email";
import Password from "../Components/LandingPages/Signup.jsx/Password";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../Firebase/Functions";
import { Alert } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const [password, setPassword] = useState({
    key: "",
    confirmKey: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (statusMsg) setStatusMsg(null);
  };

  const handleContinue = () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setStatusMsg({ type: "danger", text: "Please enter your email address." });
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setStatusMsg({
        type: "danger",
        text: "Please enter a valid email address (e.g. name@example.com).",
      });
      return;
    }

    setStatusMsg(null);
    setStep(2);
  };

  const handleEditEmail = () => {
    setStatusMsg(null);
    setStep(1);
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (statusMsg) setStatusMsg(null);
  };

  const togglePasswordVisibility = () => {
    setPassword((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const toggleConfirmPasswordVisibility = () => {
    setPassword((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  };

  const handleSubmitPassword = async () => {
    if (!password.key || password.key.length < 6) {
      setStatusMsg({
        type: "danger",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    if (password.key !== password.confirmKey) {
      setStatusMsg({
        type: "danger",
        text: "Passwords do not match. Please verify and retry.",
      });
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);

    const result = await createUser(email.trim(), password.key);
    if (result.status) {
      setStatusMsg({
        type: "success",
        text: "Account created successfully! Redirecting to your dashboard...",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } else {
      setIsLoading(false);
      setStatusMsg({
        type: "danger",
        text: result.message || "Failed to create account. Please try again.",
      });
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-wrapper shadow-sm">
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-block mb-3">
            <img
              src="/loanlogo.jpg"
              alt="Loan Swift Logo"
              width={56}
              height={56}
              className="rounded-circle shadow-sm"
            />
          </Link>
          <h2 className="fs-4 fw-bold text-dark mb-1">Create an Account</h2>
          <p className="text-muted small mb-0">
            Join thousands of borrowers and get pre-approved today
          </p>
        </div>

        {statusMsg && (
          <Alert
            variant={statusMsg.type}
            onClose={() => setStatusMsg(null)}
            dismissible
            className="small mb-3"
          >
            {statusMsg.text}
          </Alert>
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <Email
            email={email}
            handleChangeEmail={handleChangeEmail}
            handleContinue={handleContinue}
            isLoading={isLoading}
          />
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <Password
            email={email}
            handleEditEmail={handleEditEmail}
            password={password}
            handleChangePassword={handleChangePassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            handleSubmitPassword={handleSubmitPassword}
            isLoading={isLoading}
          />
        )}

        <div className="mt-4 pt-3 border-top text-center small text-muted">
          Already have an account?{" "}
          <Link to="/signin" className="fw-semibold text-primary text-decoration-none">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
