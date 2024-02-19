import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Review from "../Components/DashboardPages/Review";
import NavDash from "../Components/Utility/Dashboard/NavDash";
import ProfileApp from "./Profile/App";
import Summary from "./Summary";
import Terminate from "./Terminate";
import "./style.css";

export default function DashboardApp({ setOnDash, user }) {
  setOnDash(true);

  return (
    <div style={{ backgroundColor: "GrayText" }}>
      <div className="container_D position-relative   d-flex  justify-content-center align-items-center vh-120 vw-100">
        <div className="dashboard_D  bg-light overflow-hidden">
          <div className="content">
            {/* Content goes here */}
            <NavDash />
            <Routes>
              <Route path="/" index component={ProfileApp} />
              <Route path="/summary" component={Summary} />
              <Route path="/terminate" component={Terminate} />
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
