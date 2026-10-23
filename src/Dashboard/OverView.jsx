import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faHourglassHalf,
  faCircleCheck,
  faShieldHalved,
  faArrowRight,
  faHandHoldingDollar,
  faFileCircleCheck,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import CurrencyDisplay from "../international/CurrencyDisplay";

export default function OverView({ summary = [], user }) {
  const email = user?.user?.email || "";
  const displayName =
    user?.user?.displayName || (email ? email.split("@")[0] : "Borrower");

  const safeLoans = Array.isArray(summary) ? summary : [];
  const activeLoans = safeLoans.filter((item) => item?.status === true);
  const pendingLoans = safeLoans.filter((item) => !item?.status);

  const totalActiveBorrowed = activeLoans.reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const totalPendingAmount = pendingLoans.reduce(
    (sum, item) => sum + (Number(item?.amount) || 0),
    0
  );

  const totalRepayable = activeLoans.reduce(
    (sum, item) => sum + (Number(item?.repay) || Number(item?.amount) || 0),
    0
  );

  const availableCredit = Math.max(50000 - totalActiveBorrowed, 0);

  return (
    <div>
      {/* Header Greeting & Verification Pill */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-4">
        <div>
          <h2 className="dash-page-title">
            Welcome back, <span className="text-primary text-capitalize">{displayName}</span> 👋
          </h2>
          <p className="dash-page-subtitle">
            Here is your real-time financial and loan account overview.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="dash-badge success py-2 px-3">
            <FontAwesomeIcon icon={faShieldHalved} />
            <span>Verified Borrower Account</span>
          </span>
        </div>
      </div>

      {/* KPI Stat Quad-Grid */}
      <div className="dash-stat-grid">
        {/* Card 1: Active Loan Balance */}
        <div className="dash-stat-card">
          <div className="dash-stat-icon emerald">
            <FontAwesomeIcon icon={faWallet} />
          </div>
          <div className="dash-stat-label">Active Borrowed Balance</div>
          <div className="dash-stat-value text-success">
            <CurrencyDisplay amount={totalActiveBorrowed} />
          </div>
          <div className="dash-stat-hint">
            <span>{activeLoans.length} active loan disbursement{activeLoans.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Card 2: Applications In-Review */}
        <div className="dash-stat-card">
          <div className="dash-stat-icon amber">
            <FontAwesomeIcon icon={faHourglassHalf} />
          </div>
          <div className="dash-stat-label">Applications In Review</div>
          <div className="dash-stat-value text-warning">
            <CurrencyDisplay amount={totalPendingAmount} />
          </div>
          <div className="dash-stat-hint">
            <span>{pendingLoans.length} pending underwriting review</span>
          </div>
        </div>

        {/* Card 3: Total Repayment Obligation */}
        <div className="dash-stat-card">
          <div className="dash-stat-icon blue">
            <FontAwesomeIcon icon={faHandHoldingDollar} />
          </div>
          <div className="dash-stat-label">Scheduled Repayments</div>
          <div className="dash-stat-value text-primary">
            <CurrencyDisplay amount={totalRepayable} />
          </div>
          <div className="dash-stat-hint">
            <span>Principal plus statutory interest</span>
          </div>
        </div>

        {/* Card 4: Available Credit Line */}
        <div className="dash-stat-card">
          <div className="dash-stat-icon purple">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div className="dash-stat-label">Available Credit Limit</div>
          <div className="dash-stat-value text-dark">
            <CurrencyDisplay amount={availableCredit} />
          </div>
          <div className="dash-stat-hint">
            <span>Tier-1 max limit: <CurrencyDisplay amount={50000} /></span>
          </div>
        </div>
      </div>

      {/* Quick Action Promotional Banner */}
      <div className="dash-action-banner">
        <div>
          <h3>Fast, Transparent Credit In Minutes</h3>
          <p>
            Eligible borrowers can request additional funds up to 200% of verifiable monthly income with same-day settlement.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Link to="/dashboard/request" className="btn btn-light fw-bold px-4 py-2 text-primary shadow-sm">
            <span>Request New Loan</span>
            <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Link>
          <Link to="/dashboard/withdraw" className="btn btn-outline-light fw-semibold px-3 py-2">
            Withdraw Funds
          </Link>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h3 className="dash-card-title d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faFolderOpen} className="text-primary" />
            <span>Recent Loan Requests</span>
          </h3>
          {safeLoans.length > 0 && (
            <Link to="/dashboard/summary" className="small fw-semibold text-primary text-decoration-none">
              View All ({safeLoans.length}) <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          )}
        </div>

        {safeLoans.length === 0 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">
              <FontAwesomeIcon icon={faFileCircleCheck} />
            </div>
            <h4 className="dash-empty-title">No Active Loan Applications</h4>
            <p className="dash-empty-text">
              You haven't submitted any loan requests yet. Calculate your repayment and get approved in under 5 minutes.
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
                  <th>Product & Purpose</th>
                  <th>Duration</th>
                  <th>Principal</th>
                  <th>Repayment</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {safeLoans.slice(0, 5).map((loan, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="fw-semibold text-dark">{loan.reason || "Personal Loan"}</div>
                      <div className="text-muted small">{loan.type || "Installment Loan"}</div>
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
                        <span className="dash-badge approved">Approved</span>
                      ) : (
                        <span className="dash-badge pending">In Review</span>
                      )}
                    </td>
                    <td className="text-end">
                      <Link
                        to="/dashboard/summary"
                        className="btn btn-sm btn-outline-secondary py-1 px-3"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
