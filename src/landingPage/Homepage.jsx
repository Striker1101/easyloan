/**
 * add project twitter image on helmet
 */

import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Calculate from "../Components/HomepageLanding/Calculate";
export default function Homepage() {
  const title = process.env.REACT_APP_NAME || "Default Title"; // Use the value from .env or a default value
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{title} Homepage</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="twitter:title" content="Homepage" />
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
      <Calculate />
    </div>
  );
}
