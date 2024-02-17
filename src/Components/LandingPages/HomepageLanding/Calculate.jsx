import React, { useState } from "react";
import {
  faCalendar,
  faCalendarAlt,
  faCartPlus,
  faMoneyBill,
  faPercent,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import CurrencyDisplay from "../../../international/CurrencyDisplay";
import { useTranslation } from "react-i18next";
export default function Calculate() {
  const [data, setData] = useState({
    amount: 0,
    duration: 0,
    interest: 0,
    repay: 0,
  });

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    const duration = data.duration;
    const interest = calculateInterest(amount, duration);
    const repay = calculateRepayment(amount, duration);
    setData({ ...data, amount, interest, repay });
  };

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value);
    const amount = data.amount;
    const interest = calculateInterest(amount, duration);
    const repay = calculateRepayment(amount, duration);
    setData({ ...data, duration, interest, repay });
  };

  const calculateInterest = (amount, duration) => {
    // Implement your interest calculation logic here
    let interest = amount * duration * 0.05; // Example calculation
    return interest.toFixed(2); // Round off to two decimal places
  };

  const calculateRepayment = (amount, duration) => {
    // Implement your repayment calculation logic here
    let repay = amount + calculateInterest(amount, duration) / duration;
    return repay.toFixed(2); // Example calculation
  };

  const { t } = useTranslation();
  return (
    <>
      <div className="homepageCalculator w-100 h-100 px-4  ">
        <div className=" d-flex flex-column justify-content-center  ">
          <div className=" w-75 text-light  mt-5  pt-5 mt-lg-4 pt-lg-4 d-flex flex-column  justify-content-center  ">
            <h3 className="fs-1">{t("Homepage:need")}</h3>
            <p className="fw-bold fs-5 ">{t("Homepage:urgent_need")}</p>
            <div className="bg-secondary p-4 d-flex flex-column ">
              <Form.Label>
                <div className="d-flex justify-content-between ">
                  <div>
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      style={{ fontSize: "1.3rem", color: "white" }}
                    />
                    <p>{t("Homepage:loan")}</p>
                  </div>
                  <div>
                    <strong className="currency text-black fw-bold "></strong>
                    <p>
                      <CurrencyDisplay amount={data.amount} />
                    </p>
                  </div>
                </div>
                <Form.Range
                  type="range"
                  name="amount"
                  className="w-100 h-25 "
                  id="amount"
                  min="500"
                  max="1000000"
                  value={data.amount}
                  onChange={handleAmountChange}
                />
              </Form.Label>

              <Form.Label>
                {" "}
                <div className="d-flex justify-content-between ">
                  <div>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{ fontSize: "1.3rem", color: "white" }}
                    />
                    <p>{t("Homepage:duration")}</p>
                  </div>
                  <div>
                    <strong className="duration"></strong>
                    <p>
                      {data.duration}{" "}
                      <span className="text-black fw-bold ">
                        {t("Homepage:months")}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <Form.Range
                  type="range"
                  name="duration"
                  id="duration"
                  className="w-100"
                  min="3"
                  max="24"
                  value={data.duration}
                  onChange={handleDurationChange}
                />
              </Form.Label>
            </div>

            <div className="bg-light p-4 text-black d-flex  flex-column flex-md-row align-items-center justify-content-between ">
              <div className="p-2  d-flex flex-column justify-content-center  align-items-center  ">
                {" "}
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  style={{ fontSize: "2rem", color: "black" }}
                />{" "}
                <p className="p-0 m-0 ">{t("Homepage:loan").toUpperCase()}</p>
                <h5> {data.amount} </h5>
              </div>

              <div className="p-2  d-flex flex-column justify-content-center  align-items-center  ">
                {" "}
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ fontSize: "2rem", color: "black" }}
                />{" "}
                <p className="p-0 m-0 ">
                  {t("Homepage:duration").toUpperCase()}
                </p>
                <h5> {data.duration} </h5>
              </div>

              <div className="p-2  d-flex flex-column justify-content-center  align-items-center  ">
                {" "}
                <FontAwesomeIcon
                  icon={faPercent}
                  style={{ fontSize: "2rem", color: "black" }}
                />{" "}
                <p className="p-0 m-0 ">
                  {t("Homepage:interest").toUpperCase()}
                </p>
                <h5>{data.interest}</h5>
              </div>

              <div className="d-flex flex-column justify-content-center  align-items-center  ">
                {" "}
                <FontAwesomeIcon
                  icon={faPlay}
                  style={{ fontSize: "2rem", color: "black" }}
                />{" "}
                <p className="p-0 m-0 ">{t("Homepage:repay").toUpperCase()}</p>
                <h5> {data.repay} </h5>
              </div>
            </div>

            <h6>{t("Homepage:cal_nb").toUpperCase()}</h6>
          </div>
        </div>
        <Button className="px-5 m-2 ">
          {t("apply_for_loan").toUpperCase()}
        </Button>
      </div>
    </>
  );
}
