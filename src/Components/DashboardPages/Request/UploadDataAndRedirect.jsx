import React, { useState, useEffect } from "react";
import Loader from "../Loader.jsx";
import { updateRegion } from "../../../Firebase/Functions";
import { Alert } from "react-bootstrap";

const UploadDataAndRedirect = ({ status, loan }) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    async function upload() {
      if (status) {
        setLoading(false);
        const result = await updateRegion(loan);
        if (result.status) {
          setLoading(true);
          window.location.href = "/dashboard/summary";
        } else {
          setErrorMessage(result.message);
          setTimeout(() => setErrorMessage(null), 120000);
        }
      }
    }

    upload();
  }, [status, loan]);

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
