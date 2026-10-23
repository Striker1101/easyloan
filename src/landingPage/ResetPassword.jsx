import React, { useState } from "react";
import Email from "../Components/LandingPages/ResetPassword/Email.jsx";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { resetPassword } from "../Firebase/Functions";

const ResetPassword = () => {
  const [statusMsg, setStatusMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    if (statusMsg) setStatusMsg(null);
  }

  const handleSubmitEmail = async () => {
    const trimmed = formData.email.trim();
    if (!trimmed) {
      setStatusMsg({ type: "danger", text: "Please enter your account email." });
      return;
    }

    setIsLoading(true);
    setStatusMsg(null);

    try {
      const res = await resetPassword(trimmed);
      if (res && res.status) {
        setStatusMsg({
          type: "success",
          text: "Password reset link sent! Please check your email inbox to proceed.",
        });
      } else {
        setStatusMsg({
          type: "danger",
          text: res?.message || "Failed to send reset link. Please check your email and retry.",
        });
      }
    } catch (err) {
      setStatusMsg({
        type: "danger",
        text: err.message || "Failed to send reset link. Please check your email and retry.",
      });
    } finally {
      setIsLoading(false);
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
          <h2 className="fs-4 fw-bold text-dark mb-1">Reset Your Password</h2>
          <p className="text-muted small mb-0">Enter your email and we'll send you recovery instructions</p>
        </div>

        {statusMsg && (
          <Alert variant={statusMsg.type} onClose={() => setStatusMsg(null)} dismissible className="small mb-3">
            {statusMsg.text}
          </Alert>
        )}

        <Email
          formData={formData}
          handleFormData={handleFormData}
          handleSubmitEmail={handleSubmitEmail}
          isLoading={isLoading}
        />

        <div className="mt-4 pt-3 border-top text-center small text-muted d-flex flex-column gap-2">
          <div>
            Remembered your credentials?{" "}
            <Link to="/signin" className="fw-semibold text-primary text-decoration-none">
              Back to Sign In
            </Link>
          </div>
          <div>
            Don't have an account?{" "}
            <Link to="/signup" className="fw-semibold text-secondary text-decoration-none">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
