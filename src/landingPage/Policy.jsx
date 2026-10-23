import React from "react";
import { Helmet } from "react-helmet";
import IndexPolicy from "../Components/LandingPages/Policy/Policy.jsx";

export default function Policy() {
  const title = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <div className="page-header-offset">
      <Helmet>
        <title>{title} — Privacy Policy & Terms</title>
        <meta name="description" content="Privacy Policy, Data Security and Terms of Service." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <IndexPolicy />
    </div>
  );
}
