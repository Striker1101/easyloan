import React from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Email({ formData, handleFormData, handleSubmitEmail, isLoading }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmitEmail();
  };

  return (
    <div>
      {formData.show && (
        <Form onSubmit={onSubmit} className="signup-form">
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label className="fw-semibold small text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
              <span>Email Address</span>
            </Form.Label>
            <div className="auth-input-group">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                name="email"
                required
                autoFocus
                onChange={handleFormData}
                disabled={isLoading}
              />
            </div>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 auth-submit-btn d-flex align-items-center justify-content-center gap-2 mt-4"
            disabled={isLoading || !formData.email.trim()}
          >
            <span>Continue</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Form>
      )}
    </div>
  );
}
