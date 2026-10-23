import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import AlertUser from "./AlertUser";

export default function Personal({ status = true, handleSubmit, setInfo }) {
  const [isLoading, setIsLoading] = useState(false);
  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male",
    marital_status: "Single",
    nin: "",
    nationality: "",
    region: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCountryChange = (val) => {
    setPersonal((prev) => ({
      ...prev,
      nationality: val,
    }));
  };

  const handleRegionChange = (val) => {
    setPersonal((prev) => ({
      ...prev,
      region: val,
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("personal");

      if (result.status && result.datas) {
        setPersonal(result.datas);
      } else if (result.message && !result.message.includes("No such document")) {

        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 3000);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (status && typeof setInfo === "function") {
      setInfo((prev) => ({
        ...prev,
        status: true,
        details: "Personal Information",
      }));
    }
  }, [status, setInfo]);

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
      setSuccessMessage("Personal identification updated successfully.");
      setTimeout(() => setSuccessMessage(null), 6000);
      setIsLoading(false);
      if (typeof handleSubmit === "function") {
        handleSubmit(e);
      }
    } else {
      setErrorMessage(result.message || "Failed to update personal details.");
      setTimeout(() => setErrorMessage(null), 6000);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {status && (
        <>
          <Form onSubmit={Submit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <Form.Group controlId="fullName">
                  <Form.Label className="fw-semibold small text-dark">
                    Full Legal Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    required
                    value={personal.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Johnathan Doe"
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
                    value={personal.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    className="py-2"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="phone">
                  <Form.Label className="fw-semibold small text-dark">
                    Mobile Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={personal.phone}
                    required
                    onChange={handleChange}
                    placeholder="e.g. +1 555-019-2834"
                    className="py-2"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="dob">
                  <Form.Label className="fw-semibold small text-dark">
                    Date of Birth
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    required
                    value={personal.dob}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="gender">
                  <Form.Label className="fw-semibold small text-dark">
                    Gender Identity
                  </Form.Label>
                  <Form.Select
                    value={personal.gender}
                    required
                    onChange={handleChange}
                    name="gender"
                    className="py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer Not to Say</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="marital_Status">
                  <Form.Label className="fw-semibold small text-dark">
                    Marital Status
                  </Form.Label>
                  <Form.Select
                    required
                    value={personal.marital_status}
                    onChange={handleChange}
                    name="marital_status"
                    className="py-2"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Prefer not to say">Prefer Not to Say</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="nin">
                  <Form.Label className="fw-semibold small text-dark">
                    Government Identification (SSN / SIN / NIN)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nin"
                    value={personal.nin}
                    required
                    onChange={handleChange}
                    placeholder="National ID / SSN Number"
                    className="py-2"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="nationality">
                  <Form.Label className="fw-semibold small text-dark">
                    Country of Citizenship
                  </Form.Label>
                  <CountryDropdown
                    id="country"
                    value={personal.nationality}
                    required
                    onChange={handleCountryChange}
                    className="form-select py-2"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group controlId="region">
                  <Form.Label className="fw-semibold small text-dark">
                    State / Province / Region
                  </Form.Label>
                  <RegionDropdown
                    id="region"
                    country={personal.nationality}
                    required
                    value={personal.region}
                    className="form-select py-2"
                    onChange={handleRegionChange}
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
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    className="me-2"
                  />
                  Saving Changes...
                </>
              ) : (
                "Save Personal Details"
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
