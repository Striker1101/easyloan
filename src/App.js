import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./landingPage/Homepage";
import SignIn from "./landingPage/SignIn";
import Signup from "./landingPage/Signup";
import Policy from "./landingPage/Policy";
import ResetPassword from "./landingPage/ResetPassword";
import Protected from "./Protected";
import DashboardApp from "./Dashboard/App";
import NavLanding from "./Components/Utility/NavLanding";
import How from "./landingPage/How";
import FAQ from "./landingPage/FAQ";
import FooterLanding from "./Components/Utility/FooterLanding";
import { useEffect, useState } from "react";
import CustomerCare from "./landingPage/CustomerCare";
import FirebaseAuth from "./Firebase/FirebaseAuth";
import AuthCard from "./Components/LandingPages/AuthCard";
import { subscribeAuth } from "./Firebase/Functions";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    status: false,
    user: null,
  });

  const location = useLocation();
  const onDash = location.pathname.startsWith("/dashboard");
  const isHeroLanding = location.pathname === "/";

  useEffect(() => {
    const unsubscribe = subscribeAuth(({ status, user }) => {
      setUserDetails({ user: user || null, status });
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <AuthCard auth={userDetails.status} />
      {!onDash && <NavLanding color={isHeroLanding} />}
      <main className="page-content-wrapper">
        <Routes>
          <Route path="/" index element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/how" element={<How />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/firebase_auth" element={<FirebaseAuth />} />
          <Route path="/customer_care" element={<CustomerCare />} />
          <Route
            path="/dashboard/*"
            element={
              <Protected isLoggedIn={userDetails.status} loading={authLoading}>
                <DashboardApp user={userDetails} />
              </Protected>
            }
          />
        </Routes>
      </main>
      {!onDash && <FooterLanding />}
    </div>
  );
}

export default App;
