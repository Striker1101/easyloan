import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function Product({
  product,
  setInfo,
  handleChange,
  handleSubmit,
}) {
  useEffect(() => {
    if (product.status) {
      setInfo((prev) => ({
        ...prev,
        status: true,
        details: "Product Information",
      }));
    }
  }, [product.status]);
  return (
    <div>
      {product.status && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              min="1000"
              max="5000000000"
              value={product.data.amount}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDuration">
            <Form.Label>Duration (months)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              min="1"
              max="24"
              value={product.data.duration}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRepay">
            <Form.Label>Repay ($)</Form.Label>
            <Form.Control
              type="text"
              name="repay"
              value={product.data.repay.toFixed(2)}
              readOnly
            />
          </Form.Group>

          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
