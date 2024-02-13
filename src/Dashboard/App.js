import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./DashboardApp.css";
import { Helmet } from "react-helmet";
// 

export default function DashboardApp() {
  const userID = JSON.parse(localStorage.getItem("userID"));
  const [data, setData] = useState(false);

  return (
    <div style={{ width: "100vw" }}>
      <Routes>
        {/* <Route path="/" index element={<Homepage />} />
        <Route path="/mywallet" element={<MyWallet data={data} />} />
        <Route path="/deposit" element={<Deposit data={data} />} />
        <Route path="/withdraw" element={<Withdraw data={data} />} />
        <Route path="/profile" element={<Profile data={data} />} />
        <Route path="/upgrade" element={<Upgrade />} /> */}
      </Routes>
    </div>
  );
}
