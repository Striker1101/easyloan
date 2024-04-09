import React, { useEffect, useState } from "react";
import { useReview } from "./App";
import {
  getAllUsers,
  getDocument,
  updateRegionStatus,
} from "../Firebase/Functions"; // Assuming you have a function to update user loan status
import { Form, Button, Spinner, Modal } from "react-bootstrap";

function Admin() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: " Admin Panel ",
      body: "You Can Approve loans on this Page",
    }));
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedUserLoan, setSelectedUserLoan] = useState([]);
  const [selectedUserWithdraw, setSelectedUserWithdraw] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loanStatus, setLoanStatus] = useState(false);
  const [modalUser, setModalUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = async (user) => {
    setModalShow(true);
    try {
      const loans = await getDocument("loan", user.id, false);
      setModalUser(user.id);
      setSelectedUserLoan(loans);
    } catch (error) {}

    try {
      const withdraw = await getDocument("withdraw", user.id, false);
      setModalUser(user.id);
      setSelectedUserWithdraw(withdraw);
    } catch (error) {}
  };

  const handleLoanStatusChange = (e) => {
    setLoanStatus(e.target.checked);
  };
  /**
   *
   * @param {take in index of the loans array o} index
   */
  const handleSubmit = async (index) => {
    try {
      const loan = selectedUserLoan.datas.region[index];
      loan.status = loanStatus;

      const update = await updateRegionStatus(
        "loan",
        modalUser,
        index,
        loanStatus
      );

      alert(update.message);
    } catch (error) {
      alert("Error updating user loan status:", error);
    }
  };
  async function handleWithdaw(e, index) {
    try {
      const status = e.currentTarget.checked;
      const update = await updateRegionStatus(
        "withdraw",
        modalUser,
        index,
        status
      );
      alert(update.message);
    } catch (error) {
      alert("Error updating user loan status:", error);
    }
  }
  return (
    <>
      <div>
        {users.map((user) => {
          return (
            <div
              className="card"
              key={user.id}
              onClick={() => handleCardClick(user)}
            >
              <h4>{user.email}</h4>
              <h6>{user.fullName}</h6>
            </div>
          );
        })}
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <>
          <Modal.Header closeButton>
            <Modal.Title>Edit Loan Status </Modal.Title>
          </Modal.Header>

          {selectedUserLoan.status ? (
            selectedUserLoan.datas.region.map((loan, index) => {
              return (
                <div key={index}>
                  <Modal.Body>
                    <Form style={{ display: "flex", gap: "10px" }}>
                      <div>
                        <a
                          href={loan.imgURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={loan.imgURL}
                            alt="loan"
                            width={100}
                            height={100}
                            style={{ borderRadius: "50px" }}
                          />
                        </a>
                        <Form.Group controlId="loanStatusCheckbox">
                          <Form.Check
                            type="checkbox"
                            label="Loan Status"
                            defaultChecked={loan.status}
                            onChange={(e) => {
                              handleLoanStatusChange(e);
                            }}
                          />
                        </Form.Group>
                      </div>

                      <div>
                        <label htmlFor="reason">
                          <h5>
                            <em>{loan.reason}</em>: <span>{loan.amount}</span>
                          </h5>
                        </label>
                        <br />
                        <label htmlFor="repay">
                          <h5>
                            {" "}
                            <em>Repay:</em> <span>{loan.repay}</span>{" "}
                            <em>for</em> <span>{loan.duration}</span>
                            <em> Months</em>
                          </h5>
                        </label>
                      </div>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleSubmit(index);
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </div>
              );
            })
          ) : (
            <div style={{ padding: "10px" }}>
              <h3>This user has no requested loan</h3>
              <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
              </Button>
            </div>
          )}
        </>

        <>
          <Modal.Header>
            <Modal.Title>Edit Withdraw Status </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table class="table  table-hover table-dark  table-striped">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedUserWithdraw.status ? (
                  selectedUserWithdraw.datas.region.map((withdraw, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{withdraw.bankName}</td>
                        <td>{withdraw.accName}</td>
                        <td>{withdraw.accNum}</td>
                        <td>{withdraw.paymentMethod}</td>
                        <td>{withdraw.amount}</td>
                        <td>
                          <input
                            type="checkbox"
                            name="toggle"
                            id="toggle"
                            defaultChecked={withdraw.status}
                            onClick={(e) => {
                              handleWithdaw(e, index);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div style={{ padding: "10px" }}>
                    <h3>This user has no requested withdraw</h3>
                    <Button
                      variant="secondary"
                      onClick={() => setModalShow(false)}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </tbody>
            </table>
          </Modal.Body>
        </>
      </Modal>
    </>
  );
}

export default Admin;
