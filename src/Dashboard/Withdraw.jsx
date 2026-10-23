import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import { getDocument, updateRegion } from "../Firebase/Functions";
import { CountryDropdown } from "react-country-region-selector";
import AlertUser from "../Components/DashboardPages/AlertUser";
import CurrencyDisplay from "../international/CurrencyDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTransfer,
  faBuildingColumns,
  faHistory,
  faShieldHalved,
  faCircleCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function Withdraw({ setReview, id }) {
  const [isLoading, setIsLoading] = useState(false);

  const [withdraw, setWithdraw] = useState({
    amount: "",
    paymentMethod: "bank_transfer",
    bankName: "",
    accName: "",
    accNum: "",
    region: "",
    IBAN_num: "",
    country: "",
    status: false,
  });

  const [previousWithraw, setPreviousWithdraw] = useState({
    status: false,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [withdrawlShow, setWithdrawalShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (setReview) {
      setReview((prev) => ({
        ...prev,
        header: "Withdraw Approved Funds",
        body: "Transfer your approved disbursements directly to your verified bank account.",
      }));
    }
  }, [setReview]);

  useEffect(() => {
    if (!id) return;
    const fetchUsers = async () => {
      try {
        const loans = await getDocument("loan", id);
        const total = calculateTotalAmount(loans?.datas?.region || []);
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching loans for withdraw:", error);
      }
    };

    const fetchWithdraws = async () => {
      try {
        const result = await getDocument("withdraw", id);
        setPreviousWithdraw(result);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      }
    };

    fetchUsers();
    fetchWithdraws();
  }, [id]);

  const fetchWithdraws = async () => {
    if (!id) return;
    try {
      const result = await getDocument("withdraw", id);
      setPreviousWithdraw(result);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdraw((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (val) => {
    setWithdraw((prev) => ({
      ...prev,
      country: val,
    }));
  };

  function calculateTotalAmount(array) {
    if (!Array.isArray(array)) return 0;
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i]?.status === true) {
        total += Number(array[i].amount) || 0;
      }
    }
    return total;
  }

  async function Submit(e) {
    e.preventDefault();
    const withdrawNum = Number(withdraw.amount) || 0;

    if (withdrawNum > totalAmount || totalAmount <= 0) {
      setErrorMessage("Withdrawal amount exceeds available approved balance.");
      setModalShow(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const payload = {
      ...withdraw,
      amount: withdrawNum,
      status: false,
      requestedAt: new Date().toISOString(),
    };

    const result = await updateRegion("withdraw", payload);
    setIsLoading(false);

    if (result.status) {
      setModalShow(true);
      setSuccessMessage("Withdrawal request submitted successfully. Processing takes 24-48 hours.");
      setWithdraw({
        amount: "",
        paymentMethod: "bank_transfer",
        bankName: "",
        accName: "",
        accNum: "",
        region: "",
        IBAN_num: "",
        country: "",
        status: false,
      });
      fetchWithdraws();
      setTimeout(() => setSuccessMessage(null), 10000);
    } else {
      setErrorMessage(result.message || "Failed to submit withdrawal request.");
      setTimeout(() => setErrorMessage(null), 10000);
    }
  }

  const historyList =
    previousWithraw.status && Array.isArray(previousWithraw.datas?.region)
      ? previousWithraw.datas.region
      : [];


  return (
    <div>
      <div className="dash-page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="dash-page-title">Disbursement & Fund Withdrawal</h2>
          <p className="dash-page-subtitle">
            Transfer approved loan funds directly to your verified local or international bank account.
          </p>
        </div>
        {historyList.length > 0 && (
          <Button
            variant="outline-secondary"
            onClick={() => setWithdrawalShow(true)}
            className="d-flex align-items-center gap-2 py-2 px-3 fw-semibold"
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>Withdrawal History ({historyList.length})</span>
          </Button>
        )}
      </div>

      <div className="row g-4">
        {/* Left: Withdrawal Form */}
        <div className="col-lg-7">
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faBuildingColumns} className="text-primary" />
                <span>Bank Transfer Details</span>
              </h3>
            </div>

            <Form onSubmit={Submit}>
              <div className="row g-3">
                <div className="col-12">
                  <Form.Group controlId="Amount">
                    <Form.Label className="fw-semibold small text-dark">
                      Withdrawal Amount
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="amount"
                      required
                      min="10"
                      value={withdraw.amount}
                      onChange={handleChange}
                      placeholder="e.g. 5000"
                      className="py-2"
                    />
                    <Form.Text className="text-muted small mt-1 d-block">
                      Available to withdraw: <strong className="text-success"><CurrencyDisplay amount={totalAmount} /></strong>
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="paymentMethod">
                    <Form.Label className="fw-semibold small text-dark">
                      Transfer Channel
                    </Form.Label>
                    <Form.Select
                      name="paymentMethod"
                      required
                      value={withdraw.paymentMethod}
                      onChange={handleChange}
                      className="py-2"
                    >
                      <option value="bank_transfer">Direct Bank Wire / ACH</option>
                      <option value="flutter">Flutterwave / Instant Pay</option>
                      <option value="paypal">PayPal</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="country">
                    <Form.Label className="fw-semibold small text-dark">
                      Destination Country
                    </Form.Label>
                    <CountryDropdown
                      id="country"
                      value={withdraw.country}
                      required
                      onChange={handleCountryChange}
                      className="form-select py-2"
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="bankName">
                    <Form.Label className="fw-semibold small text-dark">
                      Bank Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="bankName"
                      value={withdraw.bankName}
                      required
                      onChange={handleChange}
                      placeholder="e.g. JPMorgan Chase / Barclays"
                      className="py-2"
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="accName">
                    <Form.Label className="fw-semibold small text-dark">
                      Account Holder Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="accName"
                      value={withdraw.accName}
                      required
                      onChange={handleChange}
                      placeholder="Must match your profile name"
                      className="py-2"
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="accNum">
                    <Form.Label className="fw-semibold small text-dark">
                      Account / Routing Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="accNum"
                      required
                      value={withdraw.accNum}
                      onChange={handleChange}
                      placeholder="e.g. 123456789"
                      className="py-2"
                    />
                  </Form.Group>
                </div>

                <div className="col-sm-6">
                  <Form.Group controlId="IBAN_num">
                    <Form.Label className="fw-semibold small text-dark">
                      SWIFT / IBAN (Optional)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="IBAN_num"
                      value={withdraw.IBAN_num}
                      onChange={handleChange}
                      placeholder="For international wires"
                      className="py-2"
                    />
                  </Form.Group>
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading || !withdraw.amount || !withdraw.bankName || !withdraw.accNum}
                className="w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                    <span>Initiate Withdrawal</span>
                  </>
                )}
              </Button>
            </Form>

            <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
          </div>
        </div>

        {/* Right: Available Credit & Security Guidance */}
        <div className="col-lg-5">
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Disbursement Summary</h3>
            </div>

            <div className="p-3 bg-light rounded-3 border mb-3">
              <span className="text-muted small d-block mb-1">Approved Balance Available</span>
              <h3 className="fw-bold text-success mb-1">
                <CurrencyDisplay amount={totalAmount} />
              </h3>
              <span className="small text-muted">
                {totalAmount > 0
                  ? "Funds ready for immediate disbursement."
                  : "No active approved balance yet. Apply for a loan to fund your wallet."}
              </span>
            </div>

            <div className="p-3 bg-white rounded-3 border mb-3">
              <h6 className="fw-bold text-dark mb-2 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faShieldHalved} className="text-primary" />
                <span>Security & Settlement Timeline</span>
              </h6>
              <ul className="list-unstyled small text-muted mb-0 d-flex flex-column gap-2">
                <li className="d-flex align-items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-success mt-1" />
                  <span>Withdrawals typically clear within 24 to 48 business hours.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-success mt-1" />
                  <span>The destination account name must match your verified identity on file.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-success mt-1" />
                  <span>Zero transfer fees on standard ACH and local bank wires.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Insufficient Funds / Status Modal */}
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-dark">
            {Number(withdraw.amount) > totalAmount ? "Insufficient Approved Funds" : "Withdrawal Status"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {Number(withdraw.amount) > totalAmount ? (
            <div>
              <div className="dash-empty-icon mb-3 text-warning bg-warning bg-opacity-10 p-3 rounded-circle d-inline-flex">
                <FontAwesomeIcon icon={faMoneyBillTransfer} size="2x" />
              </div>
              <h5 className="fw-bold text-dark mb-2">Requested Amount Exceeds Balance</h5>
              <p className="text-muted small mb-0 px-3">
                Your available approved balance is <strong className="text-dark"><CurrencyDisplay amount={totalAmount} /></strong>. Please adjust your withdrawal amount or submit a new loan application.
              </p>
            </div>
          ) : (
            <div>
              <div className="dash-empty-icon mb-3 text-success bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex">
                <FontAwesomeIcon icon={faClock} size="2x" />
              </div>
              <h5 className="fw-bold text-dark mb-2">Request Under Review</h5>
              <p className="text-muted small mb-0 px-3">
                Your withdrawal request has been received. Our automated disbursement engine will process it to your designated bank within 24-48 hours.
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 justify-content-center">
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* History Modal */}
      <Modal show={withdrawlShow} onHide={() => setWithdrawalShow(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0 px-4 pt-4">
          <Modal.Title className="fw-bold text-dark">Withdrawal History</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 py-3">
          {historyList.length === 0 ? (
            <p className="text-muted text-center py-4 mb-0">No past withdrawal requests recorded.</p>
          ) : (
            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bank</th>
                    <th>Account</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.bankName}</td>
                      <td>
                        <span className="font-monospace small">{item.accNum}</span>
                      </td>
                      <td className="text-capitalize">{item.paymentMethod?.replace("_", " ")}</td>
                      <td>
                        <strong className="text-dark">
                          <CurrencyDisplay amount={item.amount} />
                        </strong>
                      </td>
                      <td>
                        {item.status ? (
                          <span className="dash-badge approved">Approved</span>
                        ) : (
                          <span className="dash-badge pending">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0 px-4 pb-4">
          <Button variant="secondary" onClick={() => setWithdrawalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
