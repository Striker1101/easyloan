import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./landingPage/Homepage";
import SignIn from "./landingPage/SignIn";
import Signup from "./landingPage/Signup";
import ResetPassword from "./landingPage/ResetPassword";
import Protected from "./Protected";
import DashboardApp from "./Dashboard/App";
import NavLanding from "./Components/Utility/NavLanding";
import How from "./landingPage/How";
import FAQ from "./landingPage/FAQ";
import FooterLanding from "./Components/Utility/FooterLanding";
import { useState } from "react";
import CustomerCare from "./landingPage/CustomerCare";

function App() {
  //auth user

  const [navcolor, setNavColor] = useState(true);
  // name, username, ssn, setpin, pintoken, type of Loan(personal, SALAD->salary advance Loan, education loan

  //     breeze(personla loan) Employee Group Loan
  // personal EDU Loan is an educational loan product designed to provide financial assistance to corporate employees and SME business owners who want to further their education abroad or sponsor their wards.

  return (
    <div>
      {/* auth.user for NavDashboard else NavLanding */}
      <NavLanding color={navcolor} />
      <Routes>
        <Route
          path="/"
          index
          element={<Homepage setNavColor={setNavColor} />}
        />
        <Route path="/signin" element={<SignIn setNavColor={setNavColor} />} />
        <Route
          path="/reset_password"
          element={<ResetPassword setNavColor={setNavColor} />}
        />
        <Route path="/signup" element={<Signup setNavColor={setNavColor} />} />
        <Route path="/how" element={<How setNavColor={setNavColor} />} />
        <Route path="/faq" element={<FAQ setNavColor={setNavColor} />} />
        <Route
          path="/customer_care"
          element={<CustomerCare setNavColor={setNavColor} />}
        />
        <Route
          path="/dashboard/*"
          element={
            //check if user is logged in
            <Protected isLoggedIn={true}>
              <DashboardApp />
            </Protected>
          }
        />
      </Routes>
      {/* auth.user for FooterDashboard else FooterLanding */}
      <FooterLanding />
    </div>
  );
}

export default App;
