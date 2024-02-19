import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Landing/Auth.css";
const AuthCard = ({ auth }) => {
  const [isVisible, setIsVisible] = useState(true); // Initially visible
  const location = useLocation();

  const handleToggleVisibility = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Hide the card after 3 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  const isAuthenticated = auth; // Placeholder for authentication status, replace with actual logic

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardPage && isVisible && auth && (
        <div
          className="position-fixed top-50  end-0 m-3 p-3"
          style={{ animation: "slide-in 1s forwards" }}
        >
          <div className="card bg-light" style={{ width: "18rem" }}>
            <div className="card-body">
              {isAuthenticated ? (
                <>
                  <p className="card-text">You are currently logged in.</p>
                  <Link to={"/dashboard"}>
                    <button
                      className="btn btn-primary"
                      onClick={handleToggleVisibility}
                    >
                      Continue to Dashboard
                    </button>
                  </Link>
                </>
              ) : (
                <p className="card-text">You are currently not logged in.</p>
              )}
            </div>
            <button
              className="btn-close p-4 "
              aria-label="Close"
              onClick={handleToggleVisibility}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthCard;
