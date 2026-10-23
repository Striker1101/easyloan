import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faPeopleRoof,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Personal from "../../Components/DashboardPages/Personal";
import EmploymentInfo from "../../Components/DashboardPages/EmploymentInfo";
import EducationInformation from "../../Components/DashboardPages/EducationInformation";
import NextKin from "../../Components/DashboardPages/NextKin";
import ExpensesInfo from "../../Components/DashboardPages/ExpensesInfo";

import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileHub() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = () => {
    const path = location.pathname;
    if (path.includes("work")) return "work";
    if (path.includes("education")) return "education";
    if (path.includes("next_kin")) return "next_kin";
    if (path.includes("expenses")) return "expenses";
    return "personal";
  };

  const activeTab = getTabFromPath();

  const handleTabClick = (tabId) => {
    navigate(`/dashboard/profile/${tabId}`);
  };

  const tabs = [
    { id: "personal", label: "Personal Details", icon: faUser },
    { id: "work", label: "Employment & Income", icon: faBriefcase },
    { id: "education", label: "Education & Qualifications", icon: faGraduationCap },
    { id: "next_kin", label: "Next of Kin", icon: faPeopleRoof },
    { id: "expenses", label: "Financial Expenses", icon: faReceipt },
  ];

  return (
    <div>
      <div className="dash-page-header">
        <h2 className="dash-page-title">Profile & Verification Settings</h2>
        <p className="dash-page-subtitle">
          Manage your verified personal details, income sources, and underwriting information.
        </p>
      </div>

      {/* Modern Underline / Pill Tab Navigation */}
      <div className="profile-tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`profile-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content Card */}
      <div className="dash-card">
        {activeTab === "personal" && (
          <div>
            <div className="dash-card-header">
              <h3 className="dash-card-title">Personal Identification & Contact</h3>
            </div>
            <Personal status={true} handleSubmit={() => {}} setInfo={() => {}} />
          </div>
        )}

        {activeTab === "work" && (
          <div>
            <div className="dash-card-header">
              <h3 className="dash-card-title">Employment & Monthly Income</h3>
            </div>
            <EmploymentInfo />
          </div>
        )}

        {activeTab === "education" && (
          <div>
            <div className="dash-card-header">
              <h3 className="dash-card-title">Educational Background</h3>
            </div>
            <EducationInformation />
          </div>
        )}

        {activeTab === "next_kin" && (
          <div>
            <div className="dash-card-header">
              <h3 className="dash-card-title">Next of Kin & Emergency Contact</h3>
            </div>
            <NextKin />
          </div>
        )}

        {activeTab === "expenses" && (
          <div>
            <div className="dash-card-header">
              <h3 className="dash-card-title">Monthly Living Expenses & Liabilities</h3>
            </div>
            <ExpensesInfo />
          </div>
        )}
      </div>
    </div>
  );
}
