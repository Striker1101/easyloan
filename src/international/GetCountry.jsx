let global = {
  country_name: "",
  city: "",
  country_code: "",
};

try {
  const response = await fetch("https://ipapi.co/json/");
  global = await response.json();
} catch (error) {}

export default function getCountry() {
  return global.country_name;
}

export function getState() {
  return global.city;
}

export function getCompany() {
  if (global.country_code === "AE") {
    return "Personal Loans Dubai/UAE LLC";
  } else if (global.country_code === "CA") {
    return "Transcanada Credit Union LTD";
  } else if (global.country_code === "NG") {
    return "Casafina Credit Limited";
  } else if (global.country_code === "Uk") {
    return "Capital Credit Union Limited";
  } else {
    return "Global Credit Union";
  }
}
