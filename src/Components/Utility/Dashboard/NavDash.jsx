import { faClock, faFolder, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBatteryCar,
  faRefresh,
  faSignOut,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../../Firebase/Functions";
const NavDash = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavItemClick = () => {
    setExpanded(false); // Close the Navbar menu when a Nav.Link is clicked
  };

  const refresh = () => {
    // Implement your refresh logic here
  };

  return (
    <Navbar
      className="position-relative"
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
    >
      <Navbar.Brand href="/" className="d-flex align-items-center ">
        <img
          src="/loanlogo.jpg"
          alt="logo"
          style={{ width: "50px", paddding: "5px", margin: "3px" }}
        />
        <h2>{process.env.REACT_APP_NAME}</h2>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(expanded ? false : true)}
        className="m-2"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faUser} />
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <Link
                to="/dashboard/profile/personal_info"
                className="dropdown-item"
                onClick={handleNavItemClick}
              >
                Personal Information
              </Link>
              <Link
                to="/dashboard/profile/work_info"
                className="dropdown-item"
                onClick={handleNavItemClick}
              >
                Work Information
              </Link>
              <Link
                to="/dashboard/profile/education_info"
                className="dropdown-item"
                onClick={handleNavItemClick}
              >
                Education Information
              </Link>
              <Link
                to="/dashboard/profile/next_kin"
                className="dropdown-item"
                onClick={handleNavItemClick}
              >
                Next of Kin
              </Link>
              <Link
                to="/dashboard/profile/expenses"
                className="dropdown-item"
                onClick={handleNavItemClick}
              >
                Expenses
              </Link>
            </NavDropdown>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faClock} />
            <Link
              to="/dashboard/summary"
              className="nav-link"
              onClick={handleNavItemClick}
            >
              Summary
            </Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faTimes} />
            <Link
              to="/dashboard/terminate"
              className="nav-link"
              onClick={handleNavItemClick}
            >
              Terminate
            </Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faFolder} />
            <Link
              to="/dashboard/active_loan"
              className="nav-link"
              onClick={handleNavItemClick}
            >
              Active Loans
            </Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faBatteryCar} />
            <Link
              to="/dashboard/attachment"
              className="nav-link"
              onClick={handleNavItemClick}
            >
              Attachment
            </Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "green" }} icon={faRefresh} />
            <Link
              to="#"
              onClick={refresh}
              className="nav-link"
              onClick={handleNavItemClick}
            >
              Refresh
            </Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "red" }} icon={faSignOut} />
            <Link
              to="#"
              className="nav-link"
              onClick={() => {
                handleNavItemClick();
                logout();
              }}
            >
              LogOut
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavDash;
