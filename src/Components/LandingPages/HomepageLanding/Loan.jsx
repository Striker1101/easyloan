import React from "react";
import { Container, Row, Col } from "react-bootstrap";
export default function Loan() {
  return (
    <Container>
      <Row xs={2} md={4}>
        <Col className="p-2 ">
          <img src={"/landing/Homepage/1.svg"} alt="one" />
          <span className="text-success fw-bold fs-3  ">YES</span>{" "}
          <span className=" fs-4 "> when the banks say no</span>
        </Col>
        <Col className="p-2 ">
          <img src={"/landing/Homepage/2.svg"} alt="two" />
          <span className="text-success fw-bold fs-3  ">10 minute</span>{" "}
          <span className=" fs-4 "> approval</span>
        </Col>
        <Col className="p-2 ">
          <img src={"/landing/Homepage/3.svg"} alt="three" />
          <span className="text-success fw-bold fs-3  ">Affordable</span>{" "}
          <span className=" fs-4 "> payments</span>
        </Col>
        <Col className="p-2 ">
          <img src={"/landing/Homepage/4.svg"} alt="four" />
          <span className="text-success fw-bold fs-3  ">Rebuild</span>{" "}
          <span className=" fs-4 "> your credit</span>
        </Col>
      </Row>
    </Container>
  );
}
