import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import ApplyModal from "./ApplyModal";
import "./style.css";
// Contains the value and text for the options
const languages = [
  { value: "en", text: "English" },
  { value: "fr", text: "French" },
];

function NavLanding({ color }) {
  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = process.env.REACT_APP_URL;
    window.location.replace(loc + "?lng=" + e.target.value);
  };

  const [navbarBackground, setNavbarBackground] = useState("transparent");

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setNavbarBackground("rgb(28, 35, 49, 0.5)"); // Brown background with opacity 0.5
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

  function togglePadding() {
    const homepageCalculator = document.querySelector(".homepageCalculator");

    if (homepageCalculator) {
      homepageCalculator.classList.toggle("expandedPadding");
    }

    const howHolder = document.querySelector(".howHolder");

    if (howHolder) {
      howHolder.classList.toggle("expandedPadding");
    }

    const customer_support_page = document.querySelector(
      ".customer-support-page"
    );

    if (customer_support_page) {
      customer_support_page.classList.toggle("expandedPadding");
    }

    const FAQHolder = document.querySelector(".FAQHolder");

    if (FAQHolder) {
      FAQHolder.classList.toggle("expandedPadding");
    }

    const LoginInMenu = document.querySelector(".LoginInMenu");

    if (LoginInMenu) {
      LoginInMenu.classList.toggle("LoginInMenu");
    }

    const FirebaseLoginInMenu = document.querySelector(".FirebaseLoginInMenu");

    if (FirebaseLoginInMenu) {
      FirebaseLoginInMenu.classList.toggle("FirebaseLoginInMenu");
    }

    const PaddingSpace = document.querySelector(".PaddingSpace");

    if (PaddingSpace) {
      PaddingSpace.classList.toggle("PaddingSpace");
    }
  }

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
          color: color ? "white" : "black",
        }}
      >
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center gap-3">
            <img src="./loanlogo.jpg" alt="logo" width={50} />
            <p
              className={color ? "text-light mr-auto" : " mr-auto text-black "}
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {process.env.REACT_APP_NAME}
            </p>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav "
            className="text-bg-light menuButton"
            onClick={togglePadding}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end "
          >
            <Nav>
              <Nav.Link
                className={color ? "text-light " : "text-black"}
                href="/how"
              >
                {t("how_it_works")}
              </Nav.Link>
              <Nav.Link
                className={
                  color
                    ? "text-light text-bg-primary"
                    : "text-dark text-bg-primary"
                }
                href="#"
                onClick={handleShowModal}
                type="button"
              >
                {t("apply")}
              </Nav.Link>
              <Nav.Link
                className={color ? "text-light " : "text-black"}
                href="/faq"
              >
                {t("faq")}
              </Nav.Link>
              <label>
                {t("choose")}
                <Form.Select
                  aria-label="choose perferred languague"
                  value={lang}
                  onChange={handleChange}
                  // className={color ? "text-light " : "text-black"}
                >
                  {languages.map((item, index) => {
                    return (
                      <option
                        key={index}
                        // className={color ? "text-light " : "text-black"}
                        value={item.value}
                      >
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
