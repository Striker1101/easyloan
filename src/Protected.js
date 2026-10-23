import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Components/DashboardPages/Loader";

const Protected = ({ isLoggedIn, loading, children }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Loader />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default Protected;
