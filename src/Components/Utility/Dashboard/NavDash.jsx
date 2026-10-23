import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faFolderOpen,
  faCircleCheck,
  faPaperclip,
  faMoneyBillTransfer,
  faUserGear,
  faSignOut,
  faShieldHalved,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../Firebase/Functions";

const NavDash = ({ user, id }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavItemClick = () => {
    setExpanded(false);
  };

  const handleLogout = async () => {
    handleNavItemClick();
    if (logout) {
      await logout();
    }
    navigate("/signin");
  };

  const appName = process.env.REACT_APP_NAME || "Loan Swift";
  const userEmail = user?.user?.email || "";
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  const currentPath = location.pathname;

  return (
    <Navbar
      className="dash-navbar px-3 py-2 navbar-dark"
      expand="lg"
      expanded={expanded}
      onToggle={(isOpen) => setExpanded(isOpen)}
    >
      <Container fluid className="px-md-3">
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center gap-2">
          <img
            src="/loanlogo.jpg"
            alt="logo"
            width={34}
            height={34}
            className="rounded-circle shadow-sm"
          />
          <span className="fs-5 fw-bold text-white mb-0">{appName}</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="dashboard-navbar-nav"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="mx-auto align-items-lg-center gap-1 py-2 py-lg-0">
            {/* Overview */}
            <Link
              to="/dashboard"
              className={`dash-nav-link ${currentPath === "/dashboard" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faChartPie} />
              <span>Overview</span>
            </Link>

            {/* Summary */}
            <Link
              to="/dashboard/summary"
              className={`dash-nav-link ${currentPath === "/dashboard/summary" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faFolderOpen} />
              <span>Summary</span>
            </Link>

            {/* Active Loans */}
            <Link
              to="/dashboard/active_loan"
              className={`dash-nav-link ${currentPath === "/dashboard/active_loan" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>Active Loans</span>
            </Link>

            {/* Request Loan */}
            <Link
              to="/dashboard/request"
              className={`dash-nav-link ${currentPath === "/dashboard/request" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>Apply</span>
            </Link>

            {/* Withdraw */}
            <Link
              to="/dashboard/withdraw"
              className={`dash-nav-link ${currentPath === "/dashboard/withdraw" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faMoneyBillTransfer} />
              <span>Withdraw</span>
            </Link>

            {/* Attachment */}
            <Link
              to="/dashboard/attachment"
              className={`dash-nav-link ${currentPath === "/dashboard/attachment" ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faPaperclip} />
              <span>Documents</span>
            </Link>

            {/* Profile Hub */}
            <Link
              to="/dashboard/profile"
              className={`dash-nav-link ${currentPath.startsWith("/dashboard/profile") ? "active" : ""}`}
              onClick={handleNavItemClick}
            >
              <FontAwesomeIcon icon={faUserGear} />
              <span>Profile</span>
            </Link>

            {/* Admin (conditional) */}
            {id === "lh9iZrbgrAPDmB2m4NnERikFbsq1" && (
              <Link
                to="/dashboard/admin"
                className={`dash-nav-link text-warning ${currentPath.startsWith("/dashboard/admin") ? "active" : ""}`}
                onClick={handleNavItemClick}
              >
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Admin</span>
              </Link>
            )}
          </Nav>

          {/* User Profile Pill & Logout */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            {userEmail && (
              <div className="dash-user-pill d-none d-sm-flex align-items-center gap-2">
                <div className="dash-avatar-circle">{initial}</div>
                <span className="text-truncate" style={{ maxWidth: "160px" }}>
                  {userEmail}
                </span>
              </div>
            )}

            <button
              type="button"
              className="btn btn-outline-danger btn-sm px-3 py-1 d-flex align-items-center gap-2 fw-semibold"
              onClick={handleLogout}
              title="Sign Out"
            >
              <FontAwesomeIcon icon={faSignOut} />
              <span>Logout</span>
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavDash;
