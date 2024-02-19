import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Requirement from "./Requirement";
import { Link } from "react-router-dom";
function Apply() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <Container fluid className="p-3">
      <Row className="row">
        <Col
          lg={6}
          className="order-lg-1 order-1 d-flex flex-column  justify-content-center  align-items-center   "
        >
          <div className="text-align-content-center ">
            <h1 className="text-primary">Apply in 3 easy Steps</h1>
          </div>
          <div className="d-flex g-2 align-items-center w-100  ">
            <strong className="apply_num fs-4">1</strong>
            <h2>
              {" "}
              Apply on the phone, online or at one of over 400 locations
              nationally
            </h2>
          </div>
          <div className="d-flex g-2 align-items-center w-100 ">
            <strong className="apply_num fs-4">2</strong>
            <h2> Choose the loan that’s right for you</h2>
          </div>
          <div className="d-flex align-items-center w-100  ">
            <strong className="apply_num fs-4">3</strong>
            <h2> Get your money as soon as today</h2>
          </div>
          <Link to={"/firebase_auth"}>
            <Button className="px-4 py-2 m-3" fw-semibold variant="primary">
              {" "}
              Apply Now
            </Button>
          </Link>
          <p>
            See what{" "}
            <button
              onClick={handleShowModal}
              className="border-0 bg-bg-transparent text-success fw-medium button_apply"
            >
              documents
            </button>
            you need to apply
          </p>
        </Col>
        <Col lg={6} className=" order-lg-2 d-none d-lg-block">
          <img src="/landing/Homepage/review.avif" className="w-100 " alt="" />
        </Col>
      </Row>

      <Requirement show={showModal} handleClose={handleCloseModal} />
    </Container>
  );
}

export default Apply;
