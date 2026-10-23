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
  const data = getCurrencyData();
  const code = (data.countryCode || "").toUpperCase();

  if (code === "AE") {
    return "Personal Loans Dubai/UAE LLC";
  } else if (code === "CA") {
    return "Transcanada Credit Union LTD";
  } else if (code === "NG") {
    return "Casafina Credit Limited";
  } else if (code === "GB" || code === "UK") {
    return "Capital Credit Union Limited";
  } else {
    return "Global Credit Union LLC";
  }
}
