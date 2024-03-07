import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import { checkAuth } from "./Firebase/Functions";

function App() {
  const [userDetails, setUserDetails] = useState({
    status: false,
    user: "",
  });

  const [navcolor, setNavColor] = useState(true);
  const [onDash, setOnDash] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { status, user } = await checkAuth();
        if (status) {
          setUserDetails({ user, status });
        } else {
          setUserDetails({ user: "", status: false });
        }
      } catch (error) {
        console.error("Error checking user status:", error.message);
      }
    };

    checkStatus();
  }, []);

  return (
    <div>
      {/* <Helmet>
        
  <script type="text/javascript">
    (function (d, t) {
      var g = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      g.src =
        "https://cdn.pushalert.co/integrate_d8dc148d717e5de3b601c568738d6021.js";
      s.parentNode.insertBefore(g, s);
    })(document, "script");
  </script>
 
      </Helmet> */}
      {/* auth.user for NavDashboard else NavLanding */}
      <AuthCard auth={userDetails.status} />
      {onDash ? "" : <NavLanding color={navcolor} />}
      <Routes>
        <Route
          path="/"
          index
          element={<Homepage setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/signin"
          element={<SignIn setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/reset"
          element={
            <ResetPassword setOnDash={setOnDash} setNavColor={setNavColor} />
          }
        />
        <Route
          path="/signup"
          element={<Signup setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/policy"
          element={<Policy setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/how"
          element={<How setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/faq"
          element={<FAQ setOnDash={setOnDash} setNavColor={setNavColor} />}
        />
        <Route
          path="/firebase_auth"
          element={
            <FirebaseAuth setOnDash={setOnDash} setNavColor={setNavColor} />
          }
        />
        <Route
          path="/customer_care"
          element={
            <CustomerCare setOnDash={setOnDash} setNavColor={setNavColor} />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            //check if user is logged in
            <Protected isLoggedIn={userDetails.status}>
              {userDetails.status && (
                <DashboardApp setOnDash={setOnDash} user={userDetails} />
              )}
            </Protected>
          }
        />
      </Routes>
      {/* auth.user for FooterDashboard else FooterLanding */}
      {onDash ? "" : <FooterLanding />}
    </div>
  );
}

export default App;
