import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { getDocument, updateDocument } from "../../Firebase/Functions";
import AlertUser from "./AlertUser";

export default function EducationInformation() {
  const [isLoading, setIsLoading] = useState(false);
  const [educationInfo, setEducationInfo] = useState({
    qualification: "University",
    institute: "",
    year: "",
    other: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const result = await getDocument("educationInfo");

      if (result.status && result.datas) {
        setEducationInfo(result.datas);
      } else if (result.message && !result.message.includes("No such document")) {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 4000);
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
      setSuccessMessage("Educational credentials saved successfully.");
      setTimeout(() => setSuccessMessage(null), 6000);
      setIsLoading(false);
    } else {
      setErrorMessage(result.message || "Failed to update education record.");
      setTimeout(() => setErrorMessage(null), 6000);
      setIsLoading(false);
    }
  }

  const qualifications = [
    "University Degree (Bachelor / Master / PhD)",
    "College / Polytechnic Diploma",
    "Business School Certification",
    "High School / Secondary Diploma",
    "Vocational & Technical Training",
    "Other Professional Certification",
  ];

  return (
    <div>
      <Form onSubmit={Submit}>
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <Form.Group controlId="qualification">
              <Form.Label className="fw-semibold small text-dark">
                Highest Educational Qualification
              </Form.Label>
              <Form.Select
                value={educationInfo.qualification}
                required
                onChange={handleChange}
                name="qualification"
                className="py-2"
              >
                {qualifications.map((data, i) => (
                  <option key={i} value={data}>
                    {data}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="institute">
              <Form.Label className="fw-semibold small text-dark">
                Institution or University Name
              </Form.Label>
              <Form.Control
                type="text"
                name="institute"
                required
                value={educationInfo.institute}
                onChange={handleChange}
                placeholder="e.g. University of Manchester / MIT"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="year">
              <Form.Label className="fw-semibold small text-dark">
                Graduation / Completion Year
              </Form.Label>
              <Form.Control
                type="text"
                name="year"
                required
                value={educationInfo.year}
                onChange={handleChange}
                placeholder="e.g. 2021"
                className="py-2"
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="other">
              <Form.Label className="fw-semibold small text-dark">
                Additional Certifications or Honors (Optional)
              </Form.Label>
              <Form.Control
                type="text"
                name="other"
                value={educationInfo.other}
                onChange={handleChange}
                placeholder="e.g. CFA, PMP, CPA"
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
              Saving Credentials...
            </>
          ) : (
            "Save Education Details"
          )}
        </Button>
      </Form>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
