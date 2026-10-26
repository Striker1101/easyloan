import { getCurrencyData, detectUserCurrency } from "./currencyService";

// Kick off detection in the background
detectUserCurrency();

export default function getCountry() {
  const data = getCurrencyData();
  return data.country || "United States";
}

export function getState() {
  const data = getCurrencyData();
  return data.city || "New York";
}

export function getCompany() {
  return process.env.REACT_APP_COMPANY || "Global Credit Union LLC";
}
