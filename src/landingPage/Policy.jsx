import React from "react";
import { Helmet } from "react-helmet";
import IndexPolicy from "../Components/LandingPages/Policy/Policy.jsx";
export default function How({ setNavColor }) {
  const title = process.env.REACT_APP_NAME || "Default Title"; // Use the value from .env or a default value
  setNavColor(false);
  return (
    <div>
      <Helmet>
        <title>{title} Policy and Terms </title>
        <meta name="description" content="terms and policy" />
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

      <IndexPolicy />
    </div>
  );
}
