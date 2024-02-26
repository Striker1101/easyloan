// login user directly from Here

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SelectLoan from "../Components/DashboardPages/Request/SelectLoan";
import Product from "../Components/DashboardPages/Request/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../Components/Styles/Dashboard/RequestLoan.css";
import Reason from "../Components/DashboardPages/Request/Reason";
import Personal from "../Components/DashboardPages/Personal";
import Statement from "../Components/DashboardPages/Request/Statement";
import UploadDataAndRedirect from "../Components/DashboardPages/Request/UploadDataAndRedirect";
import Application_Review from "../Components/DashboardPages/Request/ApplicationReview";
import { useReview } from "./App";
const Request = () => {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Request a Loan Now",
      body: "Apply for a active loan offer, 24h ours deliver rate ",
    }));
  }, []);
  const datas = [
    {
      name: "SALAD(salary Advance loan)",
      type: "personal loan",
      details: "",
    },
    {
      name: "Education Loan",
      type: "student loan",
      details:
        "EDU Loan is an educational loan product designed to provide financial assistance to corporate employees and SME business owners who want to further their education abroad or sponsor their wards.",
    },
    {
      name: "BREEZE",
      type: "personal loan",
      details: "Employee Group Loan",
    },
  ];

  const reasonsData = [
    "Personal Loan",
    "Automobile",
    "Business",
    "Cash advances",
    "Debt Consolidation",
    "Education",
    "Financing a vacation",
    "Home purchase, renovations & refurbushing",
    "Medical Emergencies",
    "Personal Loan",
    "Small Business Loan",
    "Weddings & family function",
  ];

  const [selectLoan, setSelectLoan] = useState({
    index: 0,
    status: true,
  });

  const [reason, setReason] = useState({
    reason: "",
    status: false,
  });

  const [product, setProduct] = useState({
    data: {
      amount: 0,
      duration: 0,
      repay: 0,
    },
    status: false,
  });

  const [personal, setPersonal] = useState(false);

  const [statement, setStatement] = useState(false);

  const [_review, set_Review] = useState(false);

  const [loan, setLoan] = useState(false);

  const [imgURL, setImgURL] = useState("");

  let loanData = {
    amount: product.data.amount,
    duration: product.data.duration,
    repay: product.data.repay,
    reason: reason.reason,
    type: datas[selectLoan.index].name + "/" + datas[selectLoan.index].type,
    imgURL,
    status: false,
  };

  const [info, setInfo] = useState({
    status: false,
    details: "Select your Loan Product",
  });

  const handleSelectLoanSubmit = () => {
    //set loan status to false
    setSelectLoan.status = false;
    //show product
    product.status = true;
    //set info message
    setInfo.details = "Select the Amount and Duration";
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
      status: false,
    });

    setInfo({
      ...info,
      details: "Tell us why you want this loan",
    });

    reason.status = true;
    // Handle form submission logic here
  };

  const handleReasonSubmit = (e) => {
    e.preventDefault();
    if (reason.reason === "") {
      return;
    }
    setInfo({
      ...info,
      details: "Provide personal information",
    });

    reason.status = false;
    setPersonal(true);
  };

  const handlePersonalSubmit = () => {
    setPersonal(false);

    setInfo({
      ...info,
      details: "Attach all required documents",
    });

    setStatement(true);
  };

  const handleStatementSubmit = () => {
    setStatement(false);

    setInfo({
      ...info,
      details: "_Review your application.",
    });

    set_Review(true);
  };

  const handle_ReviewSubmit = () => {
    set_Review(false);

    setInfo({
      ...info,
      details: "Uploading .........",
    });

    setLoan(true);
  };

  const handleReveiwReset = () => {
    selectLoan.status = true;
    reason.status = false;
    product.status = false;
    info.details = "Select your Loan Product";
    setPersonal(false);
    setStatement(false);
    set_Review(false);
    setLoan(false);
  };

  function handleChangeProduct(e) {
    const { name, value } = e.target;
    let { amount, duration } = product.data;

    if (name === "amount") {
      amount = parseInt(value);
    } else if (name === "duration") {
      duration = parseInt(value);
    }

    const repay = calculateRepay(amount, duration);

    setProduct({
      data: {
        ...product.data,
        [name]: parseInt(value),
        repay: repay + amount,
      },
      status: product.status,
    });
  }

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason({
      ...reason,
      reason: value,
    });
  };

  const calculateRepay = (amount, duration) => {
    // Assuming a simple calculation for repay based on amount and duration
    // You can replace this with your actual calculation logic
    return amount * duration * 0.05; // This is just an example calculation
  };

  function prev() {
    if (product.status) {
      product.status = false;
      info.status = false;
      info.details = "Select a Loan Product.";
      return setSelectLoan({ ...selectLoan, status: true });
    }

    if (reason.status) {
      reason.status = false;
      setInfo({
        ...info,
        details: "Product Infomation",
      });
      return setProduct({ ...product, status: true });
    }

    if (personal) {
      info.details = "Tell us why you want this loan.";
      setPersonal(false);
      return setReason({
        ...reason,
        status: true,
      });
    }

    if (statement) {
      info.details = "Peronsal Information";
      setStatement(false);
      return setPersonal(true);
    }

    if (_review) {
      info.details = "Attach all required documents.";
      set_Review(false);
      return setStatement(true);
    }
  }

  return (
    <Container className="p ">
      <h2 className="pt mt text-primary">
        Fill this Form to Complete your request{" "}
      </h2>
      <div className="info">
        <div>
          {info.status && (
            <FontAwesomeIcon
              onClick={prev}
              icon={faArrowLeft}
              style={{ fontSize: "20px" }}
            />
          )}
        </div>
        <strong>{info.details}</strong>
      </div>

      <div className="pt-3 mt-3">
        <div className="d-flex flex-column  align-items-center justify-content-center gap-4 ">
          <img src="/loanlogo.jpg" alt="loanlogo" />
          {/* select loan plan Step */}
          <SelectLoan
            datas={datas}
            selectLoan={selectLoan}
            setLoan={setSelectLoan}
            submit={handleSelectLoanSubmit}
            setInfo={setInfo}
          />

          {/* select loan plan Step */}
          <Product
            product={product}
            setProduct={setProduct}
            setInfo={setInfo}
            handleChange={handleChangeProduct}
            handleSubmit={handleProductSubmit}
          />

          <Reason
            datas={reasonsData}
            handleChange={handleReasonChange}
            reason={reason}
            handleSubmit={handleReasonSubmit}
            setInfo={setInfo}
          />

          <Personal
            setInfo={setInfo}
            status={personal}
            handleSubmit={handlePersonalSubmit}
          />

          <Statement
            setImgURL={setImgURL}
            setInfo={setInfo}
            status={statement}
            handleSubmit={handleStatementSubmit}
          />

          <Application_Review
            status={_review}
            handleSubmit={handle_ReviewSubmit}
            amount={product.data.amount}
            duration={product.data.duration}
            reason={reason.reason}
            handleReset={handleReveiwReset}
            setInfo={setInfo}
          />

          <UploadDataAndRedirect
            setInfo={setInfo}
            loan={loanData}
            status={loan}
          />
        </div>
      </div>
    </Container>
  );
};

export default Request;
