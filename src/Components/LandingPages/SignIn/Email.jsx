import React from "react";
import { Form, Button } from "react-bootstrap";

export default function Email({ formData, handleFormData, handleSubmitEmail }) {
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
          <Button className="m-3" variant="primary" onClick={handleSubmitEmail}>
            Connect
          </Button>
        </Form>
      )}
    </div>
  );
}
