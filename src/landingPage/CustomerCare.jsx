import React, { useState } from "react";
import { Container, Form, Button, Col, Row, Alert } from "react-bootstrap";
import "../Components/Styles/Landing/CustomerCare.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import Chat from "../Chat";

const CustomerCare = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const appName = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <div className="page-header-offset py-5 bg-light">
      <Chat />
      <Helmet>
        <title>{appName} — Customer Support & Help Desk</title>
        <meta
          name="description"
          content="Get in touch with customer care for support, loan inquiries, or assistance."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
              <div className="text-center mb-4">
                <div className="d-inline-flex p-3 rounded-circle bg-primary bg-opacity-10 text-primary mb-3">
                  <FontAwesomeIcon icon={faHeadset} size="2x" />
                </div>
                <h1 className="fs-3 fw-bold text-dark mb-1">Customer Support</h1>
                <p className="text-muted small">
                  Have questions or need assistance? Open a support ticket below.
                </p>
              </div>

              {submitted && (
                <Alert
                  variant="success"
                  onClose={() => setSubmitted(false)}
                  dismissible
                >
                  Thank you! Your ticket has been submitted. A support representative will get back to you within 24 hours.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="fw-semibold small">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold small">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMessage">
                  <Form.Label className="fw-semibold small">Message / Inquiry</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe how we can help..."
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" size="lg" className="w-100 fw-semibold d-flex align-items-center justify-content-center gap-2">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>Send Message</span>
                </Button>
              </Form>

              <div className="mt-4 pt-3 border-top">
                <h5 className="fs-6 fw-bold text-dark mb-3">Direct Contact Channels</h5>
                <div className="d-flex flex-column gap-2 small text-muted">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-dark">Email:</span>
                    <a href={`mailto:${process.env.REACT_APP_MAIL && !process.env.REACT_APP_MAIL.includes("hotmail") ? process.env.REACT_APP_MAIL : "support@loanswift.com"}`} className="text-primary text-decoration-none">
                      {process.env.REACT_APP_MAIL && !process.env.REACT_APP_MAIL.includes("hotmail") ? process.env.REACT_APP_MAIL : "support@loanswift.com"}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-dark">Phone:</span>
                    <a href={`tel:${process.env.REACT_APP_NUM || "+1 (564) 332-3980"}`} className="text-primary text-decoration-none">
                      {process.env.REACT_APP_NUM || "+1 (564) 332-3980"}
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-dark">Office:</span>
                    <span>1718 Park Boulevard, Marshalltown, IA 50158</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerCare;
