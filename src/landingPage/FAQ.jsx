import React from "react";
import { Helmet } from "react-helmet";
import IndexFAQ from "../Components/LandingPages/FAQ/IndexFAQ";
import "../Components/Styles/Landing/FAQ.css";

export default function FAQ({ setNavColor, setOnDash }) {
  const title = process.env.REACT_APP_NAME || "Default Title"; // Use the value from .env or a default value
  //set pros for on dash board and landing nav color
  setOnDash(false);
  setNavColor(false);
  return (
    <div>
      <Helmet>
        <title>{title} FAQ</title>
        <meta
          name="description"
          content="get in here and get your questions answers "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:title" content="Questions and Answers " />
        <meta
          name="twitter:description"
          content="get your questions answered here  "
        />
        <meta
          name="twitter:image"
          content="URL to your page's featured image"
        />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Add more metadata tags as needed */}
      </Helmet>

      <IndexFAQ />
    </div>
  );
}
