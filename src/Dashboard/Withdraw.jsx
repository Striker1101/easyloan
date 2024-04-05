import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import { getDocument, updateRegion } from "../Firebase/Functions";
import { CountryDropdown } from "react-country-region-selector";
import AlertUser from "../Components/DashboardPages/AlertUser";

export default function Withdraw({ setReview, id }) {
  const [isLoading, setIsLoading] = useState(false);

  const [withdraw, setWithdraw] = useState({
    amount: "",
    paymentMethod: "",
    bankName: "",
    accName: "",
    accNum: "",
    region: "",
    IBAN_num: "",
    country: "",
    status: false,
  });
  const [loans, setLoans] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [totalAmount, setTotalAmount] = useState([]);
  function handleSubmit(params) {}

  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Fill the Form to withdraw",
      body: "make sure you fill form correctly, withdrawal usually take within 48hours, so do be patient ",
    }));
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const loans = await getDocument("loan", id);
        setLoans(loans);

        // Calculate total amount here after setting loans
        const totalAmount = calculateTotalAmount(loans.datas.region);
        // You can store totalAmount in state if needed
        setTotalAmount(totalAmount);
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdraw((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function calculateTotalAmount(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].status === true) {
        total += array[i].amount;
      }
    }
    return total;
  }

  async function Submit(e) {
    e.preventDefault();
    setIsLoading(true);
    setModalShow(true);

    const result = await updateRegion("withdraw", withdraw);
    if (result.status) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setIsLoading(false);
      handleSubmit(e);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }
  }

  const handleCountryChange = (val) => {
    setWithdraw((prev) => ({
      ...prev,
      country: val,
    }));
  };

  return (
    <div>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />

      <Form onSubmit={Submit} style={{ margin: "5px" }}>
        <Form.Group controlId="Amount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            required
            value={withdraw.amount}
            onChange={handleChange}
            placeholder="Input Your withdraw Amount"
          />
        </Form.Group>

        <Form.Group controlId="paymentMethod">
          <Form.Label>Payment Method:</Form.Label>
          <Form.Control
            as="select"
            name="paymentMethod"
            required
            value={withdraw.paymentMethod}
            onChange={handleChange}
            placeholder="Select Your payment method"
          >
            <option value="">Select Your payment method</option>
            <option value="paypal">PayPal</option>
            <option value="flutter">Flutter</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="bankName">
          <Form.Label>Bank Name:</Form.Label>
          <Form.Control
            type="text"
            name="bankName"
            value={withdraw.bankName}
            required
            onChange={handleChange}
            placeholder="Input Your Receivers Bank Name"
          />
        </Form.Group>

        <Form.Group controlId="accName">
          <Form.Label>Account Name:</Form.Label>
          <Form.Control
            type="text"
            name="accName"
            value={withdraw.accName}
            required
            onChange={handleChange}
            placeholder="Input Your Receivers Account Name"
          />
        </Form.Group>

        <Form.Group controlId="accNum">
          <Form.Label>Account Number:</Form.Label>
          <Form.Control
            type="number"
            name="accNum"
            required
            value={withdraw.accNum}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="IBAN_num">
          <Form.Label>IBAN Number:</Form.Label>
          <Form.Control
            type="text"
            name="IBAN_num"
            value={withdraw.IBAN_num}
            required
            onChange={handleChange}
            placeholder="Input Your IBAN Number"
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country:</Form.Label>
          <CountryDropdown
            id="country"
            value={withdraw.country}
            required
            onChange={handleCountryChange}
            className="form-control"
          />
        </Form.Group>

        {/* Add more form fields as needed */}
        <Button
          variant="primary"
          type="submit"
          disabled={isLoading}
          className="m-2"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="mr-1"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <>
          {withdraw.amount > totalAmount ? (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Insufficient Funds </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <img
                  src="/error-icon.svg"
                  width={400}
                  height={300}
                  alt="insufficient funds"
                />
                <br />
                <strong>
                  Loan approved is not up to your required amout, please request
                  for loan and pend for approval, talk to customer care for more
                  details
                </strong>
              </Modal.Body>
            </>
          ) : (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  <strong className="text-danger">Warning</strong> !! Update
                  Account{" "}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <img
                  width={400}
                  height={300}
                  src="/insufficient.svg"
                  alt="error on withdraw"
                />
                <br />
                <strong>
                  Current balance is more than your Basic plan please update
                  account: contact the customer service for more details
                </strong>
              </Modal.Body>
            </>
          )}
        </>
      </Modal>
    </div>
  );
}
