import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";
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

      if (result.status) {
        setExpenses(result.datas);
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 2000); // 2 minutes in milliseconds
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
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setIsLoading(false);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }
  }

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Group controlId="call">
          <Form.Label>Call:</Form.Label>
          <Form.Control
            type="text"
            name="call"
            required
            value={expenses.call}
            onChange={handleChange}
            placeholder="Input Your Calls Details "
          />
        </Form.Group>

        <Form.Group controlId="feeding">
          <Form.Label>Feeding:</Form.Label>
          <Form.Control
            type="text"
            name="feeding"
            required
            value={expenses.feeding}
            onChange={handleChange}
            placeholder="Input Feeding Details"
          />
        </Form.Group>

        <Form.Group controlId="school_fees">
          <Form.Label>School Fees:</Form.Label>
          <Form.Control
            type="text"
            name="school_fees"
            required
            value={expenses.school_fees}
            onChange={handleChange}
            placeholder="Input School Fees"
          />
        </Form.Group>

        <Form.Group controlId="spouse_earning">
          <Form.Label>Spouse Earning:</Form.Label>
          <Form.Control
            type="text"
            name="spouse_earning"
            required
            value={expenses.spouse_earning}
            onChange={handleChange}
            placeholder="Input Spouse Earning"
          />
        </Form.Group>

        <Form.Group controlId="transport">
          <Form.Label>Transport:</Form.Label>
          <Form.Control
            type="text"
            name="transport"
            required
            value={expenses.transport}
            onChange={handleChange}
            placeholder="Input Transport"
          />
        </Form.Group>

        <Form.Group controlId="dependant">
          <Form.Label>How Many Dependants do you have:</Form.Label>
          <Form.Control
            type="number"
            min={1}
            minLength={1}
            name="dependant"
            required
            value={expenses.dependant}
            onChange={handleChange}
            placeholder="Input Dependant Number"
          />
        </Form.Group>

        {/* Add more form fields as needed */}
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="m-2"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-1"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
