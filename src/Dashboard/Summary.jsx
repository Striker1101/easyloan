import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faEye,
  faCheckCircle,
  faHourglassHalf,
  faFileInvoiceDollar,
  faShieldHalved,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CurrencyDisplay from "../international/CurrencyDisplay";

const Summary = ({ summary }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (loanItem) => {
    setSelectedLoan(loanItem);
    setShowModal(true);
  };

  const safeLoans = Array.isArray(summary) ? summary : [];

  return (
    <div>
      <div className="dash-page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="dash-page-title">Loan Applications Summary</h2>
          <p className="dash-page-subtitle">
            Comprehensive audit of all credit requests, approvals, and repayment terms.
          </p>
        </div>
        <Link to="/dashboard/request" className="btn btn-primary fw-semibold px-3 py-2">
          <span>New Application</span>
          <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </Link>
      </div>

      <div className="dash-card">
        {safeLoans.length === 0 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <h4 className="dash-empty-title">No Loan Records Found</h4>
            <p className="dash-empty-text">
              You haven't submitted any loan requests yet. When you apply, your active and historical applications will appear here.
            </p>
            <Link to="/dashboard/request" className="btn btn-primary fw-semibold px-4 py-2">
              Apply For a Loan
            </Link>
          </div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Product & Purpose</th>
                  <th>Duration</th>
                  <th>Principal</th>
                  <th>Total Repay</th>
                  <th>Status</th>
                  <th className="text-end">Details</th>
                </tr>
              </thead>
              <tbody>
                {safeLoans.map((loan, index) => (
                  <tr
                    key={index}
                    onClick={() => handleOpenModal(loan)}
                    className="clickable"
                  >
                    <td>
                      <span className="badge bg-light text-secondary border font-monospace">
                        #LN-{1000 + index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{loan.reason || "Personal Loan"}</div>
                      <div className="text-muted small">{loan.type || "Installment Credit"}</div>
                    </td>
                    <td>{loan.duration || 12} Months</td>
                    <td>
                      <strong className="text-dark">
                        <CurrencyDisplay amount={loan.amount} />
                      </strong>
                    </td>
                    <td>
                      <span className="text-primary fw-semibold">
                        <CurrencyDisplay amount={loan.repay || loan.amount} />
                      </span>
                    </td>
                    <td>
                      {loan.status ? (
                        <span className="dash-badge approved">
                          <FontAwesomeIcon icon={faCheckCircle} /> Approved
                        </span>
                      ) : (
                        <span className="dash-badge pending">
                          <FontAwesomeIcon icon={faHourglassHalf} /> In Review
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="py-1 px-3 d-inline-flex align-items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(loan);
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Structured Loan Breakdown Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-2 py-1 small">
              Application Details
            </span>
            <h4 className="fw-bold text-dark mb-1">Loan Schedule & Breakdown</h4>
            <p className="text-muted small mb-0">
              Verified underwriting terms and repayment schedule
            </p>
          </div>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          {selectedLoan && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-sm-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Principal Amount</span>
                    <h5 className="fw-bold text-dark mb-0">
                      <CurrencyDisplay amount={selectedLoan.amount} />
                    </h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Total Repayment</span>
                    <h5 className="fw-bold text-primary mb-0">
                      <CurrencyDisplay amount={selectedLoan.repay || selectedLoan.amount} />
                    </h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Loan Duration</span>
                    <h5 className="fw-bold text-dark mb-0">
                      {selectedLoan.duration || 12} Months
                    </h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Underwriting Status</span>
                    <span
                      className={`dash-badge ${
                        selectedLoan.status ? "approved" : "pending"
                      } mt-1`}
                    >
                      {selectedLoan.status ? "Approved" : "In Review"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-3 border bg-light mb-3">
                <h6 className="fw-bold text-dark mb-2">Loan Context</h6>
                <div className="row g-2 small">
                  <div className="col-sm-4 text-muted">Product Type:</div>
                  <div className="col-sm-8 fw-semibold text-dark">{selectedLoan.type || "Personal Installment"}</div>
                  <div className="col-sm-4 text-muted">Purpose / Reason:</div>
                  <div className="col-sm-8 fw-semibold text-dark">{selectedLoan.reason || "General Liquidity"}</div>
                </div>
              </div>

              {selectedLoan.imgURL && (
                <div className="p-3 rounded-3 border bg-white mb-2">
                  <span className="text-muted small d-block mb-2">Attached Verification Document</span>
                  <a
                    href={selectedLoan.imgURL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    <span>View Supporting Document</span>
                  </a>
                </div>
              )}

              <div className="p-3 rounded-3 bg-primary bg-opacity-10 text-primary small d-flex gap-2 align-items-center">
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>
                  Underwritten in compliance with Responsible Lending limits (200% gross monthly income).
                </span>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Summary;
