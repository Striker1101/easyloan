import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Review from "../Components/DashboardPages/Review";
import NavDash from "../Components/Utility/Dashboard/NavDash";
import PersonalInfo from "./Profile/PersonalInfo";
import EducationInfo from "./Profile/EducationInfo";
import AddressInfo from "./Profile/AddressInfo";
import WorkInfo from "./Profile/WorkInfo";
import Expenses from "./Profile/Expenses";
import NextOfKin from "./Profile/NextOfKin";
import Summary from "./Summary";
import Terminate from "./Terminate";
import ActiveLoan from "./ActiveLoan";
import Attachment from "./Attachment";
import "./style.css";
import Request from "./Request";
import { getLiveDocument } from "../Firebase/Functions";

export default function DashboardApp({ setOnDash, user }) {
  setOnDash(true);
  const [loan, setLoan] = useState([]);

  function filterByStatusTrue(data) {
    return data.filter((item) => item.status === true);
  }

  const UID = user.user._delegate.uid;
  useEffect(() => {
    async function getLoan() {
      const result = await getLiveDocument("loan", UID);
      if (result.status) {
        setLoan(result.data);
      }
    }
    getLoan();
  }, []);


  return (
    <div style={{ position: "relative" }}>
      <div className="container_D position-relative   d-flex  justify-content-center align-items-center vh-120 vw-100">
        <div className="dashboard_D  bg-light overflow-hidden">
          <div className="background-video">
            <video autoPlay loop muted>
              <source src="/background.mp4" type="video/mp4" />
              {/* Add additional <source> elements for other video formats if needed */}
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="content">
            {/* Content goes here */}
            <NavDash user={user} />
            <Routes>
              <Route path="/" element={<Summary summary={loan} />} />
              {/* profile routes */}
              <Route path="/profile/personal_info" element={<PersonalInfo />} />
              <Route
                path="/profile/education_info"
                element={<EducationInfo />}
              />
              <Route path="/profile/address_info" element={<AddressInfo />} />
              <Route path="/profile/work_info" element={<WorkInfo />} />
              <Route path="/profile/next_of_kin" element={<NextOfKin />} />
              <Route path="/profile/expenses" element={<Expenses />} />
              {/* others */}
              <Route
                path="/summary"
                index
                element={<Summary summary={loan} />}
              />
              <Route
                path="/terminate"
                element={<Terminate terminate={loan} />}
              />
              <Route
                path="/active_loan"
                element={<ActiveLoan loan={filterByStatusTrue(loan)} />}
              />
              <Route path="/attachment" element={<Attachment id={UID} />} />
              <Route path="/request" element={<Request />} />
            </Routes>
          </div>
        </div>
        <div className="review d-none d-md-block">
          {/* Review component goes here */}
          <Review />
        </div>
      </div>
    </div>
  );
}
