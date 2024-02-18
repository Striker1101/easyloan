import React from "react";
import { Form, Button } from "react-bootstrap";

export default function VerificaionCode({
  email,
  handleChangeEmail,
  handleCodeSave,
  sendCode,
}) {
  return (
    <div>
      {email.showCode && (
        <Form className={`signup-form ${email.showCode ? "slide-in" : ""}`}>
          <Form.Group controlId="formVerificationCode">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email Address"
              defaultValue={email.address}
              onChange={handleChangeEmail}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formCode">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Code"
              defaultValue={email.code}
              name="code"
              onChange={handleChangeEmail}
            />
          </Form.Group>
          <Button className="m-3 " variant="primary" onClick={handleCodeSave}>
            Verify Account
          </Button>
          <br />
          Didn't Receive Code{" "}
          <a href="#" onClick={sendCode}>
            {" "}
            Click Me
          </a>
        </Form>
      )}
    </div>
  );
}
