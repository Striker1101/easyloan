import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./landingPage/Homepage";
import SignIn from "./landingPage/SignIn";
import Signup from "./landingPage/Signup";
import Verify from "./landingPage/Verify";
import ResetPassword from "./landingPage/ResetPassword";
import Protected from "./Protected";
import DashboardApp from "./Dashboard/App";
import NavLanding from "./Components/Utility/NavLanding";
import How from "./landingPage/How";
import FAQ from "./landingPage/FAQ";
import FooterLanding from "./Components/Utility/FooterLanding";
function App() {
  //auth user
  return (
    <div>
      {/* auth.user for NavDashboard else NavLanding */}
      <NavLanding />
      <Routes>
        <Route path="/" index element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/how" element={<How />} />
        <Route path="/faq" element={<FAQ />} />
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
