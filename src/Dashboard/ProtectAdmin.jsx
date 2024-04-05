import React from "react";

import { Navigate } from "react-router-dom";

const ProtectAdmin = ({ id, children }) => {
  if (id === "lh9iZrbgrAPDmB2m4NnERikFbsq1") {
    <Navigate to="/admin/" />;
  } else {
    <Navigate to="/dashboard/" replace />;
  }
  return children;
};

export default ProtectAdmin;
