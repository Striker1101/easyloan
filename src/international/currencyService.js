// Centralized Currency & Country Service
// Default currency is USD ($). If user currency is detected (via IP, timezone, or locale),
// it updates throughout the application. If not available, it safely falls back to USD.

const DEFAULT_CURRENCY = {
  code: "USD",
  symbol: "$",
  country: "United States",
  countryCode: "US",
  city: "New York",
};

const COUNTRY_DATA = {
  NG: { code: "NGN", symbol: "₦", country: "Nigeria", city: "Lagos" },
  US: { code: "USD", symbol: "$", country: "United States", city: "New York" },
  GB: { code: "GBP", symbol: "£", country: "United Kingdom", city: "London" },
  CA: { code: "CAD", symbol: "CA$", country: "Canada", city: "Toronto" },
  AU: { code: "AUD", symbol: "A$", country: "Australia", city: "Sydney" },
  GH: { code: "GHS", symbol: "GH₵", country: "Ghana", city: "Accra" },
  KE: { code: "KES", symbol: "KSh", country: "Kenya", city: "Nairobi" },
  ZA: { code: "ZAR", symbol: "R", country: "South Africa", city: "Johannesburg" },
  AE: { code: "AED", symbol: "AED", country: "United Arab Emirates", city: "Dubai" },
  IN: { code: "INR", symbol: "₹", country: "India", city: "Mumbai" },
  JP: { code: "JPY", symbol: "¥", country: "Japan", city: "Tokyo" },
  DE: { code: "EUR", symbol: "€", country: "Germany", city: "Berlin" },
  FR: { code: "EUR", symbol: "€", country: "France", city: "Paris" },
  IT: { code: "EUR", symbol: "€", country: "Italy", city: "Rome" },
  ES: { code: "EUR", symbol: "€", country: "Spain", city: "Madrid" },
  NL: { code: "EUR", symbol: "€", country: "Netherlands", city: "Amsterdam" },
  IE: { code: "EUR", symbol: "€", country: "Ireland", city: "Dublin" },
  NZ: { code: "NZD", symbol: "NZ$", country: "New Zealand", city: "Auckland" },
  RW: { code: "RWF", symbol: "FRw", country: "Rwanda", city: "Kigali" },
  UG: { code: "UGX", symbol: "USh", country: "Uganda", city: "Kampala" },
  TZ: { code: "TZS", symbol: "TSh", country: "Tanzania", city: "Dar es Salaam" },
  EG: { code: "EGP", symbol: "E£", country: "Egypt", city: "Cairo" },
  BR: { code: "BRL", symbol: "R$", country: "Brazil", city: "São Paulo" },
  MX: { code: "MXN", symbol: "Mex$", country: "Mexico", city: "Mexico City" },
  SG: { code: "SGD", symbol: "S$", country: "Singapore", city: "Singapore" },
  MY: { code: "MYR", symbol: "RM", country: "Malaysia", city: "Kuala Lumpur" },
  PH: { code: "PHP", symbol: "₱", country: "Philippines", city: "Manila" },
};

function getFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Lagos")) return { ...COUNTRY_DATA.NG, countryCode: "NG" };
    if (tz.includes("Accra")) return { ...COUNTRY_DATA.GH, countryCode: "GH" };
    if (tz.includes("Nairobi")) return { ...COUNTRY_DATA.KE, countryCode: "KE" };
    if (tz.includes("Johannesburg")) return { ...COUNTRY_DATA.ZA, countryCode: "ZA" };
    if (tz.includes("London")) return { ...COUNTRY_DATA.GB, countryCode: "GB" };
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || tz.includes("Edmonton")) return { ...COUNTRY_DATA.CA, countryCode: "CA" };
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane") || tz.includes("Perth")) return { ...COUNTRY_DATA.AU, countryCode: "AU" };
    if (tz.includes("Dubai")) return { ...COUNTRY_DATA.AE, countryCode: "AE" };
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return { ...COUNTRY_DATA.IN, countryCode: "IN" };
    if (tz.includes("Tokyo")) return { ...COUNTRY_DATA.JP, countryCode: "JP" };
    if (tz.includes("Paris") || tz.includes("Berlin") || tz.includes("Rome") || tz.includes("Madrid") || tz.includes("Amsterdam")) return { ...COUNTRY_DATA.FR, countryCode: "FR" };
    if (tz.startsWith("America/New_York") || tz.startsWith("America/Chicago") || tz.startsWith("America/Los_Angeles") || tz.startsWith("America/Denver") || tz.startsWith("America/Phoenix")) return { ...COUNTRY_DATA.US, countryCode: "US" };
  } catch (e) {}
  return null;
}

let currentCurrency = null;
const listeners = new Set();
let fetchPromise = null;

export function getCurrencyData() {
  if (currentCurrency) return currentCurrency;

  // 1. Try reading from sessionStorage
  try {
    const saved = sessionStorage.getItem("app_currency_info");
    if (saved) {
      currentCurrency = JSON.parse(saved);
      return currentCurrency;
    }
  } catch (e) {}

  // 2. Synchronous initial guess based on client timezone
  const tzGuess = getFromTimezone();
  if (tzGuess) {
    currentCurrency = tzGuess;
    return currentCurrency;
  }

  // 3. Default to USD
  currentCurrency = { ...DEFAULT_CURRENCY };
  return currentCurrency;
}

export function subscribeCurrency(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners(data) {
  listeners.forEach((fn) => {
    try {
      fn(data);
    } catch (e) {
      console.error(e);
    }
  });
}

export async function detectUserCurrency() {
  // If already fetched in this session, return cached
  try {
    const saved = sessionStorage.getItem("app_currency_info");
    if (saved) {
      currentCurrency = JSON.parse(saved);
      notifyListeners(currentCurrency);
      return currentCurrency;
    }
  } catch (e) {}

  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    let detected = null;

    // 1. Try ipwho.is (CORS open, fast, accurate, includes country_code)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch("https://ipwho.is/", { signal: controller.signal });
      clearTimeout(timer);

      if (res.ok) {
        const data = await res.json();
        if (data && data.success !== false && data.country_code) {
          const cc = data.country_code.toUpperCase();
          const base = COUNTRY_DATA[cc] || {};
          detected = {
            code: base.code || (data.currency ? data.currency.code : "USD") || "USD",
            symbol: base.symbol || (data.currency ? data.currency.symbol : "$") || "$",
            country: data.country || base.country || "United States",
            countryCode: cc,
            city: data.city || base.city || "",
          };
        }
      }
    } catch (err) {}

    // 2. Try api.country.is fallback
    if (!detected) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2000);
        const res = await fetch("https://api.country.is/", { signal: controller.signal });
        clearTimeout(timer);

        if (res.ok) {
          const data = await res.json();
          if (data && data.country) {
            const cc = data.country.toUpperCase();
            const base = COUNTRY_DATA[cc] || {};
            detected = {
              code: base.code || "USD",
              symbol: base.symbol || "$",
              country: base.country || "United States",
              countryCode: cc,
              city: base.city || "",
            };
          }
        }
      } catch (err) {}
    }

    // 3. Fallback to timezone
    if (!detected) {
      const tzGuess = getFromTimezone();
      if (tzGuess) {
        detected = tzGuess;
      }
    }

    // 4. Final fallback: default to USD ($)
    if (!detected || !detected.code) {
      detected = { ...DEFAULT_CURRENCY };
    }

    currentCurrency = detected;
    try {
      sessionStorage.setItem("app_currency_info", JSON.stringify(detected));
    } catch (e) {}

    notifyListeners(currentCurrency);
    return currentCurrency;
  })();

  return fetchPromise;
}

export function getSymbol(currencyCode) {
  if (!currencyCode) return "$";
  const code = currencyCode.toUpperCase();
  for (const item of Object.values(COUNTRY_DATA)) {
    if (item.code === code) return item.symbol;
  }
  return currencyCode;
}

export function formatCurrencyValue(amount) {
  const num = typeof amount === "number" ? amount : parseFloat(amount) || 0;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
