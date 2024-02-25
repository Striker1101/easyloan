import React, { useEffect, useState } from "react";
import CurrencyDisplay from "../../../international/CurrencyDisplay";
import { Button } from "react-bootstrap";
export default function ApplicationReview({
  status,
  handleSubmit,
  amount,
  duration,
  reason,
  handleReset,
  setInfo,
}) {
  const [toggle, setToggle] = useState(false);
  // Get today's date
  const today = new Date();

  // Format the date as "MM/DD/YYYY"
  const formattedDate = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      details: "Review Your Application",
      status: true,
    }));
  }, [status]);

  return (
    <div>
      {status && (
        <div>
          {toggle ? (
            <div>
              <p>
                By clicking the 'Agree' button, I consent to Casafina Credit
                Limited ({process.env.REACT_APP_NAME}) Limited obtaining
                information from relevant third parties as may be necessary, on
                my employment details, salary payment, loans and other related
                data, to make a decision on my loan application. I also consent
                to the loan amounts being deducted from my salary at source
                before credit to my account and any outstanding loans being
                recovered automatically from any other accounts linked to me in
                the case of default. <span>Learn More</span>
              </p>
              <div>
                <Button
                  className="m-1 ps-5"
                  varient="primary"
                  onClick={handleSubmit}
                >
                  Agree
                </Button>
                <br />
                <Button
                  className="m-1 ps-5"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <strong className="text-primary">Principal</strong>
                <p>
                  <CurrencyDisplay amount={amount} />
                </p>
              </div>

              <div>
                <strong className="text-primary">Duration</strong>
                <p>{duration} Month(s)</p>
              </div>

              <div>
                <strong className="text-primary">Reason</strong>
                <p>{reason}</p>
              </div>

              <div>
                <strong className="text-primary">Application Date</strong>
                <p> {formattedDate}</p>
              </div>

              <Button
                className="m-3"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                Submit Application
              </Button>
              <br />
              <Button
                varient="primary"
                className="text-bg-light text-primary m-3 "
                onClick={handleReset}
              >
                Update Application
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
