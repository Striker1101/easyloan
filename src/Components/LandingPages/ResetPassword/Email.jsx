import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Email({ formData, handleFormData, handleSubmitEmail, isLoading }) {
  const onSubmit = (e) => {
    e.preventDefault();
    if (typeof handleSubmitEmail === "function") {
      handleSubmitEmail();
    }
  };

  return (
    <div>
      {formData.show && (
        <Form onSubmit={onSubmit} className="signup-form">
          <Form.Group controlId="formResetEmail" className="mb-4">
            <Form.Label className="fw-semibold small text-dark">Account Email Address</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                name="email"
                onChange={handleFormData}
                className="border-start-0 py-2"
                required
                autoFocus
              />
            </div>
            <Form.Text className="text-muted small mt-1 d-block">
              We'll send a password reset link to this verified email address.
            </Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !formData.email}
            className="w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" />
                <span>Sending Instructions...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Send Reset Link</span>
              </>
            )}
          </Button>
        </Form>
      )}
    </div>
  );
}
