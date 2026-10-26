import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

const Requirement = ({ show, handleClose }) => {
  const { t } = useTranslation();

  const requirements = [
    { name: "Valid Government Issued Photo ID (Passport, Driver's License)", personal: true, equity: true },
    { name: "Proof of Income (Recent pay stubs or bank statement)", personal: true, equity: true },
    { name: "Proof of Address (Utility bill or lease agreement)", personal: true, equity: true },
    { name: "Direct Deposit / Bank Account Details", personal: true, equity: true },
    { name: "Annual Mortgage Statement", personal: false, equity: true },
    { name: "Property Tax Assessment", personal: false, equity: true },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="nav_custom-modal"
    >
      <Modal.Header closeButton className="border-bottom px-4 py-3">
        <Modal.Title className="fs-5 fw-bold text-dark">
          Required Verification Documents
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p className="text-muted small mb-4">
          To verify your identity and protect against fraud, please prepare the following documentation. All files can be uploaded digitally through your secure borrower dashboard.
        </p>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th className="fw-semibold text-dark">Required Document</th>
                <th className="text-center fw-semibold text-dark" style={{ width: "130px" }}>Personal Loan</th>
                <th className="text-center fw-semibold text-dark" style={{ width: "130px" }}>Home Equity</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req, idx) => (
                <tr key={idx}>
                  <td className="small text-dark">{req.name}</td>
                  <td className="text-center">
                    {req.personal ? (
                      <FontAwesomeIcon icon={faCheck} className="text-success" />
                    ) : (
                      <FontAwesomeIcon icon={faClose} className="text-muted opacity-50" />
                    )}
                  </td>
                  <td className="text-center">
                    {req.equity ? (
                      <FontAwesomeIcon icon={faCheck} className="text-success" />
                    ) : (
                      <FontAwesomeIcon icon={faClose} className="text-muted opacity-50" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 px-4 pb-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleClose}
          className="px-4 fw-semibold"
        >
          {t("close") || "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Requirement;
