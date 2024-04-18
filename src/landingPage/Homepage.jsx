/**
 * add project twitter image on helmet
 */

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
import Intro from "../Components/LandingPages/HomepageLanding/Intro";
import CustomerCareButton from "../Components/LandingPages/CustomerCareButton";
import { Container } from "react-bootstrap";
export default function Homepage({ setOnDash, setNavColor }) {
  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(true);
  const title = process.env.REACT_APP_NAME || "Default Title"; // Use the value from .env or a default value

  return (
    <div>
      <Helmet>
        <title>{title} Homepage</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:title" content="Homepage" />
        <meta name="title" content="Homepage" />
        <meta
          name="twitter:description"
          content="Join us and enjoy free and active loan "
        />
        <meta
          name="twitter:image"
          content="URL to your page's featured image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add more metadata tags as needed */}
      </Helmet>
      <Intro />
      <Calculate />
      <Info />
      <Loan />
      <AddFeatures />
      <Apply></Apply>
      <Advert></Advert>
      <Reviews />
      <Container>
        <CustomerCareButton />
      </Container>
    </div>
  );
}
