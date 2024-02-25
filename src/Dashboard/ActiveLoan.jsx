import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/DashboardPages/Loader";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const ActiveLoan = ({ loan }) => {
  console.log(loan);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  return (
    <>
      {loan ? (
        <div>
          {loan.length < 1 ? (
            <>
              <img src="/nothing.svg" className="nothing" alt="" />
              <Link
                to={"/dashboard/request"}
                className="m-3 p-2 d-flex justify-content-center align-align-items-center  w-100 "
              >
                <Button>Request a new Loan</Button>
              </Link>
            </>
          ) : (
            <>
              <div className="dashboardInfo w-100 text-center">
                Approved Loans
              </div>
              <Table hover bordered striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {loan.map((loan, index) => (
                    <tr key={index} onClick={() => handleOpenModal(loan)}>
                      <td className="text-truncate">
                        {" "}
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          style={{ color: "green" }}
                        />
                      </td>
                      <td className="text-truncate">{loan.reason}</td>
                      <td className="text-truncate text-success">
                        {loan.duration}
                      </td>
                      <td className="text-truncate text-success">
                        {loan.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Link to={"/dashboard/request"} className="m-3 p-2 ">
                <Button>Request a new Loan</Button>
              </Link>
            </>
          )}

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Loan Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedLoan && (
                <div>
                  <p>Type: {selectedLoan.type}</p>
                  <p>Amount: {selectedLoan.amount}</p>
                  <p>Duration: {selectedLoan.duration}</p>
                  <p>Repay: {selectedLoan.repay}</p>
                  <p>Reason: {selectedLoan.reason}</p>
                </div>
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

export default ActiveLoan;
