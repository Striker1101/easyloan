import React, { useEffect, useState } from "react";
import { useReview } from "./App";
import {
  getAllUsers,
  getDocument,
  updateRegionStatus,
} from "../Firebase/Functions";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faSearch,
  faBuildingColumns,
  faFileInvoiceDollar,
  faCheckCircle,
  faHourglassHalf,
  faEye,
  faMoneyBillTransfer,
  faXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import CurrencyDisplay from "../international/CurrencyDisplay";

function Admin() {
  const { setReview } = useReview();
  useEffect(() => {
    if (setReview) {
      setReview((prev) => ({
        ...prev,
        header: "Underwriting & Admin Portal",
        body: "Manage borrower risk verification, approve loans, and clear disbursement withdrawals.",
      }));
    }
  }, [setReview]);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserLoan, setSelectedUserLoan] = useState({ status: false, datas: { region: [] } });
  const [selectedUserWithdraw, setSelectedUserWithdraw] = useState({ status: false, datas: { region: [] } });
  const [modalShow, setModalShow] = useState(false);
  const [modalTab, setModalTab] = useState("loans"); // 'loans' | 'withdrawals'
  const [searchQuery, setSearchQuery] = useState("");
  const [actionAlert, setActionAlert] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 8;
  const offset = currentPage * usersPerPage;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const allUsers = await getAllUsers();
        if (Array.isArray(allUsers)) {
          setUsers(allUsers);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const email = (u?.email || "").toLowerCase();
    const name = (u?.fullName || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    return email.includes(query) || name.includes(query);
  });

  const pagedUsers = filteredUsers.slice(offset, offset + usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleInspectUser = async (user) => {
    setSelectedUser(user);
    setModalShow(true);
    setActionAlert(null);
    setModalTab("loans");

    try {
      const loans = await getDocument("loan", user.id, false);
      setSelectedUserLoan(loans && loans.status ? loans : { status: false, datas: { region: [] } });
    } catch (error) {
      console.warn("Error fetching loans for admin:", error);
    }

    try {
      const withdraw = await getDocument("withdraw", user.id, false);
      setSelectedUserWithdraw(withdraw && withdraw.status ? withdraw : { status: false, datas: { region: [] } });
    } catch (error) {
      console.warn("Error fetching withdrawals for admin:", error);
    }
  };

  // Toggle Loan Approval Status
  const handleToggleLoanStatus = async (index, currentStatus) => {
    if (!selectedUser) return;
    setIsUpdating(true);
    const newStatus = !currentStatus;

    try {
      const update = await updateRegionStatus("loan", selectedUser.id, index, newStatus);
      if (update.status) {
        // Optimistically update local modal state
        setSelectedUserLoan((prev) => {
          const updatedRegion = [...(prev.datas?.region || [])];
          if (updatedRegion[index]) {
            updatedRegion[index] = { ...updatedRegion[index], status: newStatus };
          }
          return { ...prev, datas: { ...prev.datas, region: updatedRegion } };
        });
        setActionAlert({
          type: "success",
          message: `Loan facility #${index + 1} status updated to ${newStatus ? "Approved" : "In Review"}.`,
        });
      } else {
        setActionAlert({ type: "danger", message: update.message || "Failed to update loan status." });
      }
    } catch (error) {
      setActionAlert({ type: "danger", message: error.message || "Network error updating loan status." });
    } finally {
      setIsUpdating(false);
    }
  };

  // Toggle Withdrawal Approval Status
  const handleToggleWithdrawStatus = async (index, currentStatus) => {
    if (!selectedUser) return;
    setIsUpdating(true);
    const newStatus = !currentStatus;

    try {
      const update = await updateRegionStatus("withdraw", selectedUser.id, index, newStatus);
      if (update.status) {
        // Optimistically update local modal state
        setSelectedUserWithdraw((prev) => {
          const updatedRegion = [...(prev.datas?.region || [])];
          if (updatedRegion[index]) {
            updatedRegion[index] = { ...updatedRegion[index], status: newStatus };
          }
          return { ...prev, datas: { ...prev.datas, region: updatedRegion } };
        });
        setActionAlert({
          type: "success",
          message: `Withdrawal request #${index + 1} marked as ${newStatus ? "Disbursed" : "Pending"}.`,
        });
      } else {
        setActionAlert({ type: "danger", message: update.message || "Failed to update withdrawal status." });
      }
    } catch (error) {
      setActionAlert({ type: "danger", message: error.message || "Network error updating withdrawal." });
    } finally {
      setIsUpdating(false);
    }
  };

  const userLoansList = Array.isArray(selectedUserLoan.datas?.region) ? selectedUserLoan.datas.region : [];
  const userWithdrawList = Array.isArray(selectedUserWithdraw.datas?.region) ? selectedUserWithdraw.datas.region : [];

  return (
    <div>
      <div className="dash-page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="dash-page-title d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faUserShield} className="text-primary" />
            <span>Administrator Underwriting Portal</span>
          </h2>
          <p className="dash-page-subtitle">
            Review borrower identity files, approve credit requests, and authorize disbursement payouts.
          </p>
        </div>
        <span className="dash-badge success py-2 px-3">
          <FontAwesomeIcon icon={faCircleCheck} />
          <span>Admin Access Active</span>
        </span>
      </div>

      {/* Search & Overview Metrics */}
      <div className="dash-card">
        <div className="row g-3 align-items-center mb-3">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Search registered borrowers by email or full name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
                className="form-control border-start-0 py-2"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setSearchQuery("")}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}
            </div>
          </div>
          <div className="col-md-5 text-md-end text-muted small">
            <span>
              Showing {filteredUsers.length} registered borrower accounts
            </span>
          </div>
        </div>

        {/* User Table */}
        {loadingUsers ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted small mt-2">Loading borrower directory...</p>
          </div>
        ) : pagedUsers.length === 0 ? (
          <div className="dash-empty-state">
            <h5 className="dash-empty-title">No Borrowers Found</h5>
            <p className="dash-empty-text">No user profiles matched your current search criteria.</p>
          </div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Borrower</th>
                  <th>Contact Info</th>
                  <th>Nationality</th>
                  <th>UID Reference</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedUsers.map((user) => {
                  const initials = (user.fullName || user.email || "B")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <tr key={user.id} className="clickable" onClick={() => handleInspectUser(user)}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div className="dash-avatar-circle" style={{ width: "36px", height: "36px", fontSize: "0.85rem" }}>
                            {initials}
                          </div>
                          <div>
                            <div className="fw-bold text-dark">{user.fullName || "Unverified Profile"}</div>
                            <div className="text-muted small">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="small text-dark">{user.phone || "No phone added"}</div>
                        <div className="small text-muted">{user.gender || "—"}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border">
                          {user.nationality || "International"}
                        </span>
                      </td>
                      <td>
                        <span className="font-monospace small text-muted">
                          {user.id ? `${user.id.slice(0, 8)}...` : "—"}
                        </span>
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="py-1 px-3 d-inline-flex align-items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInspectUser(user);
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                          <span>Inspect</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > usersPerPage && (
          <div className="d-flex justify-content-center pt-3 border-top mt-3">
            <ReactPaginate
              pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName="dash-pagination"
              activeClassName="active"
              previousLabel="Previous"
              nextLabel="Next"
              disabledClassName="disabled"
            />
          </div>
        )}
      </div>

      {/* Borrower Underwriting Detail Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <div>
            <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-2 py-1 small">
              Underwriting Inspection
            </span>
            <h4 className="fw-bold text-dark mb-1">
              {selectedUser?.fullName || selectedUser?.email || "Borrower Review"}
            </h4>
            <p className="text-muted small mb-0">UID: {selectedUser?.id}</p>
          </div>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          {actionAlert && (
            <Alert
              variant={actionAlert.type}
              dismissible
              onClose={() => setActionAlert(null)}
              className="py-2 small mb-3"
            >
              {actionAlert.message}
            </Alert>
          )}

          {/* Modal Tab Switcher */}
          <div className="profile-tab-bar mb-3">
            <button
              type="button"
              className={`profile-tab-btn ${modalTab === "loans" ? "active" : ""}`}
              onClick={() => setModalTab("loans")}
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              <span>Loan Applications ({userLoansList.length})</span>
            </button>
            <button
              type="button"
              className={`profile-tab-btn ${modalTab === "withdrawals" ? "active" : ""}`}
              onClick={() => setModalTab("withdrawals")}
            >
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
              <span>Withdrawal Requests ({userWithdrawList.length})</span>
            </button>
          </div>

          {/* TAB 1: LOAN APPLICATIONS */}
          {modalTab === "loans" && (
            <div>
              {userLoansList.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-3 border">
                  <p className="text-muted mb-0 small">This borrower has not submitted any loan applications.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {userLoansList.map((loan, idx) => {
                    const isApproved = loan.status === true;
                    return (
                      <div key={idx} className="p-3 bg-light rounded-3 border">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-2">
                          <div>
                            <span className="badge bg-white text-secondary border font-monospace me-2">
                              #LN-{1000 + idx + 1}
                            </span>
                            <strong className="text-dark">{loan.reason || "Credit Application"}</strong>
                            <span className="text-muted small ms-2">({loan.type || "Installment"})</span>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <span className={`dash-badge ${isApproved ? "approved" : "pending"}`}>
                              {isApproved ? (
                                <>
                                  <FontAwesomeIcon icon={faCheckCircle} /> Approved
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon icon={faHourglassHalf} /> In Review
                                </>
                              )}
                            </span>

                            <Button
                              variant={isApproved ? "outline-warning" : "success"}
                              size="sm"
                              disabled={isUpdating}
                              onClick={() => handleToggleLoanStatus(idx, isApproved)}
                              className="fw-semibold px-3 py-1"
                            >
                              {isApproved ? "Revoke / Review" : "Approve Loan"}
                            </Button>
                          </div>
                        </div>

                        <div className="row g-2 small mt-2 pt-2 border-top">
                          <div className="col-sm-4">
                            <span className="text-muted">Requested Amount:</span>{" "}
                            <strong className="text-dark">
                              <CurrencyDisplay amount={loan.amount} />
                            </strong>
                          </div>
                          <div className="col-sm-4">
                            <span className="text-muted">Total Repayment:</span>{" "}
                            <strong className="text-primary">
                              <CurrencyDisplay amount={loan.repay || loan.amount} />
                            </strong>
                          </div>
                          <div className="col-sm-4">
                            <span className="text-muted">Duration:</span>{" "}
                            <strong className="text-dark">{loan.duration || 12} Months</strong>
                          </div>
                        </div>

                        {loan.imgURL && (
                          <div className="mt-2 pt-2 border-top d-flex align-items-center gap-2">
                            <span className="text-muted small">Supporting Document:</span>
                            <a
                              href={loan.imgURL}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-secondary py-0 px-2"
                              style={{ fontSize: "0.78rem" }}
                            >
                              View Statement
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WITHDRAWAL REQUESTS */}
          {modalTab === "withdrawals" && (
            <div>
              {userWithdrawList.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-3 border">
                  <p className="text-muted mb-0 small">No withdrawal requests filed by this borrower.</p>
                </div>
              ) : (
                <div className="dash-table-wrapper">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Destination Bank</th>
                        <th>Account Holder</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userWithdrawList.map((item, idx) => {
                        const isApproved = item.status === true;
                        return (
                          <tr key={idx}>
                            <td>
                              <div className="fw-semibold text-dark d-flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faBuildingColumns} className="text-muted small" />
                                <span>{item.bankName || "Bank Wire"}</span>
                              </div>
                              <span className="font-monospace small text-muted">{item.accNum}</span>
                            </td>
                            <td>
                              <div className="text-dark">{item.accName || "—"}</div>
                              <div className="small text-muted">{item.country || "Local"}</div>
                            </td>
                            <td className="text-capitalize small">{item.paymentMethod?.replace("_", " ")}</td>
                            <td>
                              <strong className="text-dark">
                                <CurrencyDisplay amount={item.amount} />
                              </strong>
                            </td>
                            <td>
                              <span className={`dash-badge ${isApproved ? "approved" : "pending"}`}>
                                {isApproved ? "Disbursed" : "Pending"}
                              </span>
                            </td>
                            <td className="text-end">
                              <Button
                                variant={isApproved ? "outline-warning" : "success"}
                                size="sm"
                                disabled={isUpdating}
                                onClick={() => handleToggleWithdrawStatus(idx, isApproved)}
                                className="py-1 px-3 fw-semibold"
                              >
                                {isApproved ? "Set Pending" : "Disburse"}
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Admin;
