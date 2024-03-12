import { faDochub, faGoodreads } from "@fortawesome/free-brands-svg-icons";
import {
  faBoxArchive,
  faCarrot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";

export default function IndexHow() {
  return (
    <div className="pt-5 ">
      <div className="header pt-5 d-flex justify-content-center flex-column align-items-center ">
        <h1>HOW IT WORKS</h1>
        <p>A FEW STEPS AND YOUR LOAN IS DISBURSED</p>
      </div>

      <div className="pt-5">
        <div className="bg-light shadow m-2 ">
          <div className=" d-flex justify-content-between  align-items-center ">
            <h3> 1.Register</h3>
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "2rem", color: "orange" }}
            />
          </div>
          <hr />
          <p>
            Create your account and Login to your dashboard. Registration only
            takes a few EASY steps.
          </p>
        </div>

        <div>
          <div className=" one  p-3 shadow mt-5 ">
            <div className=" d-flex justify-content-between  align-items-center ">
              <h3> 2. Apply</h3>
              <FontAwesomeIcon
                icon={faBoxArchive}
                style={{ fontSize: "2rem", color: "orange" }}
              />
            </div>
            <hr />
            <p>
              Apply for the loan amount you need via our EASY application
              process and receive an email.
            </p>
          </div>

          <div className="two p-3 shadow   ">
            <div className=" d-flex justify-content-between  align-items-center ">
              <h3> 3. Documents</h3>
              <FontAwesomeIcon
                icon={faDochub}
                style={{ fontSize: "2rem", color: "orange" }}
              />
            </div>
            <hr />
            <p>
              Submit the documents required as listed in the email. We will also
              require your bank statement.
            </p>
          </div>

          <div className="three  p-3 shadow mb-4  ">
            <div className=" d-flex justify-content-between  align-items-center ">
              <h3> 4. Disbursement</h3>
              <FontAwesomeIcon
                icon={faCarrot}
                style={{ fontSize: "2rem", color: "orange" }}
              />
            </div>
            <hr />
            <p>
              Once approved, the loan is disbursed into the bank account that
              you have specified.
            </p>
          </div>
        </div>

        <div className="bg-light p-3 shadow mt-2 ">
          <div className=" d-flex justify-content-between  align-items-center ">
            <h3> 5. Repayment</h3>
            <FontAwesomeIcon
              icon={faGoodreads}
              style={{ fontSize: "2rem", color: "orange" }}
            />
          </div>
          <hr />
          <p>
            You start repaying your loan based on the installments agreed and
            your choice of payment channel.
          </p>
        </div>
      </div>
    </div>
  );
}
