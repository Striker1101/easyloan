import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";
export default function EmploymentInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [emploInfo, setEmploInfo] = useState({
    status: "",
    income: 0,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("emploInfo");

      if (result.status) {
        setEmploInfo(result.datas);
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 2000); // 2 minutes in milliseconds
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
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setIsLoading(false);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }
  }
  const datas = [
    "Employed",
    "Employer",
    "Retired",
    "Self Employed",
    "Unemployed",
  ];

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Group controlId="status">
          <Form.Label>EMployment Status:</Form.Label>
          <Form.Control
            as="select"
            value={emploInfo.status}
            required
            onChange={handleChange}
            name="status"
          >
            {datas.map((data, i) => {
              return (
                <option key={i} value={data}>
                  {data}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="income">
          <Form.Label>Net Monthly income:</Form.Label>
          <Form.Control
            type="number"
            min={1}
            minLength={1}
            name="income"
            required
            value={emploInfo.income}
            onChange={handleChange}
            placeholder="Input Your income "
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
