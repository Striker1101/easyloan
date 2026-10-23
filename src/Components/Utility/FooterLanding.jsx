import React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import getCountry, {
  getState,
  getCompany,
} from "../../international/GetCountry";

export default function FooterLanding() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const appName = process.env.REACT_APP_NAME || "Loan Swift";
  const appEmail = process.env.REACT_APP_MAIL || "support@loanswift.com";
  const appPhone = process.env.REACT_APP_NUM || "+1 234 567 8964";

  return (
    <footer className="footerLanding">
      <Container>
        <Row className="g-4 mb-4">
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/loanlogo.jpg"
                alt="Logo"
                width={36}
                height={36}
                className="rounded-circle"
              />
              <h3 className="fs-4 fw-bold mb-0 text-white">{appName}</h3>
            </div>
            <p className="text-muted small pe-lg-3">
              Owned and managed by {getCompany()}. A registered credit provider incorporated under the laws of {getCountry()} and operating under license granted by {getState()} state authorities.
            </p>
          </Col>

          <Col lg={3} md={6}>
            <h4 className="fs-6 fw-bold text-uppercase text-white mb-3 tracking-wide">
              Quick Links
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/how">{t("how_it_works") || "How It Works"}</Link>
              </li>
              <li>
                <Link to="/faq">{t("faq") || "FAQ"}</Link>
              </li>
              <li>
                <Link to="/customer_care">Customer Support</Link>
              </li>
              <li>
                <Link to="/policy">{t("Footer:policy") || "Privacy & Terms"}</Link>
              </li>
            </ul>
          </Col>

          <Col lg={5} md={12}>
            <h4 className="fs-6 fw-bold text-uppercase text-white mb-3 tracking-wide">
              Contact & Support
            </h4>
            <div className="d-flex flex-column gap-2 small mb-3">
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                <a href={`mailto:${appEmail}`}>{appEmail}</a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-primary" />
                <a href={`tel:${appPhone}`}>{appPhone}</a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
                <span>{t("Footer:address") || "Headquarters Financial District"}</span>
              </div>
            </div>

            <div className="foooterLandingLinks mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary border-opacity-25 my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 text-muted small">
          <div>
            © {currentYear} {appName}™. All Rights Reserved | A {getCompany()} Enterprise.
          </div>
          <div>
            <Link to="/policy" className="text-muted hover:text-white">
              {t("Footer:policy") || "Privacy Policy & Terms"}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
