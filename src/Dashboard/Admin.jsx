import React, { useEffect, useState } from "react";
import { useReview } from "./App";
import {
  getAllUsers,
  getDocument,
  updateRegionStatus,
} from "../Firebase/Functions"; // Assuming you have a function to update user loan status
import { Form, Button, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";

function Admin() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Admin Panel",
      body: "You Can Approve loans on this Page",
    }));
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedUserLoan, setSelectedUserLoan] = useState([]);
  const [selectedUserWithdraw, setSelectedUserWithdraw] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loanStatus, setLoanStatus] = useState(false);
  const [modalUser, setModalUser] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const offset = currentPage * usersPerPage;

  const [pagedUsers, setPagedUsers] = useState([]);

  useEffect(() => {
    setPagedUsers(users.slice(offset, offset + usersPerPage));
  }, [currentPage, users]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setPagedUsers(filtered.slice(offset, offset + usersPerPage));
  };

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

  /**
   *
   * @param {take in index of the loans array o} index
   */
  const handleSubmit = async (e, index) => {
    try {
      const status = e.currentTarget.checked;

      const update = await updateRegionStatus("loan", modalUser, index, status);

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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <div className="user-list">
        {pagedUsers.map((user) => (
          <div
            className="card"
            key={user.id}
            onClick={() => handleCardClick(user)}
          >
            <h4>{user.email}</h4>
            <h6>{user.fullName}</h6>
          </div>
        ))}
      </div>

      <ReactPaginate
        pageCount={Math.ceil(users.length / usersPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="Previous"
        nextLabel="Next"
      />

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <>
          <Modal.Header closeButton>
            <Modal.Title>Edit Loan Status</Modal.Title>
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
                            onClick={(e) => {
                              handleSubmit(e, index);
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
                            <em>Repay:</em> <span>{loan.repay}</span>{" "}
                            <em>for</em> <span>{loan.duration}</span>
                            <em> Months</em>
                          </h5>
                        </label>
                      </div>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
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
            <Modal.Title>Edit Withdraw Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table table-hover table-dark table-striped">
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
                {selectedUserWithdraw.status &&
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
                  })}
              </tbody>
            </table>
          </Modal.Body>
        </>
      </Modal>
    </>
  );
}

export default Admin;
