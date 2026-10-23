import React, { useState } from "react";
import {
  faCalendarAlt,
  faCoins,
  faHandHoldingDollar,
  faMoneyBillWave,
  faArrowRight,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from "react-bootstrap";
import CurrencyDisplay from "../../../international/CurrencyDisplay";
import { useTranslation } from "react-i18next";
import ApplyModal from "../../Utility/ApplyModal";

export default function Calculate() {
  const defaultAmount = 5000;
  const defaultDuration = 12;

  const calculateInterest = (amount, duration) => {
    const interest = amount * duration * 0.005; // 0.5% per month (6% p.a.)
    return parseFloat(interest.toFixed(2));
  };

  const calculateTotalRepay = (amount, duration) => {
    const interest = amount * duration * 0.005;
    return parseFloat((amount + interest).toFixed(2));
  };

  const calculateMonthlyRepay = (amount, duration) => {
    if (!duration || duration <= 0) return 0;
    const interest = amount * duration * 0.005;
    const totalRepay = (amount + interest) / duration;
    return parseFloat(totalRepay.toFixed(2));
  };

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    amount: defaultAmount,
    duration: defaultDuration,
    interest: calculateInterest(defaultAmount, defaultDuration),
    totalRepay: calculateTotalRepay(defaultAmount, defaultDuration),
    monthlyRepay: calculateMonthlyRepay(defaultAmount, defaultDuration),
  });

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10) || 500;
    const duration = data.duration;
    const interest = calculateInterest(amount, duration);
    const totalRepay = calculateTotalRepay(amount, duration);
    const monthlyRepay = calculateMonthlyRepay(amount, duration);
    setData({ ...data, amount, interest, totalRepay, monthlyRepay });
  };

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value, 10) || 3;
    const amount = data.amount;
    const interest = calculateInterest(amount, duration);
    const totalRepay = calculateTotalRepay(amount, duration);
    const monthlyRepay = calculateMonthlyRepay(amount, duration);
    setData({ ...data, duration, interest, totalRepay, monthlyRepay });
  };

  const { t } = useTranslation();

  return (
    <section className="homepageCalculator">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={9} xl={8}>
            <div className="text-center text-light mb-4">
              <span className="badge-chip bg-primary text-white mb-2">
                Fast & Flexible Financing
              </span>
              <h1 className="fw-extrabold display-5 mb-2">
                {t("Homepage:need") || "Need Quick Cash?"}
              </h1>
              <p className="text-white-50 fs-5 mb-0">
                {t("Homepage:urgent_need") ||
                  "Calculate your repayment and get approved in minutes."}
              </p>
            </div>

            <div className="calculator-card p-3 p-md-4 mb-3">
              {/* Sliders Container */}
              <div className="calc-slider-box mb-4">
                {/* Amount Slider */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white-50 fw-semibold d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-primary" />
                      {t("Homepage:loan") || "Loan Amount (Principal)"}
                    </span>
                    <span className="badge bg-primary fs-6 px-3 py-2">
                      <CurrencyDisplay amount={data.amount} />
                    </span>
                  </div>
                  <Form.Range
                    type="range"
                    name="amount"
                    className="form-range"
                    id="amount"
                    min="500"
                    max="1000000"
                    step="500"
                    value={data.amount}
                    onChange={handleAmountChange}
                  />
                  <div className="d-flex justify-content-between text-white-50 small mt-1">
                    <span><CurrencyDisplay amount={500} /></span>
                    <span><CurrencyDisplay amount={1000000} /></span>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-white-50 fw-semibold d-flex align-items-center gap-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
                      {t("Homepage:duration") || "Loan Duration"}
                    </span>
                    <span className="badge bg-info text-dark fs-6 px-3 py-2">
                      {data.duration} {t("Homepage:months") || "Months"}
                    </span>
                  </div>
                  <Form.Range
                    type="range"
                    name="duration"
                    id="duration"
                    className="form-range"
                    min="3"
                    max="36"
                    value={data.duration}
                    onChange={handleDurationChange}
                  />
                  <div className="d-flex justify-content-between text-white-50 small mt-1">
                    <span>3 Months</span>
                    <span>36 Months</span>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Summary Grid */}
              <div className="calc-results-grid mb-3">
                <div className="calc-metric-item">
                  <div className="metric-icon">
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                  </div>
                  <p className="metric-label">{t("Homepage:loan") || "Loan Principal"}</p>
                  <h5 className="metric-val">
                    <CurrencyDisplay amount={data.amount} />
                  </h5>
                </div>

                <div className="calc-metric-item">
                  <div className="metric-icon">
                    <FontAwesomeIcon icon={faCoins} />
                  </div>
                  <p className="metric-label">Total Interest</p>
                  <h5 className="metric-val text-primary">
                    <CurrencyDisplay amount={data.interest} />
                  </h5>
                  <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                    (0.5% / month)
                  </span>
                </div>

                <div className="calc-metric-item">
                  <div className="metric-icon text-dark">
                    <FontAwesomeIcon icon={faReceipt} />
                  </div>
                  <p className="metric-label">Total Repayment</p>
                  <h5 className="metric-val text-dark">
                    <CurrencyDisplay amount={data.totalRepay} />
                  </h5>
                  <span className="text-muted" style={{ fontSize: "0.7rem" }}>
                    (Principal + Interest)
                  </span>
                </div>

                <div className="calc-metric-item border-success bg-success bg-opacity-10">
                  <div className="metric-icon text-success">
                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                  </div>
                  <p className="metric-label text-success fw-bold">Monthly Installment</p>
                  <h5 className="metric-val text-success">
                    <CurrencyDisplay amount={data.monthlyRepay} />
                  </h5>
                  <span className="text-success fw-semibold" style={{ fontSize: "0.7rem" }}>
                    per month for {data.duration} mo
                  </span>
                </div>
              </div>

              <div className="text-center text-white-50 small mb-3">
                Total Repayment: <strong className="text-white"><CurrencyDisplay amount={data.totalRepay} /></strong> over {data.duration} months at <strong className="text-white"><CurrencyDisplay amount={data.monthlyRepay} /></strong> / month.
              </div>

              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="w-100 py-3 d-flex align-items-center justify-content-center gap-2 fw-bold"
                >
                  <span>{t("apply_for_loan") || "Apply For Loan"}</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </Button>
              </div>

              <p className="text-white-50 text-center small mt-3 mb-0" style={{ fontSize: "0.78rem", opacity: 0.75 }}>
                NB: † Representative example: Borrowing <CurrencyDisplay amount={data.amount} /> over {data.duration} months at 0.5% monthly interest results in total repayment of <CurrencyDisplay amount={data.totalRepay} /> in equal installments of <CurrencyDisplay amount={data.monthlyRepay} /> / month. Terms subject to final approval.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <ApplyModal show={showModal} handleClose={() => setShowModal(false)} />
    </section>
  );
}
