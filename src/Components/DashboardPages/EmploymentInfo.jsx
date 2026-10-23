import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";
import CurrencyDisplay from "../../international/CurrencyDisplay";

export default function EmploymentInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [emploInfo, setEmploInfo] = useState({
    status: "Employed",
    income: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("emploInfo");

      if (result.status && result.datas) {
        setEmploInfo(result.datas);
      } else if (result.message && !result.message.includes("No such document")) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmploInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateDocument("emploInfo", emploInfo);
    if (result.status) {
      setSuccessMessage("Employment and income details updated successfully.");
      setTimeout(() => setSuccessMessage(null), 6000);
      setIsLoading(false);
    } else {
      setErrorMessage(result.message || "Failed to update employment details.");
      setTimeout(() => setErrorMessage(null), 6000);
      setIsLoading(false);
    }
  }

  const employmentStatuses = [
    "Employed (Full-Time)",
    "Employed (Part-Time)",
    "Self Employed / Business Owner",
    "Employer",
    "Retired",
    "Unemployed",
  ];

  return (
    <div>
      <Form onSubmit={Submit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="status">
              <Form.Label className="fw-semibold small text-dark">
                Employment Status
              </Form.Label>
              <Form.Select
                value={emploInfo.status}
                required
                onChange={handleChange}
                name="status"
                className="py-2"
              >
                {employmentStatuses.map((data, i) => (
                  <option key={i} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="income">
              <Form.Label className="fw-semibold small text-dark">
                Net Monthly Income (<CurrencyDisplay status={false} />)
              </Form.Label>
              <Form.Control
                type="number"
                min={1}
                name="income"
                required
                value={emploInfo.income}
                onChange={handleChange}
                placeholder="e.g. 4500"
                className="py-2"
              />
              <Form.Text className="text-muted small">
                Used to verify repayment capacity under responsible lending regulations.
              </Form.Text>
            </Form.Group>
          </div>
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="fw-semibold px-4 py-2"
        >
          {isLoading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" className="me-2" />
              Saving Changes...
            </>
          ) : (
            "Save Employment Details"
          )}
        </Button>
      </Form>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
