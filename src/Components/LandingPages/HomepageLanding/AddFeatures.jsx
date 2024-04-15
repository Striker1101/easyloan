import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import getCountry from "../../../international/GetCountry";

export default function AddFeatures() {
  return (
    <Container fluid className="p-3 addfeature">
      <Row>
        <Col lg={6} className=" order-lg-2 d-none d-lg-block">
          <img
            className="w-100 p-position-relative bottom-50 "
            src="/landing/Homepage/review1.avif"
            alt=""
          />
        </Col>
        <Col lg={6} className=" order-lg-2 order-1">
          <div>
            <div className="d-flex">
              <img src="/landing/Homepage/pos.png" alt="" />
              <h2 className="text-primary">Point Of Sale Financing</h2>
            </div>
            <p className="fs-6">
              Buy now and pay later at over 3000 merchants across {getCountry()}
              . Spread your purchase into easy monthly payments and pay over
              time at your favorite retailers online or in-store.
            </p>
          </div>

          <div>
            <div className="d-flex">
              <img src="/landing/Homepage/sbl.png" alt="" />
              <h2 className="text-primary">Small Business Financing</h2>
            </div>
            <p className="fs-6">
              Get up to $500,000 to grow your business with solutions tailored
              to your needs. Simple and easy online application and your funds
              received in as little as 24 hours.
            </p>
          </div>

          <div>
            <div className="d-flex">
              <img src="/landing/Homepage/vas.png" alt="" />
              <h2 className="text-primary"> Value Added Services</h2>
            </div>
            <p className="fs-6">
              We offer a variety of value-added services designed to enhance
              your borrowing experience. With more than just loans, we’re here
              to help you take control of your financial future.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
