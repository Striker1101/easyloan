import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/DashboardPages/Loader";
import { Table } from "react-bootstrap";
import { deleteRegion } from "../Firebase/Functions";
import { useReview } from "./App";
const Terminate = ({ terminate }) => {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Terminate Loan Contact",
      body: "Requested Loans can be terminate here",
    }));
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [mapIndex, setMapIndex] = useState(0);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (terminate) => {
    setSelectedLoan(terminate);
    setShowModal(true);
  };

  const handleDelete = () => {
    const ask = prompt(
      "Are you sure you want to Delete this Reqest, Type Yes to confirm, refresh browser to see changes "
    );
    if (ask === "YES") {
      deleteRegion(selectedLoan);
    }
  };

  return (
    <>
      {terminate ? (
        <div>
          {terminate.length < 1 ? (
            <>
              <img src="/nothing.svg" className="nothing" alt="" />
              <strong className="note">Nothing Here</strong>
            </>
          ) : (
            <>
              <div className="dashboardInfo w-100 text-center">
                Are you Sure you want to Delete ?
              </div>
              <Table hover bordered striped>
                <thead>
                  <tr>
                    <th>Delete</th>
                    <th>Type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {terminate.map((loan, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        handleOpenModal(loan);
                        setMapIndex(index);
                      }}
                    >
                      <td className="text-truncate">
                        {" "}
                        <FontAwesomeIcon
                          icon={faDeleteLeft}
                          style={{ color: "red" }}
                        />
                      </td>
                      <td className="text-truncate">{loan.type}</td>
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
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
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

export default Terminate;
