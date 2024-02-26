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
    relationship: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("nok");

      if (result.status) {
        setNok(result.datas);
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 2000); // 2 minutes in milliseconds
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
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setIsLoading(false);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }
  }
  const datas = ["Spouse", "Sibling", "Child", "Relative", "Friend"];

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Group controlId="relationship">
          <Form.Label>Relationship:</Form.Label>
          <Form.Control
            as="select"
            value={nok.relationship}
            required
            onChange={handleChange}
            name="relationship"
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

        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={nok.name}
            onChange={handleChange}
            placeholder="Input Your Name "
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            value={nok.email}
            onChange={handleChange}
            placeholder="Input Email Address"
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            required
            value={nok.phone}
            onChange={handleChange}
            placeholder="Input Phone Number"
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            required
            value={nok.address}
            onChange={handleChange}
            placeholder="Input Address"
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
