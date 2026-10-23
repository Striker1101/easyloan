import React from "react";
import { Helmet } from "react-helmet";
import Calculate from "../Components/LandingPages/HomepageLanding/Calculate";
import Info from "../Components/LandingPages/HomepageLanding/Info";
import Loan from "../Components/LandingPages/HomepageLanding/Loan";
import AddFeatures from "../Components/LandingPages/HomepageLanding/AddFeatures";
import Apply from "../Components/LandingPages/HomepageLanding/Apply";
import "../Components/Styles/Landing/Homepage.css";
import Reviews from "../Components/LandingPages/HomepageLanding/Reviews";
import Advert from "../Components/LandingPages/HomepageLanding/Advert";
import CustomerCareButton from "../Components/LandingPages/CustomerCareButton";
import { Container } from "react-bootstrap";

export default function Homepage() {
  const title = process.env.REACT_APP_NAME || "Loan Swift";

  return (
    <div className="homepage-wrapper">
      <Helmet>
        <title>{title} — Smart & Flexible Fast Loans</title>
        <meta
          name="description"
          content="Calculate your loan repayment, get instant approval, and flexible financing with no hidden fees."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Calculate />
      <Loan />
      <Info />
      <AddFeatures />
      <Apply />
      <Advert />
      <Reviews />
      <Container className="py-4 text-center">
        <CustomerCareButton />
      </Container>
    </div>
  );
}
