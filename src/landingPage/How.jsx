import React from "react";
import { Helmet } from "react-helmet";
import IndexHow from "../Components/LandingPages/How/IndexHow";
import "../Components/Styles/Landing/How.css";
import { Container } from "react-bootstrap";
import CustomerCareButton from "../Components/LandingPages/CustomerCareButton";

export default function How() {
  const title = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <div className="howHolder page-header-offset">
      <Helmet>
        <title>{title} — How It Works</title>
        <meta
          name="description"
          content="Learn how easy it is to apply, get verified, and receive your loan in 24 hours."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <IndexHow />
      <Container className="py-4 text-center">
        <CustomerCareButton />
      </Container>
    </div>
  );
}
