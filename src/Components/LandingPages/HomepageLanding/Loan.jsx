import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Loan() {
  const highlights = [
    {
      img: "/landing/Homepage/1.svg",
      highlight: "YES",
      text: "when the banks say no",
      desc: "Flexible criteria tailored to your real financial situation.",
    },
    {
      img: "/landing/Homepage/2.svg",
      highlight: "10-Minute",
      text: "fast approvals",
      desc: "Instant digital application and rapid verification.",
    },
    {
      img: "/landing/Homepage/3.svg",
      highlight: "Affordable",
      text: "flexible terms",
      desc: "Transparent monthly payments with no hidden fees.",
    },
    {
      img: "/landing/Homepage/4.svg",
      highlight: "Rebuild",
      text: "your credit score",
      desc: "Positive reporting directly to credit bureaus.",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <Container>
        <Row className="g-3 g-md-4">
          {highlights.map((item, index) => (
            <Col xs={12} sm={6} lg={3} key={index}>
              <div className="loan-feature-card d-flex flex-column h-100">
                <div className="mb-3">
                  <img
                    src={item.img}
                    alt={item.highlight}
                    style={{ height: "42px", width: "auto" }}
                  />
                </div>
                <div>
                  <h4 className="fs-5 fw-bold mb-1">
                    <span className="text-success">{item.highlight}</span>{" "}
                    <span className="text-dark">{item.text}</span>
                  </h4>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
