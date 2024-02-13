import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import ApplyModal from "./ApplyModal";
import "./style.css";
// Contains the value and text for the options
const languages = [
  { value: "en", text: "Options" },
  { value: "en", text: "English" },
  { value: "fr", text: "French" },
  { value: "bn", text: "Bengali" },
];

function NavLanding() {
  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = process.env.REACT_APP_URL;
    console.log(loc);
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  const [navbarBackground, setNavbarBackground] = useState("transparent");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setNavbarBackground("rgba(165, 42, 42, 0.5)"); // Brown background with opacity 0.5
    } else {
      setNavbarBackground("transparent"); // Transparent background
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Add scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar
        expand="lg"
        className="navbar NavbarLanding p-3"
        style={{
          background: navbarBackground,
          position: "fixed",
          width: "100%",
          zIndex: "100",
          fontWeight: "500",
          color: "white",
        }}
      >
        <Container>
          <Navbar.Brand href="/" className="mr-auto text-light">
            {process.env.REACT_APP_NAME}
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav "
            className="text-bg-light"
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link className="text-light" href="/how">
                {t("how_it_works")}
              </Nav.Link>
              <Nav.Link
                className="text-light text-bg-primary"
                href="#"
                onClick={handleShowModal}
                type="button"
              >
                {t("apply")}
              </Nav.Link>
              <Nav.Link className="text-light" href="/faq">
                {t("faq")}
              </Nav.Link>
              <label>
                {t("choose")}
                <Form.Select
                  aria-label="choose perferred languague"
                  value={lang}
                  onChange={handleChange}
                >
                  {languages.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>
                        {item.text}
                      </option>
                    );
                  })}
                </Form.Select>
              </label>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ApplyModal show={showModal} handleClose={handleCloseModal} />
    </>
  );
}

export default NavLanding;
