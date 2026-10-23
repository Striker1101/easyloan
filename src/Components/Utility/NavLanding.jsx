import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import ApplyModal from "./ApplyModal";
import "./style.css";

const languages = [
  { value: "en", text: "English" },
  { value: "fr", text: "Français" },
];

function NavLanding({ color }) {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const handleShowModal = () => {
    setShowModal(true);
    setExpanded(false);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleLangChange = (e) => {
    const selected = e.target.value;
    setLang(selected);
    if (i18n.changeLanguage) {
      i18n.changeLanguage(selected);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLightText = color && !isScrolled && !expanded;
  const appName = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={(isOpen) => setExpanded(isOpen)}
        className={`main-navbar fixed-top transition-all ${
          isScrolled || expanded || !color ? "navbar-solid" : "navbar-transparent"
        }`}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => setExpanded(false)}
            className="d-flex align-items-center gap-2"
          >
            <img
              src="/loanlogo.jpg"
              alt="Loan Swift Logo"
              width={38}
              height={38}
              className="rounded-circle shadow-sm"
            />
            <span
              className={`brand-title fw-bold fs-4 ${
                isLightText ? "text-white" : "text-dark"
              }`}
            >
              {appName}
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="landing-navbar-nav"
            className={`border-0 ${isLightText ? "navbar-dark" : "navbar-light"}`}
          />

          <Navbar.Collapse id="landing-navbar-nav">
            <Nav className="ms-auto align-items-lg-center gap-lg-3 py-2 py-lg-0">
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => setExpanded(false)}
                className={`nav-link-custom ${location.pathname === "/" ? "active" : ""} ${
                  isLightText ? "text-white" : "text-dark"
                }`}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/how"
                onClick={() => setExpanded(false)}
                className={`nav-link-custom ${location.pathname === "/how" ? "active" : ""} ${
                  isLightText ? "text-white" : "text-dark"
                }`}
              >
                {t("how_it_works") || "How It Works"}
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/faq"
                onClick={() => setExpanded(false)}
                className={`nav-link-custom ${location.pathname === "/faq" ? "active" : ""} ${
                  isLightText ? "text-white" : "text-dark"
                }`}
              >
                {t("faq") || "FAQ"}
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/signin"
                onClick={() => setExpanded(false)}
                className={`nav-link-custom ${location.pathname === "/signin" ? "active" : ""} ${
                  isLightText ? "text-white" : "text-dark"
                }`}
              >
                Sign In
              </Nav.Link>

              {/* Language Selector */}
              <div className="d-flex align-items-center my-2 my-lg-0">
                <Form.Select
                  size="sm"
                  aria-label="Choose language"
                  value={lang}
                  onChange={handleLangChange}
                  className="lang-select"
                >
                  {languages.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Apply CTA Button */}
              <Button
                variant="primary"
                onClick={handleShowModal}
                className="btn-apply-nav px-3 py-2 fw-semibold"
              >
                {t("apply") || "Apply Now"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ApplyModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
}

export default NavLanding;
