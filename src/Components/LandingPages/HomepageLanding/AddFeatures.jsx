import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import getCountry from "../../../international/GetCountry";
import CurrencyDisplay from "../../../international/CurrencyDisplay";

export default function AddFeatures() {
  const country = getCountry();

  return (
    <section className="addfeature">
      <Container>
        <div className="text-center mb-5">
          <span className="badge-chip bg-primary bg-opacity-10 text-primary mb-2">
            Tailored Financial Solutions
          </span>
          <h2 className="display-6 fw-bold text-dark">Services Designed For You</h2>
          <p className="text-muted">Flexible borrowing options crafted around your life and goals</p>
        </div>

        <Row className="align-items-center g-4">
          <Col lg={5} className="d-none d-lg-block">
            <div className="rounded-4 overflow-hidden shadow-lg border">
              <img
                className="w-100 object-fit-cover"
                src="/landing/Homepage/review1.avif"
                alt="Financing solutions"
                style={{ maxHeight: "460px" }}
              />
            </div>
          </Col>

          <Col lg={7}>
            <div className="addfeature-card">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="/landing/Homepage/pos.png" alt="POS" style={{ width: "36px", height: "36px" }} />
                <h3 className="fs-5 fw-bold text-primary mb-0">Point Of Sale Financing</h3>
              </div>
              <p className="text-muted mb-0 small">
                Buy now and pay later at over 3,000 merchants across {country}. Spread your purchase into easy monthly payments and pay over time at your favorite retailers online or in-store.
              </p>
            </div>

            <div className="addfeature-card">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="/landing/Homepage/sbl.png" alt="Small Business" style={{ width: "36px", height: "36px" }} />
                <h3 className="fs-5 fw-bold text-primary mb-0">Small Business Financing</h3>
              </div>
              <p className="text-muted mb-0 small">
                Get up to <CurrencyDisplay amount={500000} /> to grow your business with solutions tailored to your cashflow. Simple online application and funds received in as little as 24 hours.
              </p>
            </div>

            <div className="addfeature-card">
              <div className="d-flex align-items-center gap-3 mb-2">
                <img src="/landing/Homepage/vas.png" alt="Value Added" style={{ width: "36px", height: "36px" }} />
                <h3 className="fs-5 fw-bold text-primary mb-0">Value Added Financial Services</h3>
              </div>
              <p className="text-muted mb-0 small">
                We offer a variety of value-added services designed to enhance your borrowing experience. Financial guidance, debt consolidation, and credit wellness.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
