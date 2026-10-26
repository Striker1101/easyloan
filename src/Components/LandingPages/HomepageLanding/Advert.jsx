import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faAward } from "@fortawesome/free-solid-svg-icons";

export default function Advert() {

  return (
    <section className="advert">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <span className="badge-chip bg-info bg-opacity-25 text-info mb-3">
              National Impact & Trust
            </span>
            <h2 className="display-6 fw-bold mb-3 text-white">
              Putting Borrowers on a Path to a Better Financial Future
            </h2>
            <p className="text-white-50 fs-6 mb-4">
              When traditional banks aren’t an option, we provide the financial lifeline and credit-building tools you need to move forward.
            </p>

            <Row className="g-3">
              <Col xs={4}>
                <div className="stat-box">
                  <h2>50k+</h2>
                  <p>Borrowers Served</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="stat-box">
                  <h2>$150M+</h2>
                  <p>Capital Disbursed</p>
                </div>
              </Col>
              <Col xs={4}>
                <div className="stat-box">
                  <h2>98%</h2>
                  <p>Satisfaction Rate</p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={6}>
            <Row className="g-3">
              <Col sm={6} lg={12}>
                <div className="advert_circle_card d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-info bg-opacity-20 text-info">
                    <FontAwesomeIcon icon={faArrowTrendUp} size="2x" />
                  </div>
                  <div>
                    <h3 className="display-6 fw-bold text-white mb-1">60%</h3>
                    <p className="text-white-50 mb-0 small">
                      Of our customers improve their credit score within 6 months of active repayment.
                    </p>
                  </div>
                </div>
              </Col>

              <Col sm={6} lg={12}>
                <div className="advert_circle_card d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle bg-success bg-opacity-20 text-success">
                    <FontAwesomeIcon icon={faAward} size="2x" />
                  </div>
                  <div>
                    <h3 className="display-6 fw-bold text-white mb-1">1 in 3</h3>
                    <p className="text-white-50 mb-0 small">
                      Customers qualify and graduate to prime bank lending rates.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
