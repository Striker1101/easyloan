import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";
export default function EducationInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const [educationInfo, setEducationInfo] = useState({
    qualification: "",
    institute: "",
    year: "",
    other: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("educationInfo");

      if (result.status) {
        setEducationInfo(result.datas);
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 2000); // 2 minutes in milliseconds
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateDocument("educationInfo", educationInfo);
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
    "Business School",
    "High School",
    "Nursing School",
    "University",
  ];

  return (
    <div>
      <Form onSubmit={Submit}>
        <Form.Group controlId="qualification">
          <Form.Label>Higher Education Qualification:</Form.Label>
          <Form.Control
            as="select"
            value={educationInfo.qualification}
            required
            onChange={handleChange}
            name="qualification"
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

        <Form.Group controlId="institute">
          <Form.Label>Institute:</Form.Label>
          <Form.Control
            type="text"
            name="institute"
            required
            value={educationInfo.institute}
            onChange={handleChange}
            placeholder="Input Your Institute "
          />
        </Form.Group>

        <Form.Group controlId="year">
          <Form.Label>Qualification Year:</Form.Label>
          <Form.Control
            type="text"
            name="year"
            required
            value={educationInfo.year}
            onChange={handleChange}
            placeholder="Input Your year of qualification "
          />
        </Form.Group>

        <Form.Group controlId="other">
          <Form.Label>Others Qualification:</Form.Label>
          <Form.Control
            type="text"
            name="other"
            required
            value={educationInfo.other}
            onChange={handleChange}
            placeholder="Input Your other qualification "
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
