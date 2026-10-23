import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faArrowRight,
  faShieldHalved,
  faCheckCircle,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ApplyModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const appName = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="apply-flow-modal"
      backdropClassName="apply-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
        <div>
          <span className="badge-chip bg-primary bg-opacity-10 text-primary mb-2">
            Secure Application Portal
          </span>
          <h4 className="fw-bold text-dark mb-1">
            Get Started with {appName}
          </h4>
          <p className="text-muted small mb-0">
            Select your account type to proceed with your application
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        <Row className="g-3 mb-4">
          {/* New User Option */}
          <Col md={6}>
            <div className="apply-choice-card new-user h-100 d-flex flex-column justify-content-between p-4 rounded-4 border">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="apply-icon-circle bg-primary bg-opacity-10 text-primary">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </div>
                  <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold px-2 py-1 small">
                    First-time User
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-2">
                  {t("new_user") || "New Customer"}
                </h5>
                <p className="text-muted small mb-3">
                  {t("first_timer") ||
                    "If this is your first time using our services, create an account to get pre-approved in minutes."}
                </p>

                <ul className="apply-benefits-list list-unstyled small text-muted mb-4">
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                    <span>Instant decision & zero credit impact</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                    <span>Fast funding directly to your bank</span>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                    <span>Transparent rates with no hidden fees</span>
                  </li>
                </ul>
              </div>

              <Link to="/signup" className="text-decoration-none w-100">
                <Button
                  onClick={handleClose}
                  variant="primary"
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <span>Create Account & Apply</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </Link>
            </div>
          </Col>

          {/* Existing User Option */}
          <Col md={6}>
            <div className="apply-choice-card existing-user h-100 d-flex flex-column justify-content-between p-4 rounded-4 border">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="apply-icon-circle bg-info bg-opacity-10 text-info">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </div>
                  <span className="badge bg-secondary bg-opacity-10 text-secondary fw-semibold px-2 py-1 small">
                    Returning Customer
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-2">
                  {t("existing_user") || "Existing Customer"}
                </h5>
                <p className="text-muted small mb-3">
                  {t("old_user") ||
                    "If you already have an account with us, sign in to view active loans and submit new requests."}
                </p>

                <ul className="apply-benefits-list list-unstyled small text-muted mb-4">
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
                    <span>1-click application with saved profile</span>
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
                    <span>Track active disbursements & schedules</span>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
                    <span>Access exclusive returning borrower rates</span>
                  </li>
                </ul>
              </div>

              <Link to="/signin" className="text-decoration-none w-100">
                <Button
                  onClick={handleClose}
                  variant="outline-primary"
                  className="w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                >
                  <span>Sign In & Continue</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* Regulatory & Responsible Lending Notice */}
        <div className="apply-notice-box p-3 rounded-3 bg-light border d-flex gap-3 align-items-start">
          <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary mt-1">
            <FontAwesomeIcon icon={faShieldHalved} />
          </div>
          <div className="small text-muted">
            <strong className="text-dark d-block mb-1">
              Responsible Lending Notice
            </strong>
            <p className="mb-0" style={{ fontSize: "0.82rem", lineHeight: "1.45" }}>
              Please note that eligible customers may borrow up to 200% of their verifiable gross monthly income. {appName} financing solutions are designed for flexible, transparent short-term and medium-term requirements. Terms and conditions apply upon credit assessment.
            </p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 px-4 pb-4 justify-content-center">
        <Button
          variant="link"
          onClick={handleClose}
          className="text-muted text-decoration-none small py-1"
        >
          Cancel & Return
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyModal;
