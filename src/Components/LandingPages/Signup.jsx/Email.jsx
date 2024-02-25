import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Email({
  email,
  handleChangeEmail,
  handleSendVerificationCode,
}) {
  return (
    <div>
      {email.showEmail && (
        <Form className={`signup-form ${email.showEmail ? "slide-in" : ""}`}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={email.email}
              name="email"
              required
              onChange={(e) => handleChangeEmail(e)}
            />
          </Form.Group>
          <Button
            onClick={handleSendVerificationCode}
            className="m-3"
            variant="primary"
          >
            Send Verification Code
          </Button>
        </Form>
      )}
    </div>
  );
}
