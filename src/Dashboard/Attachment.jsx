import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AlertUser from "../Components/DashboardPages/AlertUser";
import { submitFile } from "../Firebase/Functions";
import { useReview } from "./App";

export default function Attachment({ id }) {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Upload Needed documents ",
      body: "Select required documents to proceed to Loan",
    }));
  }, []);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState(null);
  const [front, setFront] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
  };

  const handleFileChange = (event, expression) => {
    switch (expression) {
      case "front":
        setFront(event.target.files[0]);
        break;
      case "file":
        setFile(event.target.files[0]);
        break;
      default:
      // code block
    }
  };

  const handleUpload = async (event) => {
    if (uploading || selectedDocument == "") {
      return;
    }
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    //satisfy condition for back and front view
    if (
      front == null ||
      (file == null && selectedDocument.toLowerCase().includes("id"))
    ) {
      alert("Please select a file on front and back view to upload.");
      return;
    }

    setUploading(true);
    const result = await submitFile(id, selectedDocument, { file, front });
    console.log(result);
    if (result.status) {
      setSuccessMessage(result.message);
      setTimeout(() => setSuccessMessage(null), 120000); // 2 minutes in milliseconds
      setUploading(false);
    } else {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 120000); // 2 minutes in milliseconds
    }

    // Reset form after submission
    // setSelectedDocument("");
    // setFile(null);
  };

  const data = [
    "Valid ID Card",
    "Other ID Card",
    "Payslips",
    "Bank Statements",
    "Employment Letter",
    "Purchase Order",
    "Invoices",
    "Certificate of Incorporation",
    "Company Profile",
    "Allotment of Shares",
    "Particulars of Directors",
    "Work ID Card",
    "Utility Bill",
    "National ID",
    "Voter's ID",
    "International Passport",
  ];

  return (
    <div className="attachmentBG">
      <div className="dashboardInfo w-100 text-center">
        Select the type of document you want to upload and attach file.
      </div>
      <Container>
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="documentType">
            <Form.Label>Select Document Type</Form.Label>
            <Form.Control
              as="select"
              value={selectedDocument}
              onChange={handleDocumentChange}
            >
              <option value="">Select Document Type</option>
              {data.map((document, index) => (
                <option key={index} value={document}>
                  {document}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {selectedDocument.toLowerCase().includes("id") && (
            <Form.Group controlId="file">
              <Form.Label>Upload Front View</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, "front")}
              />
            </Form.Group>
          )}
          <Form.Group controlId="file">
            <Form.Label>
              {!selectedDocument.toLowerCase().includes("id")
                ? " Upload File"
                : "Upload Back View"}
            </Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                handleFileChange(e, "file");
              }}
            />
          </Form.Group>
          <Button variant="primary" className="m-3" onClick={handleUpload}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Form>
      </Container>
      <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}
