import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/DashboardPages/Loader";
import { Table } from "react-bootstrap";
const Summary = ({ summary }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (summary) => {
    setSelectedLoan(summary);
    setShowModal(true);
  };

  return (
    <>
      {summary ? (
        <div>
          {summary.length < 1 ? (
            <>
              <img src="/nothing.svg" className="nothing" alt="" />
              <strong className="note">Nothing Here</strong>
            </>
          ) : (
            <>
              <div className="dashboardInfo w-100 text-center">
                All Requested
              </div>
              <Table hover bordered striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Reason</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((loan, index) => (
                    <tr key={index} onClick={() => handleOpenModal(loan)}>
                      <td className="text-truncate">
                        {" "}
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ color: "green" }}
                        />
                      </td>
                      <td className="text-truncate">{loan.reason}</td>
                      <td className="text-truncate">
                        <strong className="text-success">{loan.amount}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Loan Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedLoan && (
                <a href={selectedLoan.imgURL} target="_blank" rel="noreferrer">
                  <p>Type: {selectedLoan.type}</p>
                  <p>Amount: {selectedLoan.amount}</p>
                  <p>Duration: {selectedLoan.duration}</p>
                  <p>Repay: {selectedLoan.repay}</p>
                  <p>Reason: {selectedLoan.reason}</p>
                  <p>Status:{selectedLoan.status ? " completed" : "pending"}</p>
                </a>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Summary;
