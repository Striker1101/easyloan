import React from "react";
import { Navigate } from "react-router-dom";

const ADMIN_UID = "lh9iZrbgrAPDmB2m4NnERikFbsq1";

const ProtectAdmin = ({ id, children }) => {
  // Allow the designated Admin UID or local development testing
  const isAuthorized = id === ADMIN_UID || process.env.NODE_ENV === "development";

  if (!isAuthorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectAdmin;
