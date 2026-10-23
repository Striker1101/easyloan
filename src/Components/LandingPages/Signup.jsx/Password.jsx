import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faPenToSquare,
  faLock,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Password({
  email,
  handleEditEmail,
  password,
  handleChangePassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  handleSubmitPassword,
  isLoading,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitPassword();
  };

  const passwordsMatch =
    password.confirmKey && password.key === password.confirmKey;
  const passwordsMismatch =
    password.confirmKey && password.key !== password.confirmKey;

  return (
    <Form onSubmit={onSubmit} className="signup-form">
      {/* Verified Email Identity Badge with Edit capability */}
      <div className="auth-identity-badge d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
          <FontAwesomeIcon icon={faEnvelope} className="text-primary flex-shrink-0" />
          <div className="text-truncate">
            <span className="text-muted small d-block" style={{ fontSize: "0.72rem" }}>
              Creating account for
            </span>
            <span className="fw-semibold text-dark small text-truncate d-block">
              {email}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleEditEmail}
          className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0 d-flex align-items-center gap-1 flex-shrink-0"
          title="Change email"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          <span className="small">Edit</span>
        </button>
      </div>

      {/* Password Field */}
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label className="fw-semibold small text-dark d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faLock} className="text-primary" />
          <span>Password</span>
        </Form.Label>
        <div className="auth-input-group has-toggle">
          <Form.Control
            type={password.showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password.key}
            name="key"
            required
            autoFocus
            onChange={handleChangePassword}
            disabled={isLoading}
          />
          <button
            className="auth-toggle-btn"
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex="-1"
            aria-label={password.showPassword ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon
              icon={password.showPassword ? faEyeSlash : faEye}
            />
          </button>
        </div>
        <Form.Text className="auth-helper-text mt-1 d-block">
          Must be at least 6 characters.
        </Form.Text>
      </Form.Group>

      {/* Confirm Password Field */}
      <Form.Group controlId="formConfirmPassword" className="mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <Form.Label className="fw-semibold small text-dark d-flex align-items-center gap-2 mb-1">
            <FontAwesomeIcon icon={faLock} className="text-primary" />
            <span>Confirm Password</span>
          </Form.Label>
          {passwordsMatch && (
            <span className="text-success small d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
              <FontAwesomeIcon icon={faCheckCircle} /> Passwords match
            </span>
          )}
          {passwordsMismatch && (
            <span className="text-danger small d-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
              <FontAwesomeIcon icon={faExclamationCircle} /> Passwords must match
            </span>
          )}
        </div>
        <div className="auth-input-group has-toggle">
          <Form.Control
            type={password.showConfirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            value={password.confirmKey}
            name="confirmKey"
            required
            onChange={handleChangePassword}
            disabled={isLoading}
          />
          <button
            className="auth-toggle-btn"
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            tabIndex="-1"
            aria-label={
              password.showConfirmPassword ? "Hide password" : "Show password"
            }
          >
            <FontAwesomeIcon
              icon={password.showConfirmPassword ? faEyeSlash : faEye}
            />
          </button>
        </div>
      </Form.Group>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        className="w-100 auth-submit-btn d-flex align-items-center justify-content-center gap-2 mt-4"
        disabled={
          isLoading ||
          !password.key ||
          !password.confirmKey ||
          password.key !== password.confirmKey ||
          password.key.length < 6
        }
      >
        {isLoading ? (
          <>
            <Spinner animation="border" size="sm" />
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </Button>

      <p className="text-muted text-center small mt-3 mb-0" style={{ fontSize: "0.75rem" }}>
        By creating an account, you agree to our{" "}
        <Link to="/policy" className="text-decoration-none text-primary">
          Terms of Service & Privacy Policy
        </Link>.
      </p>
    </Form>
  );
}
