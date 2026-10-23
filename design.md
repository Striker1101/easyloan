# LoanSwift / EasyLoan — Design System & UI Architecture Specification (`design.md`)

## 1. Executive Summary & Vision

**LoanSwift** (formerly EasyLoan) is a digital lending and financial wellness platform delivering transparent, rapid-decision personal and small business credit solutions. 

The goal of this design system is to transition the platform from an early prototype into a **tier-1 consumer fintech application**—matching the aesthetic polish, responsiveness, and trust indicators of leaders like Stripe, Revolut, Monzo, and Mercury.

---

## 2. Core Design Principles

1. **Radical Financial Transparency**:
   - Zero ambiguous numbers. Every borrower sees loan principal, transparent interest rates (0.5%/mo), total repayment, and exact monthly installments before submitting.
   - Consistent currency presentation across every single component on every page.
2. **Frictionless Onboarding**:
   - Distinct, welcoming entry points for first-time applicants vs. returning borrowers.
   - Lightweight digital forms with inline validation and progressive disclosure.
3. **Fluid Responsiveness**:
   - 100% responsive across mobile (< 640px), tablet (640px – 1024px), and desktop (> 1024px).
   - No rigid heights (`100vh`, `140vh`) or fixed minimum widths that cause horizontal viewport overflow.
4. **Trust & Security Signalling**:
   - Glassmorphic surfaces, crisp typography, clean micro-interactions, and clear regulatory disclosures reassure users that their financial data is protected.

---

## 3. Design Tokens & Visual Hierarchy

### 3.1 Color Palette
```css
:root {
  /* Brand Primaries */
  --color-primary: #2563eb;          /* Electric Blue (CTA & Interactive) */
  --color-primary-hover: #1d4ed8;    /* Deep Blue Hover */
  --color-primary-light: #eff6ff;    /* Subtle Blue Tint (Chips/Badges) */

  /* Neutral Dark / Slate Foundations */
  --color-slate-900: #0b1329;        /* Deep Hero & Footer Slate */
  --color-slate-800: #0f172a;        /* Card dark backgrounds */
  --color-slate-700: #1e293b;        /* Calculator & Card Surfaces */
  --color-slate-600: #334155;        /* Subtitle / Muted Slate */
  --color-slate-400: #94a3b8;        /* Placeholder / Subtle Text */

  /* Surface & Background Neutrals */
  --color-bg-body: #f8fafc;          /* Canvas Light Background */
  --color-surface-white: #ffffff;    /* Card & Modal Surface */
  --color-border-subtle: #e2e8f0;    /* Card & Input Outlines */
  --color-border-hover: #cbd5e1;     /* Interactive Hover Borders */

  /* Functional Status Accents */
  --color-success: #10b981;          /* Emerald Green (Approved / Installment) */
  --color-success-light: #ecfdf5;    /* Green Badge Background */
  --color-info: #06b6d4;             /* Cyan (Highlights / Counters) */
  --color-warning: #f59e0b;          /* Amber Warning */
  --color-danger: #ef4444;           /* Crimson Error / Missing */
}
```

### 3.2 Typography
- **Primary Body Font**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
  - High legibility for financial figures, table metrics, and descriptive prose.
- **Display & Headings Font**: `'Plus Jakarta Sans', 'Inter', sans-serif`
  - Modern geometric structure with tight tracking for hero titles and marketing statements.
- **Scale**:
  - `Hero Display`: `2.75rem` - `3.5rem` (Font weight 800)
  - `Section Title`: `1.75rem` - `2.25rem` (Font weight 700)
  - `Card Header`: `1.25rem` - `1.5rem` (Font weight 600)
  - `Body Standard`: `1.0rem` (Line height 1.6)
  - `Caption / Footnote`: `0.8rem` - `0.85rem` (Line height 1.45)

### 3.3 Elevation & Shadows
- **Card Ambient**: `0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0, 0, 0, 0.04)`
- **Interactive Elevated**: `0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`
- **Modal Glass Backdrop**: `backdrop-filter: blur(8px); background-color: rgba(15, 23, 42, 0.65)`

---

## 4. Key Component Patterns

### 4.1 Interactive Loan Calculator (`Calculate.jsx`)
- **Range Controls**: Smooth HTML5 slider tracks with gradient progress fills and tactile thumb handles.
- **Real-Time Metric Quad-Grid**:
  1. **Loan Principal**: User-selected principal.
  2. **Total Interest**: Calculated accurately at 0.5% monthly rate.
  3. **Total Repayment**: Clear sum of Principal + Interest.
  4. **Monthly Installment**: Prominently emphasized with a green border and background tint.
- **Representative APR Disclosure**: Underneath the action button, a clear statutory example spells out terms in plain language.
- **Action**: Opens the unified **Apply Flow Modal**.

### 4.2 Unified Apply Flow Modal (`ApplyModal.jsx`)
- **Visual Split**: 2-column card architecture on tablet/desktop, cleanly stacked on mobile phones.
- **New Customer Card**:
  - Highlights instant pre-qualification, zero impact on credit scores, and same-day bank transfer.
  - Directs to `/signup` with a high-contrast Primary button.
- **Existing Customer Card**:
  - Highlights 1-click expedited approval, active loan tracking, and account management.
  - Directs to `/signin` with a crisp Outline button.
- **Regulatory Banner**:
  - Replaces legacy drab gray block with an integrated trust-badged notice explaining the 200% monthly gross income borrowing limit.

### 4.3 Navigation & Footers
- **Sticky Navbar (`NavLanding.jsx`)**:
  - Glassmorphic translucency on scroll (`backdrop-filter: blur(12px)`).
  - Clean language switcher (`English` / `Français`).
  - Active route indicator chips.
- **Dark Slate Footer (`FooterLanding.jsx`)**:
  - 4-column structured layout: Brand & Mission, Quick Links, Legal & Compliance, and Contact Channels.
  - Dynamic copyright year.

### 4.4 Dashboard Experience (`/dashboard`)
- **Sidebar & Header**: Real-time user greeting, session sign-out, and responsive collapse.
- **Summary & Active Loans**:
  - Responsive tables wrapped in scroll containers.
  - Off-canvas detail modal showing full application breakdown (amount, duration, repayment, verification status).
  - Empty state vectors (`nothing.svg`) with clear call-to-actions ("Request a new Loan").

---

## 5. Currency & Internationalization Framework

- **Centralized Service (`currencyService.js`)**:
  - **Base Currency**: US Dollar (`USD` / `$`).
  - **User Currency Detection**:
    1. Checks `sessionStorage` for existing session preferences.
    2. Synchronously inspects browser timezone (e.g. `Africa/Lagos` -> `NGN`, `Europe/London` -> `GBP`, etc.) for zero-delay initial rendering.
    3. Runs background verification against reliable geolocation APIs (`ipwho.is` and `api.country.is`).
    4. Seamlessly falls back to USD if detection is unavailable or fails.
  - **Universal Consistency**: Single Pub/Sub listener ensures every component on the page displays identical currency codes and symbols simultaneously.

---

## 6. Firebase & React State Architecture

- **Auth Lifecycle Management**:
  - Subscribes directly to `firebase.auth().onAuthStateChanged` in `App.js`.
  - Maintains `authLoading` state so page refreshes never prematurely bounce authenticated users to `/signin`.
  - `Protected.js` renders a clean branded loader while checking credentials, and gracefully redirects unauthenticated requests.
- **Real-Time Firestore Sync**:
  - Real-time `onSnapshot` listeners in `getLiveDocument` allow instantaneous UI updates when loans are submitted, reviewed, or approved.

---

## 7. UI Improvement Roadmap

| Phase | Milestone | Priority | Focus |
|---|---|---|---|
| **Phase 1** | **Layout & Responsiveness** | ✅ Complete | Grid fixes, mobile table scrolling, fluid viewports, port 3007 setup. |
| **Phase 2** | **Currency & Math Clarity** | ✅ Complete | Centralized currency service, 4-card metric calculation, elimination of mixed currencies. |
| **Phase 3** | **Application Flow Modal** | ✅ Complete | 2-column New vs. Existing customer selection, regulatory notice overhaul. |
| **Phase 4** | **Firebase State Synchronization** | 🚀 Active | Real-time `onAuthStateChanged`, smooth route guards, Firestore live snapshot listeners. |
| **Phase 5** | **Dashboard Micro-Interactions** | 📋 Next | Enhanced loan request stepper, document upload drag-and-drop preview, payment status chips. |
| **Phase 6** | **Dark Mode Theme** | 📋 Backlog | System-preferred / manual theme toggle for both marketing and dashboard views. |
