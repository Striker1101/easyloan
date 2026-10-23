import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faFileInvoiceDollar,
  faCloudArrowUp,
  faMoneyBillTransfer,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

export default function IndexHow() {
  const steps = [
    {
      num: "01",
      title: "Register & Profile Setup",
      icon: faUserPlus,
      desc: "Create your secure account and complete basic profile details. Registration only takes a few minutes and is 100% digital.",
    },
    {
      num: "02",
      title: "Apply Online",
      icon: faFileInvoiceDollar,
      desc: "Select your desired loan amount, repayment duration, and review the transparent calculation breakdown.",
    },
    {
      num: "03",
      title: "Submit Verification Documents",
      icon: faCloudArrowUp,
      desc: "Upload standard identification and recent bank statements to verify your income quickly through our secure portal.",
    },
    {
      num: "04",
      title: "Rapid Disbursement",
      icon: faMoneyBillTransfer,
      desc: "Once verified and approved, your requested loan funds are transferred directly into your designated bank account.",
    },
    {
      num: "05",
      title: "Flexible Repayment",
      icon: faCheckDouble,
      desc: "Make convenient monthly repayments according to your agreed plan, rebuilding your credit score with every timely payment.",
    },
  ];

  return (
    <div>
      <div className="how-header-banner">
        <Container>
          <span className="badge-chip bg-primary text-white mb-2">Step by Step Guide</span>
          <h1 className="display-5 fw-extrabold mb-2 text-white">How It Works</h1>
          <p className="text-white-50 fs-5 mb-0">A few transparent steps and your funds are ready</p>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4 justify-content-center">
          {steps.map((step, idx) => (
            <Col xs={12} md={6} lg={4} key={idx}>
              <div className="timeline-step-card h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="step-number-pill">{step.num}</span>
                    <div className="step-icon-wrapper">
                      <FontAwesomeIcon icon={step.icon} />
                    </div>
                  </div>
                  <h3 className="fs-5 fw-bold text-dark mb-2">{step.title}</h3>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
