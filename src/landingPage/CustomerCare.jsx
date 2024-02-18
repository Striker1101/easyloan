import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import "../Components/Styles/Landing/CustomerCare.css"; // Import your CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faComments } from "@fortawesome/free-solid-svg-icons";

const CustomerCare = () => {
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
    // Add logic to handle form submission (e.g., send data to server)
    console.log(formData);
  };

  return (
    <div className="customer-support-page pt-5 text-bg-light ">
      <Container className="w-100 pt-5">
        <Row className="justify-content-center align-items-center w-100 pt-5  ">
          <Col md={8} className="pt-5">
            <div className="support-form">
              <h2>Contact Customer Support (Open Ticket)</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Your Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Your Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Label>Message:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="m-3 ">
                  <FontAwesomeIcon icon={faEnvelope} /> Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="chat-widget">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="chat-box">
                <h2>Live Chat Support</h2>
                <p>
                  We're here to help! Click below to start a live chat with one
                  of our support agents.
                </p>
                <Button
                  variant="info"
                  href="https://www.tidio.com/"
                  target="_blank"
                  className="m-3 "
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faComments} /> Chat with Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default CustomerCare;
