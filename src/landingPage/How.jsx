import React from "react";
import { Helmet } from "react-helmet";
import IndexHow from "../Components/LandingPages/How/IndexHow";
import "../Components/Styles/Landing/How.css";
import { Container } from "react-bootstrap";
export default function How({ setNavColor, setOnDash }) {
  const title = process.env.REACT_APP_NAME || "Default Title"; // Use the value from .env or a default value
  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(false);

  return (
    <div className="howHolder">
      <Helmet>
        <title>{title} How to use our platform</title>
        <meta
          name="description"
          content="we tell you how to register and get laon with ease and quickly "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:title" content="How to use the platform" />
        <meta
          name="twitter:description"
          content="learn how to use our platform  "
        />
        <meta
          name="twitter:image"
          content="URL to your page's featured image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add more metadata tags as needed */}
      </Helmet>
      <Container>
        <IndexHow />
      </Container>
    </div>
  );
}
