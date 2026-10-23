import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
  faPenToSquare,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Password({
  formData,
  handleFormData,
  handleEditEmail,
  togglePasswordVisibility,
  handleSubmitPassword,
  isLoading,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitPassword();
  };

  return (
    <div>
      {!formData.show && (
        <Form onSubmit={onSubmit} className="signup-form">
          {/* Identity badge showing who is signing in */}
          <div className="auth-identity-badge d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary flex-shrink-0" />
              <div className="text-truncate">
                <span className="text-muted small d-block" style={{ fontSize: "0.72rem" }}>
                  Signing in as
                </span>
                <span className="fw-semibold text-dark small text-truncate d-block">
                  {formData.email}
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

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label className="fw-semibold small text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faLock} className="text-primary" />
              <span>Password</span>
            </Form.Label>
            <div className="auth-input-group has-toggle">
              <Form.Control
                type={formData.showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                name="password"
                required
                autoFocus
                onChange={handleFormData}
                disabled={isLoading}
              />
              <button
                className="auth-toggle-btn"
                type="button"
                onClick={togglePasswordVisibility}
                tabIndex="-1"
                aria-label={formData.showPassword ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon
                  icon={formData.showPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 auth-submit-btn d-flex align-items-center justify-content-center gap-2 mt-4"
            disabled={isLoading || !formData.password}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </Button>
        </Form>
      )}
    </div>
  );
}
