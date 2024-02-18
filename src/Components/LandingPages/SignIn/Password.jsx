import React from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Password({
  formData,
  handleFormData,
  togglePasswordVisibility,
  handleSubmitPassword,
}) {
  return (
    <div>
      {!formData.show && (
        <Form className={`signup-form ${formData.show ? "slide-in" : ""}`}>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={!formData.showPassword ? "text" : "password"}
                placeholder="Enter password"
                defaultValue={formData.password}
                name="key"
                onChange={handleFormData}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={formData.showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
          </Form.Group>
          <Button
            className="m-3"
            variant="primary"
            onClick={handleSubmitPassword}
          >
            Login Account
          </Button>
        </Form>
      )}
    </div>
  );
}
