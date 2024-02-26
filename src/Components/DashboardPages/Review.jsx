import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

const Review = ({ review }) => {
  return (
    <div className="d-flex">
      <div className="message-icon"></div>
      <Card className="review d-none d-md-block" style={{ width: "200px" }}>
        <Card.Header style={{ color: " rgb(67, 150, 153)" }}>
          {review.header}
        </Card.Header>
        <Card.Body className="d-flex flex-column align-align-items-center  justify-content-center ">
          {" "}
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ fontSize: "50", color: "lightblue" }}
          />
          <p className="fs-6 fw-bold ">{review.body}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Review;
