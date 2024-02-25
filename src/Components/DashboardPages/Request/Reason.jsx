import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export default function Reason({
  handleChange,
  setInfo,
  reason,
  handleSubmit,
}) {
  const datas = [
    "Personal Loan",
    "Automobile",
    "Business",
    "Cash advances",
    "Debt Consolidation",
    "Education",
    "Financing a vacation",
    "Home purchase, renovations & refurbushing",
    "Medical Emergencies",
    "Personal Loan",
    "Small Business Loan",
    "Weddings & family function",
  ];
  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      details: "Tell us why you want this loan",
      status: true,
    }));
  }, [reason.status]);

  return (
    <div>
      {reason.status && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reason">
            <Form.Label>Reason:</Form.Label>
            <Form.Control
              as="select"
              value={reason.reason}
              onChange={handleChange}
            >
              <option value="" defaultValue>
                Select a reason
              </option>
              {datas.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
              <option value="Others">Others</option>
            </Form.Control>
          </Form.Group>

          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}
