import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

const Requirement = ({ show, handleClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className=" nav_custom-modal" // Apply custom CSS classes
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "1.5rem", color: "blue" }}>
          Required Document
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="m-4 text-dark d-flex flex-column align-align-items-center justify-content-conter">
        <p className="fs-6">
          You’ll need to verify your identity and application details. Here’s an
          overview of what you’ll need to provide in-person at your branch or
          submit electronically.
        </p>
        <div class="container w-100">
          <div class=" w-100 row gap-2 ">
            <div class=" col-5"> </div>
            <div class=" fs-6  col require">Loan</div>
            <div class="fs-6 col require">Type</div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5"> </div>
            <div class="fs-6  col">Personal Loan</div>
            <div class="fs-6  col ">Home Equity</div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">Valid Government issued photo ID </div>
            <div class=" col">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">Proof of income</div>
            <div class=" col">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">
              Void cheque or pre-authorized debit form
            </div>
            <div class=" col">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">Proof of address</div>
            <div class=" col">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">Annual mortgage statement</div>
            <div class=" col">
              <FontAwesomeIcon icon={faClose} style={{ color: "red" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>

          <div class=" w-100 row gap-2 ">
            <div class=" col-5 fs-6 ">Annual property tax statement</div>
            <div class=" col">
              <FontAwesomeIcon icon={faClose} style={{ color: "red" }} />
            </div>
            <div class=" col ">
              <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ fontSize: "1.5rem", color: "white" }}
        >
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Requirement;
