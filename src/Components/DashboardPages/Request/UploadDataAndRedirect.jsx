import React, { useState, useEffect } from "react";
import Loader from "../Loader.jsx";
import { updateRegion } from "../../../Firebase/Functions";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UploadDataAndRedirect = ({ status, loan }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    async function upload() {
      if (status) {
        const result = await updateRegion("loan", loan);
        if (result.status) {
          navigate("/dashboard/summary");
        } else {
          setErrorMessage(result.message);
          setTimeout(() => setErrorMessage(null), 120000);
        }
      }
    }

    upload();
  }, [status, loan, navigate]);

  return (
    <div>
      {status && (
        <>
          <div>
            <h1>Updating Data...</h1>
            <Loader /> {/* Display the Loader component */}
          </div>
          <div>
            {errorMessage && (
              <Alert variant="danger" dismissible>
                {errorMessage}
              </Alert>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UploadDataAndRedirect;
