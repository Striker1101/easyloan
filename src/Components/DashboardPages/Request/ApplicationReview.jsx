import React, { useEffect, useState } from "react";
import CurrencyDisplay from "../../../international/CurrencyDisplay";
import { Button } from "react-bootstrap";
import { getCompany } from "../../../international/GetCountry";
export default function ApplicationReview({
  status,
  handleSubmit,
  amount,
  duration,
  repay,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div>
      {status && (
        <div>
          {toggle ? (
            <div>
              <p>
                By clicking the 'Agree' button, I consent to {getCompany()} (
                {process.env.REACT_APP_NAME}) Limited obtaining information from
                relevant third parties as may be necessary, on my employment
                details, salary payment, loans and other related data, to make a
                decision on my loan application. I also consent to the loan
                amounts being deducted from my salary at source before credit to
                my account and any outstanding loans being recovered
                automatically from any other accounts linked to me in the case
                of default. <span>Learn More</span>
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
              <div className="mb-2">
                <strong className="text-primary me-2">Principal:</strong>
                <span>
                  <CurrencyDisplay amount={amount} />
                </span>
              </div>

              {repay > 0 && (
                <div className="mb-2">
                  <strong className="text-primary me-2">Total Repayment:</strong>
                  <span>
                    <CurrencyDisplay amount={repay} />
                  </span>
                </div>
              )}

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
