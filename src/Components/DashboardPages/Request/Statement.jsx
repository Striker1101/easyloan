import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { uploadFile } from "../../../Firebase/Functions";
import AlertUser from "../AlertUser";

const Statement = ({ status, handleSubmit, setImgURL, setInfo }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  useEffect(() => {
    setInfo((prev) => ({
      ...prev,
      details: "Attach all required documents",
      status: true,
    }));
  }, [status]);

  const handleUpload = async () => {
    setUploading(true);
    if (file) {
      const result = await uploadFile(file);
      if (result.status) {
        setSuccessMessage(result.message);
        setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
        setUploading(false);
        setImgURL(result.downloadURL);
        handleSubmit();
      } else {
        setErrorMessage(result.message);
        setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
      }
    } else {
      setErrorMessage("No file selected");
      setTimeout(() => setErrorMessage(null), 120000);
    }
  };

  return (
    <div>
      {status && (
        <Form>
          <h2>Include a Recent Bank Statement</h2>
          <Form.Group controlId="file">
            <Form.Label>Select File:</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="m-3"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>

          <AlertUser
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        </Form>
      )}
    </div>
  );
};

export default Statement;
