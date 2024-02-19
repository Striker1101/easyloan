import { faClock, faFolder, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBatteryCar,
  faRefresh,
  faSignOut,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavDash = () => {
  function logout() {
    console.log("out");
  }
  return (
    <Navbar className="position-relative " bg="light" expand={false}>
      <Navbar.Brand href="/">
        {/* Replace 'Your Logo' with your logo image */}
        <img
          src="your-logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        {process.env.REACT_APP_NAME}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-2" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faUser} />
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/dashboard/personal_info">
                Personal Information
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/address">
                Address
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/work_info">
                Work Information
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/education_info">
                Education Information
              </NavDropdown.Item>

              <NavDropdown.Item href="/dashboard/next_kin">
                Next of Kin
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/expenses">
                Expenses
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faClock} />
            <Nav.Link href="/dashboard/summary">Summary</Nav.Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faTimes} />
            <Nav.Link href="/dashboard/terminate">Terminate</Nav.Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faFolder} />
            <Nav.Link href="/dashboard/active_loan">Active Loans</Nav.Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faBatteryCar} />
            <Nav.Link href="/dashboard/attachment">Attachment</Nav.Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faRefresh} />
            <Nav.Link href="/dashboard/refresh">Refresh</Nav.Link>
          </div>

          <div className="d-flex gap-3 align-items-center m-1">
            <FontAwesomeIcon style={{ color: "blue" }} icon={faSignOut} />
            <Nav.Link href="#" onClick={logout}>
              LogOut
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavDash;
