import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";
import CurrencyDisplay from "../../international/CurrencyDisplay";

export default function ExpensesInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [expenses, setExpenses] = useState({
    call: "",
    transport: "",
    feeding: "",
    school_fees: "",
    spouse_earning: "",
    dependant: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("expenses");

      if (result.status && result.datas) {
        setExpenses(result.datas);
      } else if (result.message && !result.message.includes("No such document")) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 4000);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenses((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateDocument("expenses", expenses);
    if (result.status) {
      setSuccessMessage("Monthly expenses and liabilities saved successfully.");
      setTimeout(() => setSuccessMessage(null), 6000);
      setIsLoading(false);
    } else {
      setErrorMessage(result.message || "Failed to update expense records.");
      setTimeout(() => setErrorMessage(null), 6000);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form onSubmit={Submit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="feeding">
              <Form.Label className="fw-semibold small text-dark">
                Food & Groceries (<CurrencyDisplay status={false} />/mo)
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="feeding"
                required
                value={expenses.feeding}
                onChange={handleChange}
                placeholder="e.g. 600"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="transport">
              <Form.Label className="fw-semibold small text-dark">
                Transportation & Commute (<CurrencyDisplay status={false} />/mo)
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="transport"
                required
                value={expenses.transport}
                onChange={handleChange}
                placeholder="e.g. 250"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="call">
              <Form.Label className="fw-semibold small text-dark">
                Utilities & Telecoms (<CurrencyDisplay status={false} />/mo)
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="call"
                required
                value={expenses.call}
                onChange={handleChange}
                placeholder="e.g. 150"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="school_fees">
              <Form.Label className="fw-semibold small text-dark">
                Education & School Fees (<CurrencyDisplay status={false} />/mo)
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="school_fees"
                required
                value={expenses.school_fees}
                onChange={handleChange}
                placeholder="e.g. 400"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="spouse_earning">
              <Form.Label className="fw-semibold small text-dark">
                Partner / Household Supplemental Income (<CurrencyDisplay status={false} />/mo)
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="spouse_earning"
                value={expenses.spouse_earning}
                onChange={handleChange}
                placeholder="e.g. 2000"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="dependant">
              <Form.Label className="fw-semibold small text-dark">
                Number of Financial Dependents
              </Form.Label>
              <Form.Control
                type="number"
                min="0"
                name="dependant"
                required
                value={expenses.dependant}
                onChange={handleChange}
                placeholder="e.g. 2"
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
              Saving Expenses...
            </>
          ) : (
            "Save Expenses Profile"
          )}
        </Button>
      </Form>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
