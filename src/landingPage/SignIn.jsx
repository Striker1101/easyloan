import React, { useState, useEffect } from "react";
import "../Components/Styles/Landing/SignIn.css";
import "../Components/Styles/Landing/Signup.css";
import Email from "../Components/LandingPages/SignIn/Email";
import Password from "../Components/LandingPages/SignIn/Password";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  isEmailSignInLink,
  completeEmailLinkSignIn,
} from "../Firebase/Functions";
import { Alert } from "react-bootstrap";

const SignIn = () => {
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    show: true,
    showPassword: false,
  });

  useEffect(() => {
    if (isEmailSignInLink()) {
      setIsLoading(true);
      setStatusMsg({
        type: "info",
        text: "Verifying your sign-in link, please wait...",
      });
      completeEmailLinkSignIn().then((res) => {
        if (res.status) {
          setStatusMsg({
            type: "success",
            text: "Signed in successfully! Redirecting to dashboard...",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 800);
        } else if (res.requiresEmail) {
          setIsLoading(false);
          setStatusMsg({
            type: "warning",
            text: "Please confirm your email address to complete sign in.",
          });
          setFormData((prev) => ({ ...prev, show: true }));
        } else {
          setIsLoading(false);
          setStatusMsg({
            type: "danger",
            text: res.message || "Failed to sign in with email link.",
          });
        }
      });
    }
  }, [navigate]);

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (statusMsg) setStatusMsg(null);
  }

  const handleSubmitEmail = () => {
    const trimmed = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setStatusMsg({ type: "danger", text: "Please enter your email address." });
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setStatusMsg({
        type: "danger",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setStatusMsg(null);
    setFormData((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleEditEmail = () => {
    setStatusMsg(null);
    setFormData((prev) => ({
      ...prev,
      show: true,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  async function handleSubmitPassword() {
    if (!formData.password) {
      setStatusMsg({ type: "danger", text: "Please enter your password." });
      return;
    }
    setIsLoading(true);
    setStatusMsg(null);

    const result = await loginUser(formData.email.trim(), formData.password);
    if (result.status) {
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setStatusMsg({
        type: "danger",
        text: result.message || "Failed to sign in. Please verify credentials.",
      });
    }
  }

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
          <h2 className="fs-4 fw-bold text-dark mb-1">Welcome Back</h2>
          <p className="text-muted small mb-0">Sign in to manage your active loans and requests</p>
        </div>

        {statusMsg && (
          <Alert variant={statusMsg.type} onClose={() => setStatusMsg(null)} dismissible className="small mb-3">
            {statusMsg.text}
          </Alert>
        )}

        {/* Email Step */}
        <Email
          formData={formData}
          handleFormData={handleFormData}
          handleSubmitEmail={handleSubmitEmail}
          isLoading={isLoading}
        />

        {/* Set password */}
        <Password
          formData={formData}
          handleFormData={handleFormData}
          handleEditEmail={handleEditEmail}
          togglePasswordVisibility={togglePasswordVisibility}
          handleSubmitPassword={handleSubmitPassword}
          isLoading={isLoading}
        />

        <div className="mt-4 pt-3 border-top text-center small text-muted d-flex flex-column gap-2">
          <div>
            Not yet a Customer?{" "}
            <Link to="/signup" className="fw-semibold text-primary text-decoration-none">
              Register an account
            </Link>
          </div>
          <div>
            Forgot your password?{" "}
            <Link to="/reset" className="fw-semibold text-secondary text-decoration-none">
              Reset Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
