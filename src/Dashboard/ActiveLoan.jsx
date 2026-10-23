import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faEye,
  faCheckCircle,
  faArrowRight,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CurrencyDisplay from "../international/CurrencyDisplay";

const ActiveLoan = ({ loan }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (loanItem) => {
    setSelectedLoan(loanItem);
    setShowModal(true);
  };

  const safeLoans = Array.isArray(loan) ? loan : [];

  return (
    <div>
      <div className="dash-page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="dash-page-title">Active Disbursed Loans</h2>
          <p className="dash-page-subtitle">
            Approved credit facilities currently active and in repayment.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/dashboard/withdraw" className="btn btn-outline-primary fw-semibold px-3 py-2">
            Withdraw Available
          </Link>
          <Link to="/dashboard/request" className="btn btn-primary fw-semibold px-3 py-2">
            <span>New Request</span>
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Link>
        </div>
      </div>

      <div className="dash-card">
        {safeLoans.length === 0 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <h4 className="dash-empty-title">No Active Loans Found</h4>
            <p className="dash-empty-text">
              You do not have any actively disbursed loans at this time. When your application is approved by underwriting, it will appear here.
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
                  <th>Facility Ref</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                  <th>Approved Principal</th>
                  <th>Total Repayable</th>
                  <th>Monthly Rate</th>
                  <th>Status</th>
                  <th className="text-end">Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {safeLoans.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => handleOpenModal(item)}
                    className="clickable"
                  >
                    <td>
                      <span className="badge bg-light text-secondary border font-monospace">
                        #FAC-{2000 + index + 1}
                      </span>
                    </td>
                    <td>
                      <div className="fw-semibold text-dark">{item.reason || "Personal Loan"}</div>
                      <div className="text-muted small">{item.type || "Installment Credit"}</div>
                    </td>
                    <td>{item.duration || 12} Months</td>
                    <td>
                      <strong className="text-success">
                        <CurrencyDisplay amount={item.amount} />
                      </strong>
                    </td>
                    <td>
                      <span className="text-primary fw-semibold">
                        <CurrencyDisplay amount={item.repay || item.amount} />
                      </span>
                    </td>
                    <td>
                      <span className="small text-muted">0.5% / mo</span>
                    </td>
                    <td>
                      <span className="dash-badge approved">
                        <FontAwesomeIcon icon={faCheckCircle} /> Active
                      </span>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="py-1 px-3 d-inline-flex align-items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(item);
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <div>
            <span className="badge bg-success bg-opacity-10 text-success mb-2 px-2 py-1 small">
              Active Facility
            </span>
            <h4 className="fw-bold text-dark mb-1">Active Loan Schedule</h4>
            <p className="text-muted small mb-0">Disbursement & repayment schedule</p>
          </div>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          {selectedLoan && (
            <div>
              <div className="row g-3 mb-4">
                <div className="col-sm-6 col-md-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Approved Principal</span>
                    <h5 className="fw-bold text-success mb-0">
                      <CurrencyDisplay amount={selectedLoan.amount} />
                    </h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Total Due</span>
                    <h5 className="fw-bold text-primary mb-0">
                      <CurrencyDisplay amount={selectedLoan.repay || selectedLoan.amount} />
                    </h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="p-3 bg-light rounded-3 border">
                    <span className="text-muted small d-block mb-1">Tenure</span>
                    <h5 className="fw-bold text-dark mb-0">
                      {selectedLoan.duration || 12} Months
                    </h5>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-3 border bg-light mb-3">
                <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarCheck} className="text-primary" />
                  <span>Repayment Terms</span>
                </h6>
                <div className="row g-2 small">
                  <div className="col-sm-4 text-muted">Product Class:</div>
                  <div className="col-sm-8 fw-semibold text-dark">{selectedLoan.type || "Installment Credit"}</div>
                  <div className="col-sm-4 text-muted">Purpose:</div>
                  <div className="col-sm-8 fw-semibold text-dark">{selectedLoan.reason || "Liquidity"}</div>
                  <div className="col-sm-4 text-muted">Disbursement Status:</div>
                  <div className="col-sm-8 fw-semibold text-success">Funded & Active</div>
                </div>
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

export default ActiveLoan;
