import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import AlertUser from "./AlertUser";
export default function Personal({ status, handleSubmit, setInfo }) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    marital_status: "",
    nationality: country,
    region,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const handleCountryChange = (val) => {
    setCountry(val);
    setPersonal((prev) => ({
      ...prev,
      nationality: val,
    }));
    console.log(country);
  };

  const handleRegionChange = (val) => {
    setRegion(val);
    setPersonal((prev) => ({
      ...prev,
      region: val,
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("personal");

      if (result.status) {
        setPersonal(result.datas);
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 2000); // 2 minutes in milliseconds
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (status) {
      setInfo((prev) => ({
        ...prev,
        status: true,
        details: "Personal Information",
      }));
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const result = await updateDocument("personal", personal);
    if (result.status) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setIsLoading(false);
      handleSubmit(e);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }
  }

  return (
    <div>
      {status && (
        <>
          <Form onSubmit={Submit}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                required
                value={personal.fullName}
                onChange={handleChange}
                placeholder="Input Your Full Name"
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={personal.email}
                onChange={handleChange}
                placeholder="Input Your Email Address"
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone:</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={personal.phone}
                required
                onChange={handleChange}
                placeholder="Input Your Number"
              />
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                required
                value={personal.dob}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                value={personal.gender}
                required
                onChange={handleChange}
                name="gender"
              >
                <option value="">Select a Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Prefer not to say">Prefer Not to Say</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="marital_Status">
              <Form.Label>Marital Status:</Form.Label>
              <Form.Control
                as="select"
                required
                value={personal.marital_status}
                onChange={handleChange}
                name="marital_status"
              >
                <option value="">Select a Marital Status</option>

                <option value="Single">Single</option>

                <option value="Married">Married</option>

                <option value="Divorced">Divorced</option>

                <option value="Prefer not to say">Prefer Not to Say</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="nationality">
              <Form.Label>Nationality:</Form.Label>
              <CountryDropdown
                id="country"
                value={country}
                required
                onChange={handleCountryChange}
                className="form-control"
              />
            </Form.Group>

            <Form.Group controlId="region">
              <Form.Label>Region:</Form.Label>
              <RegionDropdown
                id="region"
                country={country}
                required
                value={region}
                className="form-control"
                onChange={handleRegionChange}
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
          <AlertUser
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </>
      )}
    </div>
  );
}
