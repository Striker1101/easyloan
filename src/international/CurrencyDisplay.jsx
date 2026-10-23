import React, { useState, useEffect } from "react";
import {
  getCurrencyData,
  subscribeCurrency,
  detectUserCurrency,
  formatCurrencyValue,
} from "./currencyService";

const CurrencyDisplay = ({ amount = 0, status = true, className = "", useSymbol = false }) => {
  const [curr, setCurr] = useState(() => getCurrencyData());

  useEffect(() => {
    // Subscribe to currency updates
    const unsubscribe = subscribeCurrency((newCurr) => {
      setCurr(newCurr);
    });

    // Initiate single background detection
    detectUserCurrency();

    return () => unsubscribe();
  }, []);

  const label = useSymbol ? curr.symbol : curr.code;

  if (!status) {
    return <span className={`currency-code fw-bold ${className}`}>{label}</span>;
  }

  return (
    <span className={`currency-display d-inline-flex align-items-center gap-1 ${className}`}>
      <span className="currency-code fw-bold">{label}</span>
      <span className="currency-amount">{formatCurrencyValue(amount)}</span>
    </span>
  );
};

export default CurrencyDisplay;
