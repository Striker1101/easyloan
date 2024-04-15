import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CustomerCareButton() {
  return (
    <div>
      <div>
        <strong className="p-2 m-2 ">
          {" "}
          Need More Clarification contact us at{" "}
        </strong>
        <span>
          {" "}
          <a
            className="fs-5 fw-3"
            href={"mailto:" + process.env.REACT_APP_MAIL}
          >
            Company mail
          </a>
        </span>
      </div>

      <Link className="p-3" to={"/customer_care"} target="_blank">
        <Button className="p-3 m-3">Speak to Live Customer service 24/7</Button>
      </Link>
    </div>
  );
}
