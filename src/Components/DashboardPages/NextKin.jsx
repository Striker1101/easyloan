import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";

export default function NextKin() {
  const [isLoading, setIsLoading] = useState(false);
  const [nok, setNok] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    relationship: "Spouse",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("nok");

      if (result.status && result.datas) {
        setNok(result.datas);
      } else if (result.message && !result.message.includes("No such document")) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNok((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateDocument("nok", nok);
    if (result.status) {
      setSuccessMessage("Next of kin and emergency contact updated successfully.");
      setTimeout(() => setSuccessMessage(null), 6000);
      setIsLoading(false);
    } else {
      setErrorMessage(result.message || "Failed to save next of kin details.");
      setTimeout(() => setErrorMessage(null), 6000);
      setIsLoading(false);
    }
  }

  const relationships = ["Spouse", "Parent", "Sibling", "Child", "Relative", "Business Partner / Colleague", "Friend"];

  return (
    <div>
      <Form onSubmit={Submit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="name">
              <Form.Label className="fw-semibold small text-dark">
                Full Legal Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={nok.name}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="relationship">
              <Form.Label className="fw-semibold small text-dark">
                Relationship to Borrower
              </Form.Label>
              <Form.Select
                value={nok.relationship}
                required
                onChange={handleChange}
                name="relationship"
                className="py-2"
              >
                {relationships.map((data, i) => (
                  <option key={i} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="phone">
              <Form.Label className="fw-semibold small text-dark">
                Emergency Phone Number
              </Form.Label>
              <Form.Control
                type="text"
                name="phone"
                required
                value={nok.phone}
                onChange={handleChange}
                placeholder="e.g. +1 555-019-2834"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="email">
              <Form.Label className="fw-semibold small text-dark">
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={nok.email}
                onChange={handleChange}
                placeholder="e.g. contact@example.com"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-12">
            <Form.Group controlId="address">
              <Form.Label className="fw-semibold small text-dark">
                Residential Street Address
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                required
                value={nok.address}
                onChange={handleChange}
                placeholder="e.g. 742 Evergreen Terrace, Springfield"
                className="py-2"
              />
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
              Saving Contact...
            </>
          ) : (
            "Save Emergency Contact"
          )}
        </Button>
      </Form>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
