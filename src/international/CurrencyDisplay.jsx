import React from "react";
import { useTranslation } from "react-i18next";

function CurrencyDisplay({ amount }) {
  const { i18n } = useTranslation();

  let currencySymbol;
  switch (i18n.language) {
    case "en":
      currencySymbol = "$";
      break;
    case "fr":
      currencySymbol = "€";
      break;
    // Add cases for other languages if needed
    default:
      currencySymbol = "$"; // Default to dollar sign for unsupported languages
      break;
  }

  return (
    <div>
      <span className="text-black fw-bold "> {currencySymbol}</span>{" "}
      {amount.toFixed(2)}
    </div>
  );
}

export default CurrencyDisplay;
