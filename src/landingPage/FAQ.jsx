import React from "react";
import { Helmet } from "react-helmet";
import IndexFAQ from "../Components/LandingPages/FAQ/IndexFAQ";
import "../Components/Styles/Landing/FAQ.css";

export default function FAQ() {
  const title = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <div className="page-header-offset">
      <Helmet>
        <title>{title} — Frequently Asked Questions</title>
        <meta
          name="description"
          content="Find instant answers about loan requirements, eligibility, rates, and repayments."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <IndexFAQ />
    </div>
  );
}
