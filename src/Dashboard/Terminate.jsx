import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faTriangleExclamation,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { deleteRegion } from "../Firebase/Functions";
import CurrencyDisplay from "../international/CurrencyDisplay";

const Terminate = ({ terminate }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteMsg(null);
  };

  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setDeleteMsg(null);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedLoan) return;
    setIsDeleting(true);
    setDeleteMsg(null);
    try {
      const res = await deleteRegion(selectedLoan);
      if (res && res.status) {
        setShowModal(false);
      } else {
        setDeleteMsg(res.message || "Failed to cancel application.");
      }
    } catch (err) {
      console.error("Error deleting loan request:", err);
      setDeleteMsg(err.message || "Network error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };


  const safeList = Array.isArray(terminate) ? terminate : [];

  return (
    <div>
      <div className="dash-page-header">
        <h2 className="dash-page-title">Cancel Loan Request</h2>
        <p className="dash-page-subtitle">
          Cancel unapproved or in-review applications before final underwriting commitment.
        </p>
      </div>

      <div className="dash-card">
        {safeList.length < 1 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">
              <FontAwesomeIcon icon={faFolderOpen} />
            </div>
            <h4 className="dash-empty-title">No Pending Requests to Cancel</h4>
            <p className="dash-empty-text">
              You do not have any pending applications available for termination.
            </p>
          </div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Product & Classification</th>
                  <th>Duration</th>
                  <th>Requested Principal</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {safeList.map((loan, index) => (
                  <tr key={index}>
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
                      <span className="dash-badge pending">In Review</span>
                    </td>
                    <td className="text-end">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleOpenModal(loan)}
                        className="py-1 px-3 d-inline-flex align-items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                        <span>Cancel Request</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-danger d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span>Cancel Application</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          {deleteMsg && (
            <Alert variant="danger" className="py-2 small mb-3">
              {deleteMsg}
            </Alert>
          )}
          {selectedLoan && (
            <div>
              <p className="text-muted mb-3">
                Are you sure you want to cancel this application for{" "}
                <strong className="text-dark">
                  <CurrencyDisplay amount={selectedLoan.amount} />
                </strong>{" "}
                ({selectedLoan.reason || selectedLoan.type})? This action cannot be undone.
              </p>
              <div className="p-3 bg-light rounded-3 border small">
                <div><strong>Product:</strong> {selectedLoan.type}</div>
                <div><strong>Duration:</strong> {selectedLoan.duration} Months</div>
                <div><strong>Principal:</strong> <CurrencyDisplay amount={selectedLoan.amount} /></div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="secondary" onClick={handleCloseModal} disabled={isDeleting}>
            Keep Application
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Canceling..." : "Confirm Cancellation"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Terminate;
