import React from "react";
import { Alert } from "react-bootstrap";

export default function AlertUser({ successMessage, errorMessage }) {
  return (
    <div>
      {successMessage && (
        <Alert variant="success" dismissible>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" dismissible>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
