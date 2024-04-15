import React, { useState, useEffect } from "react";

const CurrencyDisplay = ({ amount, status = true }) => {
  const [userCurrency, setUserCurrency] = useState("");

  useEffect(() => {
    // Function to fetch user's country based on IP address
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        // const countryCode = data.country_code;
        // setUserCurrency(getCurrencySymbol(countryCode));
        setUserCurrency(data.currency);
      } catch (error) {
        console.error("Error fetching user country:", error);
        // Set a default currency in case of failure
        setUserCurrency("USD"); // Default to USD
      }
    };

    // Function to get currency symbol based on country code
    const getCurrencySymbol = (countryCode) => {
      // Hard-coded mapping for countries with non-standard currency codes
      const countryCurrencyMap = {
        NG: "NGN", // Nigeria
        CA: "CAD", // Canada
        AE: "AED", // United Arab Emirates (Dubai)
        US: "USD", // United States
        GB: "GBP", // United Kingdom
        AU: "AUD", // Australia
        IN: "INR", // India
        JP: "JPY", // Japan
        CN: "CNY", // China
        KR: "KRW", // South Korea
        DE: "EUR", // Germany
        FR: "EUR", // France
        IT: "EUR", // Italy
        ES: "EUR", // Spain
        RU: "RUB", // Russia
        BR: "BRL", // Brazil
        MX: "MXN", // Mexico
        AR: "ARS", // Argentina
        ZA: "ZAR", // South Africa
        NZ: "NZD", // New Zealand
        CH: "CHF", // Switzerland
        SE: "SEK", // Sweden
        NO: "NOK", // Norway
        DK: "DKK", // Denmark
        SG: "SGD", // Singapore
        HK: "HKD", // Hong Kong
        TW: "TWD", // Taiwan
        TH: "THB", // Thailand
        ID: "IDR", // Indonesia
        MY: "MYR", // Malaysia
        PH: "PHP", // Philippines
        VN: "VND", // Vietnam
        // Add more mappings as needed
      };

      // Check if the country has a non-standard currency code
      if (countryCurrencyMap[countryCode]) {
        return countryCurrencyMap[countryCode];
      }

      // For countries with standard currency codes, use Intl.NumberFormat
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: countryCode,
      }).formatToParts()[0].value;
    };

    // Fetch user's country when component mounts
    fetchUserCountry();
  }, []);
  return (
    <>
      {status ? (
        <div>
          <span className="text-black fw-bold "> {userCurrency}</span>{" "}
          {amount.toFixed(2)}
        </div>
      ) : (
        <span className="text-black fw-bold "> {userCurrency}</span>
      )}
    </>
  );
};

export default CurrencyDisplay;
