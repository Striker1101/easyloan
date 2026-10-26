import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Requirement from "./Requirement";
import ApplyModal from "../../Utility/ApplyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Apply() {
  const [showModal, setShowModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="apply-section">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <div className="mb-4">
              <span className="badge-chip bg-primary bg-opacity-10 text-primary mb-2">
                Simple & Transparent
              </span>
              <h2 className="display-6 fw-bold text-dark">Apply in 3 Easy Steps</h2>
              <p className="text-muted">
                Our fully digital application is fast, secure, and has zero impact on your credit score to check rates.
              </p>
            </div>

            <div className="apply-step-item">
              <div className="apply-step-badge">1</div>
              <div>
                <h3 className="fs-5 fw-bold text-dark mb-1">
                  Calculate & Apply Online
                </h3>
                <p className="text-muted small mb-0">
                  Select your desired loan amount, customized term, and complete the digital application in minutes.
                </p>
              </div>
            </div>

            <div className="apply-step-item">
              <div className="apply-step-badge">2</div>
              <div>
                <h3 className="fs-5 fw-bold text-dark mb-1">
                  Rapid Digital Verification
                </h3>
                <p className="text-muted small mb-0">
                  Securely submit your basic verification documents through our encrypted borrower portal.
                </p>
              </div>
            </div>

            <div className="apply-step-item">
              <div className="apply-step-badge">3</div>
              <div>
                <h3 className="fs-5 fw-bold text-dark mb-1">
                  Same-Day Disbursement
                </h3>
                <p className="text-muted small mb-0">
                  Upon approval, funds are transferred directly into your designated bank account.
                </p>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowApplyModal(true)}
                className="d-flex align-items-center gap-2 fw-semibold px-4"
              >
                <span>Apply Now</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
              <button
                onClick={handleShowModal}
                className="btn btn-outline-secondary d-flex align-items-center gap-2 fw-medium px-3"
              >
                <FontAwesomeIcon icon={faFileCircleCheck} className="text-primary" />
                <span>Required Documents</span>
              </button>
            </div>
          </Col>

          <Col lg={5} className="d-none d-lg-block">
            <div className="rounded-4 overflow-hidden shadow-lg border">
              <img
                src="/landing/Homepage/review.avif"
                className="w-100 object-fit-cover"
                alt="Easy application process"
                style={{ maxHeight: "480px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Requirement show={showModal} handleClose={handleCloseModal} />
      <ApplyModal show={showApplyModal} handleClose={() => setShowApplyModal(false)} />
    </section>
  );
}
