import React from "react";
import { Form, Button } from "react-bootstrap";
import { handleSendCode, resetPassword } from "../../../Firebase/Functions";

export default function Email({ formData, handleFormData }) {
  async function handleRetrive() {
    const result = await resetPassword(formData.email);
    console.log(result);
    if (result) {
      alert(result.message);
    }
  }
  async function handleVerify() {
    const result = await handleSendCode(formData.email);
    alert(result.message);
  }
  return (
    <div>
      {formData.show && (
        <Form className={`signup-form ${formData.show ? "slide-in" : ""}`}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={formData.email}
              name="email"
              onChange={(e) => handleFormData(e)}
            />
          </Form.Group>
          <Button className="m-3" variant="primary" onClick={handleRetrive}>
            Retrive
          </Button>
          <Button className="m-3" variant="success" onClick={handleVerify}>
            Email Verification
          </Button>
        </Form>
      )}
    </div>
  );
}
