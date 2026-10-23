import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faGraduationCap,
  faUsers,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faShieldHalved,
  faCloudArrowUp,
  faCar,
  faBriefcase,
  faHeartPulse,
  faHouse,
  faPlane,
  faRing,
  faHandHoldingDollar,
  faCircleCheck,
  faFileLines,
  faCircleInfo,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Spinner, Alert } from "react-bootstrap";
import { updateRegion, uploadFile, getDocument } from "../Firebase/Functions";
import CurrencyDisplay from "../international/CurrencyDisplay";
import { useReview } from "./App";
import "../Components/Styles/Dashboard/RequestLoan.css";

const LOAN_PRODUCTS = [
  {
    id: "salad",
    name: "SALAD (Salary Advance Loan)",
    type: "Personal Credit",
    badge: "Instant Approval",
    apr: "0.5% / month",
    minAmount: 500,
    maxAmount: 10000,
    defaultAmount: 2500,
    defaultDuration: 6,
    icon: faWallet,
    details: "Short-term liquidity designed for salaried employees to bridge cashflow gaps between paydays.",
    features: ["Disbursement within 24 hours", "No collateral required", "Zero prepayment penalties"],
  },
  {
    id: "edu",
    name: "Education & Tuition Loan",
    type: "Academic Finance",
    badge: "Low Rate",
    apr: "0.4% / month",
    minAmount: 1000,
    maxAmount: 25000,
    defaultAmount: 5000,
    defaultDuration: 12,
    icon: faGraduationCap,
    details: "Low-interest educational assistance for tuition fees, certifications, or international student expenses.",
    features: ["Extended repayment up to 36 months", "Grace period available", "Direct school disbursement"],
  },
  {
    id: "breeze",
    name: "BREEZE (Employee Group Loan)",
    type: "Corporate Facility",
    badge: "Maximum Limits",
    apr: "0.35% / month",
    minAmount: 2000,
    maxAmount: 50000,
    defaultAmount: 10000,
    defaultDuration: 24,
    icon: faUsers,
    details: "Preferential multi-year financing for corporate partner employees and SME business teams.",
    features: ["Higher credit limits up to $50,000", "Dedicated account officer", "Flexible amortization"],
  },
];

const LOAN_PURPOSES = [
  { id: "Debt Consolidation", label: "Debt Consolidation", icon: faHandHoldingDollar },
  { id: "Home Renovation", label: "Home Renovation", icon: faHouse },
  { id: "Medical Emergencies", label: "Medical Emergencies", icon: faHeartPulse },
  { id: "Automobile & Transport", label: "Automobile & Auto Repair", icon: faCar },
  { id: "Education & Tuition", label: "Education & Training", icon: faGraduationCap },
  { id: "Business Working Capital", label: "Business Expansion", icon: faBriefcase },
  { id: "Weddings & Family", label: "Weddings & Family", icon: faRing },
  { id: "Travel & Relocation", label: "Travel & Relocation", icon: faPlane },
];

export default function Request() {
  const { setReview } = useReview();
  const navigate = useNavigate();

  // Wizard State: 1 to 6
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(LOAN_PRODUCTS[0]);
  const [amount, setAmount] = useState(LOAN_PRODUCTS[0].defaultAmount);
  const [duration, setDuration] = useState(LOAN_PRODUCTS[0].defaultDuration);
  const [reason, setReason] = useState(LOAN_PURPOSES[0].id);
  const [customNote, setCustomNote] = useState("");

  // Verified Profile Snapshot
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
  });

  // Statement Upload State
  const [selectedFile, setSelectedFile] = useState(null);
  const [statementUrl, setStatementUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Review & Agreement State
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    if (setReview) {
      setReview((prev) => ({
        ...prev,
        header: "Apply For Credit",
        body: "Step-by-step credit underwriting with fast 24h approval.",
      }));
    }

    const loadProfile = async () => {
      try {
        const res = await getDocument("personal");
        if (res && res.status && res.datas) {
          setProfileData(res.datas);
        }
      } catch (err) {
        console.warn("Could not prefill profile data:", err);
      }
    };
    loadProfile();
  }, [setReview]);

  // Handle product selection & sync sensible defaults
  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    setAmount(prod.defaultAmount);
    setDuration(prod.defaultDuration);
  };

  // Financial Calculations (0.5% statutory monthly interest formula)
  const monthlyRate = 0.005; // 0.5% per month
  const totalInterest = Math.round(amount * duration * monthlyRate);
  const totalRepay = amount + totalInterest;
  const monthlyInstallment = duration > 0 ? (totalRepay / duration).toFixed(2) : 0;

  // File Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setUploadError("File size exceeds 10MB limit. Please choose a smaller file.");
        return;
      }
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await uploadFile(selectedFile);
      if (res && res.status) {
        setStatementUrl(res.downloadURL);
        return true;
      } else {
        setUploadError(res.message || "Failed to upload file to storage.");
        return false;
      }
    } catch (err) {
      setUploadError(err.message || "Upload encountered an error.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  // Final Application Submission
  const handleSubmitApplication = async () => {
    if (!agreedToTerms) {
      setSubmitError("Please confirm your acceptance of the statutory lending disclosure.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const ref = `LN-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(ref);

    const loanPayload = {
      amount: Number(amount),
      duration: Number(duration),
      repay: Number(totalRepay),
      monthlyInstallment: Number(monthlyInstallment),
      interest: Number(totalInterest),
      reason: reason + (customNote ? ` - ${customNote}` : ""),
      type: `${selectedProduct.name}`,
      imgURL: statementUrl || "",
      refId: ref,
      status: false, // in underwriting review
    };

    try {
      const res = await updateRegion("loan", loanPayload);
      if (res && res.status) {
        setCurrentStep(6); // Success screen
      } else {
        setSubmitError(res.message || "Failed to submit loan application. Please try again.");
      }
    } catch (err) {
      setSubmitError(err.message || "A network error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Steps Navigation
  const stepsList = [
    { num: 1, label: "Product" },
    { num: 2, label: "Terms & Amount" },
    { num: 3, label: "Purpose" },
    { num: 4, label: "Bank Statement" },
    { num: 5, label: "Review & Sign" },
  ];

  const progressPercent = Math.min(((currentStep - 1) / (stepsList.length - 1)) * 100, 100);

  return (
    <div className="request-wizard-container">
      {/* Page Header */}
      <div className="dash-page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="dash-page-title">New Credit Facility Application</h2>
          <p className="dash-page-subtitle">
            Configure your loan terms and receive an instant pre-approval decision in under 5 minutes.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-primary bg-opacity-10 text-primary py-2 px-3 fw-semibold">
            <FontAwesomeIcon icon={faShieldHalved} className="me-1" />
            256-Bit SSL Encrypted
          </span>
        </div>
      </div>

      {/* Stepper Header (Only shown during steps 1-5) */}
      {currentStep <= 5 && (
        <div className="wizard-stepper">
          <div className="wizard-steps-list">
            <div
              className="wizard-progress-line"
              style={{ width: `calc(${progressPercent}% * 0.9)` }}
            />
            {stepsList.map((step) => {
              const isCompleted = currentStep > step.num;
              const isActive = currentStep === step.num;
              return (
                <div
                  key={step.num}
                  className={`wizard-step-item ${isActive ? "active" : ""} ${
                    isCompleted ? "completed" : ""
                  }`}
                  onClick={() => {
                    // Allow navigating back to completed steps
                    if (step.num < currentStep) setCurrentStep(step.num);
                  }}
                >
                  <div className="wizard-step-circle">
                    {isCompleted ? <FontAwesomeIcon icon={faCheck} /> : step.num}
                  </div>
                  <span className="wizard-step-label">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: SELECT LOAN PRODUCT */}
      {currentStep === 1 && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Step 1: Choose Your Credit Facility</h3>
              <p className="text-muted small mb-0">
                Select the loan category tailored to your employment or personal finance needs.
              </p>
            </div>
            <span className="dash-badge neutral">1 of 5</span>
          </div>

          <div className="loan-product-grid">
            {LOAN_PRODUCTS.map((prod) => {
              const isSelected = selectedProduct.id === prod.id;
              return (
                <div
                  key={prod.id}
                  className={`loan-product-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectProduct(prod)}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="product-icon-wrap">
                        <FontAwesomeIcon icon={prod.icon} />
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary small">
                        {prod.badge}
                      </span>
                    </div>
                    <span className="product-type-badge">{prod.type}</span>
                    <h4 className="product-title">{prod.name}</h4>
                    <p className="product-desc">{prod.details}</p>
                  </div>

                  <div>
                    <div className="p-2 bg-light rounded-3 border small mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Interest Rate:</span>
                        <strong className="text-success">{prod.apr}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Maximum Limit:</span>
                        <strong className="text-dark">
                          <CurrencyDisplay amount={prod.maxAmount} />
                        </strong>
                      </div>
                    </div>

                    <ul className="product-feature-list">
                      {prod.features.map((feat, idx) => (
                        <li key={idx}>
                          <FontAwesomeIcon icon={faCheck} className="text-success small" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wizard-actions">
            <Link to="/dashboard" className="btn btn-outline-secondary px-4 py-2">
              Cancel
            </Link>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(2)}
            >
              <span>Continue to Terms</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: AMOUNT & TENURE CALCULATOR */}
      {currentStep === 2 && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Step 2: Loan Amount & Repayment Duration</h3>
              <p className="text-muted small mb-0">
                Adjust the interactive slider or enter your desired amount to view live repayment schedules.
              </p>
            </div>
            <span className="dash-badge neutral">2 of 5</span>
          </div>

          <div className="row g-4">
            {/* Left: Interactive Controls */}
            <div className="col-lg-7">
              {/* Amount Input & Slider */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label htmlFor="loanAmountInput" className="fw-bold text-dark mb-0">
                    Requested Principal (<CurrencyDisplay status={false} />)
                  </label>
                  <span className="badge bg-light text-secondary border">
                    Min: <CurrencyDisplay amount={selectedProduct.minAmount} /> — Max:{" "}
                    <CurrencyDisplay amount={selectedProduct.maxAmount} />
                  </span>
                </div>

                <div className="input-group input-group-lg mb-2">
                  <span className="input-group-text bg-white fw-bold text-muted">
                    <CurrencyDisplay status={false} />
                  </span>
                  <input
                    id="loanAmountInput"
                    type="number"
                    min={selectedProduct.minAmount}
                    max={selectedProduct.maxAmount}
                    step={100}
                    value={amount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setAmount(val);
                    }}
                    className="form-control fw-bold fs-4 text-primary"
                  />
                </div>

                <input
                  type="range"
                  min={selectedProduct.minAmount}
                  max={selectedProduct.maxAmount}
                  step={250}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="form-range"
                />

                {/* Preset Chips */}
                <div className="calc-preset-btns">
                  {[1000, 2500, 5000, 10000, 25000].map((preset) => {
                    if (preset > selectedProduct.maxAmount) return null;
                    return (
                      <button
                        key={preset}
                        type="button"
                        className={`calc-preset-btn ${amount === preset ? "active" : ""}`}
                        onClick={() => setAmount(preset)}
                      >
                        <CurrencyDisplay amount={preset} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration / Tenure Selector */}
              <div className="mb-4">
                <label className="fw-bold text-dark d-block mb-2">
                  Repayment Tenure (Months)
                </label>
                <div className="tenure-pill-group">
                  {[3, 6, 12, 18, 24, 36].map((months) => (
                    <div
                      key={months}
                      className={`tenure-pill ${duration === months ? "active" : ""}`}
                      onClick={() => setDuration(months)}
                    >
                      <div>{months}</div>
                      <small className="d-block text-muted" style={{ fontSize: "0.7rem" }}>
                        Months
                      </small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsible Lending Limit Notice */}
              <div className="p-3 bg-light rounded-3 border small text-muted d-flex align-items-start gap-2">
                <FontAwesomeIcon icon={faCircleInfo} className="text-primary mt-1" />
                <span>
                  Responsible Lending Policy: Borrowing limits are restricted to 200% of verifiable gross monthly income to safeguard borrower financial health.
                </span>
              </div>
            </div>

            {/* Right: Live Financial Breakdown Card */}
            <div className="col-lg-5">
              <div className="loan-breakdown-card">
                <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-2 py-1 small">
                  Live Quotation
                </span>
                <h4 className="fw-bold text-dark mb-3">Repayment Summary</h4>

                <div className="breakdown-row">
                  <span className="text-muted">Selected Facility</span>
                  <strong className="text-dark small text-end">{selectedProduct.name}</strong>
                </div>

                <div className="breakdown-row">
                  <span className="text-muted">Principal Amount</span>
                  <strong className="text-dark">
                    <CurrencyDisplay amount={amount} />
                  </strong>
                </div>

                <div className="breakdown-row">
                  <span className="text-muted">Loan Tenure</span>
                  <strong className="text-dark">{duration} Months</strong>
                </div>

                <div className="breakdown-row">
                  <span className="text-muted">Monthly Interest</span>
                  <strong className="text-success">0.5% / month</strong>
                </div>

                <div className="breakdown-row">
                  <span className="text-muted">Total Interest</span>
                  <strong className="text-primary">
                    <CurrencyDisplay amount={totalInterest} />
                  </strong>
                </div>

                <div className="breakdown-row total-row">
                  <div>
                    <span className="text-muted d-block small">Estimated Monthly Payment</span>
                    <h3 className="fw-bold text-primary mb-0">
                      <CurrencyDisplay amount={Number(monthlyInstallment)} />
                      <span className="fs-6 text-muted fw-normal"> / mo</span>
                    </h3>
                  </div>
                </div>

                <div className="p-2 bg-white rounded-3 border text-center mt-3">
                  <span className="text-muted small d-block">Total Repayment Obligation:</span>
                  <h5 className="fw-bold text-dark mb-0">
                    <CurrencyDisplay amount={totalRepay} />
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="wizard-actions">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(3)}
            >
              <span>Continue to Purpose</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PURPOSE & IDENTITY VERIFICATION */}
      {currentStep === 3 && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Step 3: Loan Purpose & Identity Check</h3>
              <p className="text-muted small mb-0">
                Specify the primary purpose of the funds and verify your borrower profile details.
              </p>
            </div>
            <span className="dash-badge neutral">3 of 5</span>
          </div>

          {/* Purpose Cards Grid */}
          <div className="mb-4">
            <label className="fw-bold text-dark d-block mb-2">
              Select Primary Purpose for Funds
            </label>
            <div className="purpose-grid">
              {LOAN_PURPOSES.map((purp) => {
                const isSelected = reason === purp.id;
                return (
                  <div
                    key={purp.id}
                    className={`purpose-card ${isSelected ? "selected" : ""}`}
                    onClick={() => setReason(purp.id)}
                  >
                    <div className="purpose-card-icon">
                      <FontAwesomeIcon icon={purp.icon} />
                    </div>
                    <span>{purp.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Notes */}
          <div className="mb-4">
            <label htmlFor="customNoteInput" className="fw-semibold small text-dark mb-1">
              Additional Details or Remarks (Optional)
            </label>
            <textarea
              id="customNoteInput"
              rows={2}
              className="form-control"
              placeholder="e.g. Consolidating credit card balance, tuition fee invoice reference..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
            />
          </div>

          {/* Verified Profile Snapshot */}
          <div className="p-3 bg-light rounded-3 border mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
                <span>Verified Borrower Identity Snapshot</span>
              </h6>
              <Link to="/dashboard/profile" className="small fw-semibold text-primary text-decoration-none">
                Edit Profile
              </Link>
            </div>
            <div className="row g-2 small text-muted">
              <div className="col-sm-6">
                <strong>Borrower Name:</strong> {profileData.fullName || "Registered Borrower"}
              </div>
              <div className="col-sm-6">
                <strong>Email Address:</strong> {profileData.email || "On File"}
              </div>
              <div className="col-sm-6">
                <strong>Phone Number:</strong> {profileData.phone || "On File"}
              </div>
              <div className="col-sm-6">
                <strong>Nationality:</strong> {profileData.nationality || "Verified"}
              </div>
            </div>
          </div>

          <div className="wizard-actions">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(2)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(4)}
            >
              <span>Continue to Statement</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SUPPORTING BANK STATEMENT */}
      {currentStep === 4 && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Step 4: Bank Statement or Proof of Income</h3>
              <p className="text-muted small mb-0">
                Attach a recent 3 to 6-month bank statement (PDF, PNG, JPG) to expedite underwriting approval.
              </p>
            </div>
            <span className="dash-badge neutral">4 of 5</span>
          </div>

          {/* Upload Dropzone */}
          <div
            className="dropzone-box mb-3"
            onClick={() => document.getElementById("fileUploadInput").click()}
          >
            <input
              id="fileUploadInput"
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg"
              className="d-none"
              onChange={handleFileChange}
            />

            <div className="dropzone-icon">
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </div>

            <h5 className="fw-bold text-dark mb-1">
              {selectedFile ? selectedFile.name : "Click to select or drag & drop statement"}
            </h5>
            <p className="text-muted small mb-2">
              Supported formats: PDF, PNG, JPG (Max file size: 10MB)
            </p>

            {selectedFile && (
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-white border rounded-pill shadow-sm small text-success fw-semibold">
                <FontAwesomeIcon icon={faCheck} />
                <span>
                  Ready to upload ({(selectedFile.size / 1024).toFixed(0)} KB)
                </span>
              </div>
            )}
          </div>

          {statementUrl && (
            <div className="p-3 bg-success bg-opacity-10 text-success rounded-3 border border-success d-flex align-items-center gap-2 mb-3 small">
              <FontAwesomeIcon icon={faCircleCheck} />
              <span>
                Document successfully encrypted and uploaded to secure storage!
              </span>
            </div>
          )}

          {uploadError && (
            <Alert variant="danger" className="py-2 small">
              {uploadError}
            </Alert>
          )}

          <div className="p-3 bg-light rounded-3 border small text-muted mb-4 d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faShieldHalved} className="text-primary" />
            <span>
              All financial documentation is protected with 256-bit banking encryption and processed exclusively for credit risk analysis.
            </span>
          </div>

          <div className="wizard-actions">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(3)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={isUploading}
              className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={async () => {
                if (selectedFile && !statementUrl) {
                  const uploaded = await handleUploadFile();
                  if (uploaded) setCurrentStep(5);
                } else {
                  setCurrentStep(5);
                }
              }}
            >
              {isUploading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Encrypting & Uploading...</span>
                </>
              ) : (
                <>
                  <span>Continue to Review</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW APPLICATION & STATUTORY CONSENT */}
      {currentStep === 5 && (
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h3 className="dash-card-title">Step 5: Review Terms & Statutory Consent</h3>
              <p className="text-muted small mb-0">
                Confirm your credit parameters and complete the digital lending disclosure before submission.
              </p>
            </div>
            <span className="dash-badge neutral">5 of 5</span>
          </div>

          {/* Breakdown Table */}
          <div className="p-3 bg-light rounded-3 border mb-4">
            <h5 className="fw-bold text-dark mb-3">Facility Parameters</h5>
            <div className="row g-3 small">
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Facility Name</span>
                <strong className="text-dark">{selectedProduct.name}</strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Requested Principal</span>
                <strong className="text-dark fs-6">
                  <CurrencyDisplay amount={amount} />
                </strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Tenure</span>
                <strong className="text-dark fs-6">{duration} Months</strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Monthly Repayment</span>
                <strong className="text-primary fs-6">
                  <CurrencyDisplay amount={Number(monthlyInstallment)} /> / mo
                </strong>
              </div>

              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Statutory Interest</span>
                <strong className="text-success">
                  <CurrencyDisplay amount={totalInterest} /> (0.5%/mo)
                </strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Total Obligation</span>
                <strong className="text-dark fs-6">
                  <CurrencyDisplay amount={totalRepay} />
                </strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Primary Purpose</span>
                <strong className="text-dark">{reason}</strong>
              </div>
              <div className="col-sm-6 col-md-3">
                <span className="text-muted d-block mb-1">Attached Statement</span>
                <span className="badge bg-success bg-opacity-10 text-success">
                  {statementUrl || selectedFile ? "Document Attached" : "Profile Record"}
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Disclosure Box */}
          <div className="disclosure-box mb-3">
            <strong>Lending Consent and Statutory Agreement</strong>
            <p className="mt-2 mb-0">
              By ticking the consent box below, I authorize LoanSwift Limited to verify my identity, employment status, and banking history through accredited credit bureaus and payment clearing systems. I acknowledge that the credit facility requested is subject to underwriting validation under consumer credit regulations. I confirm that all submitted statements are authentic and accurate, and I authorize automatic direct debit for scheduled monthly repayments upon disbursement.
            </p>
          </div>

          {/* Digital Signature Checkbox */}
          <div className="form-check p-3 bg-white rounded-3 border mb-3">
            <input
              id="consentAgreementCheckbox"
              type="checkbox"
              className="form-check-input ms-0 me-3"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <label
              htmlFor="consentAgreementCheckbox"
              className="form-check-label fw-semibold text-dark"
              style={{ cursor: "pointer" }}
            >
              I have verified the loan terms, interest calculations, and agree to the statutory lending disclosure.
            </label>
          </div>

          {submitError && (
            <Alert variant="danger" className="py-2 small mb-3">
              {submitError}
            </Alert>
          )}

          <div className="wizard-actions">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2 d-flex align-items-center gap-2"
              onClick={() => setCurrentStep(4)}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </button>

            <button
              type="button"
              disabled={!agreedToTerms || isSubmitting}
              className="btn btn-primary px-5 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={handleSubmitApplication}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Submitting to Underwriting...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faFileLines} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUBMISSION SUCCESS SCREEN */}
      {currentStep === 6 && (
        <div className="dash-card">
          <div className="loan-success-card">
            <div className="loan-success-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>

            <h3 className="fw-bold text-dark mb-2">Application Successfully Submitted!</h3>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: "520px" }}>
              Your credit application has been transmitted to our underwriting team. Automated risk assessment is now in progress.
            </p>

            <div className="p-3 bg-light rounded-3 border d-inline-block text-start mb-4" style={{ minWidth: "320px" }}>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Application Reference:</span>
                <span className="font-monospace fw-bold text-primary">#{referenceId}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Requested Facility:</span>
                <strong className="text-dark small">{selectedProduct.name}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Principal Amount:</span>
                <strong className="text-dark">
                  <CurrencyDisplay amount={amount} />
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Monthly Repayment:</span>
                <strong className="text-primary">
                  <CurrencyDisplay amount={Number(monthlyInstallment)} /> / mo
                </strong>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Current Status:</span>
                <span className="dash-badge pending">
                  <FontAwesomeIcon icon={faClock} /> In Underwriting Review
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-primary fw-semibold px-4 py-2"
                onClick={() => navigate("/dashboard/summary")}
              >
                <span>View Applications Summary</span>
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold px-4 py-2"
                onClick={() => navigate("/dashboard")}
              >
                Return to Overview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
