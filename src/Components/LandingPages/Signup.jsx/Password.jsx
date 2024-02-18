import React from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Password({
  password,
  handleChangePassword,
  togglePasswordVisibility,
  handleSubmitPassword,
}) {
  return (
    <div>
      {password.display && (
        <Form className={`signup-form ${password.display ? "slide-in" : ""}`}>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={password.showPassword ? "text" : "password"}
                placeholder="Enter password"
                defaultValue={password.key}
                name="key"
                onChange={handleChangePassword}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={password.showPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            </div>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={password.showPassword ? "text" : "password"}
                placeholder="Enter password"
                defaultValue={password.confirmKey}
                onChange={handleChangePassword}
                name="confirmKey"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={password.showPassword ? faEyeSlash : faEye}
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
            Create Account
          </Button>
        </Form>
      )}
    </div>
  );
}
