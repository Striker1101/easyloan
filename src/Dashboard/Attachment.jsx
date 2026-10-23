import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faShieldHalved,
  faFileLines,
  faCircleCheck,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import AlertUser from "../Components/DashboardPages/AlertUser";
import { submitFile, getDocument } from "../Firebase/Functions";

export default function Attachment({ id }) {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState(null);
  const [front, setFront] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const loadUploadedFiles = async () => {
    if (!id) return;
    try {
      const res = await getDocument("files", id, false);
      if (res && res.status && Array.isArray(res.datas?.region)) {
        setUploadedDocs(res.datas.region);
      }
    } catch (e) {
      console.warn("Could not load uploaded files:", e);
    }
  };

  useEffect(() => {
    loadUploadedFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
        break;
    }
  };

  const handleUpload = async (event) => {
    if (uploading || !selectedDocument) {
      return;
    }
    if (event) event.preventDefault();

    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    // satisfy condition for back and front view if it's an ID
    if (
      (front == null || file == null) &&
      selectedDocument.toLowerCase().includes("id")
    ) {
      setErrorMessage("Please select both front and back view files for your ID.");
      return;
    }

    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await submitFile(id, selectedDocument, { file, front });
    setUploading(false);
    if (result.status) {
      setSuccessMessage(result.message || "Document uploaded successfully.");
      setFile(null);
      setFront(null);
      setSelectedDocument("");
      loadUploadedFiles();
      setTimeout(() => setSuccessMessage(null), 8000);
    } else {
      setErrorMessage(result.message || "Failed to upload document.");
      setTimeout(() => setErrorMessage(null), 8000);
    }
  };

  const documentTypes = [
    "Valid ID Card",
    "National ID",
    "International Passport",
    "Voter's ID",
    "Work ID Card",
    "Payslips (Last 3 Months)",
    "Bank Statements (Last 6 Months)",
    "Employment Letter",
    "Utility Bill",
    "Purchase Order",
    "Invoices",
    "Certificate of Incorporation",
    "Company Profile",
    "Particulars of Directors",
  ];

  const isIdType =
    selectedDocument.toLowerCase().includes("id") ||
    selectedDocument.toLowerCase().includes("passport");

  return (
    <div>
      <div className="dash-page-header">
        <h2 className="dash-page-title">Underwriting & Compliance Documents</h2>
        <p className="dash-page-subtitle">
          Upload required financial proof, ID verification, and supporting attachments to expedite loan approvals.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title d-flex align-items-center gap-2">
                <FontAwesomeIcon icon={faCloudArrowUp} className="text-primary" />
                <span>Upload New Attachment</span>
              </h3>
            </div>

            <Form onSubmit={handleUpload}>
              <Form.Group controlId="documentType" className="mb-3">
                <Form.Label className="fw-semibold small text-dark">
                  Select Document Classification
                </Form.Label>
                <Form.Select
                  value={selectedDocument}
                  onChange={handleDocumentChange}
                  className="py-2"
                  required
                >
                  <option value="">-- Choose document type --</option>
                  {documentTypes.map((doc, index) => (
                    <option key={index} value={doc}>
                      {doc}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {isIdType && (
                <Form.Group controlId="fileFront" className="mb-3">
                  <Form.Label className="fw-semibold small text-dark">
                    Front Side View (Photo ID)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => handleFileChange(e, "front")}
                    className="py-2"
                    required
                  />
                  {front && (
                    <Form.Text className="text-success small d-block mt-1">
                      Selected: {front.name} ({(front.size / 1024).toFixed(0)} KB)
                    </Form.Text>
                  )}
                </Form.Group>
              )}

              <Form.Group controlId="fileBack" className="mb-4">
                <Form.Label className="fw-semibold small text-dark">
                  {isIdType ? "Back Side View" : "Document File (PDF or Image)"}
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, "file")}
                  className="py-2"
                  required
                />
                {file && (
                  <Form.Text className="text-success small d-block mt-1">
                    Selected: {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </Form.Text>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                disabled={uploading || !selectedDocument || !file}
              >
                {uploading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                    <span>Encrypting & Uploading...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    <span>Upload Attachment</span>
                  </>
                )}
              </Button>
            </Form>

            <AlertUser errorMessage={errorMessage} successMessage={successMessage} />
          </div>
        </div>

        {/* Informational Guidance Panel */}
        <div className="col-lg-5">
          <div className="dash-card bg-light border">
            <h4 className="fw-bold text-dark fs-6 mb-3 d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faShieldHalved} className="text-primary" />
              <span>Document Guidelines</span>
            </h4>
            <ul className="list-unstyled small text-muted mb-4 d-flex flex-column gap-2">
              <li className="d-flex align-items-start gap-2">
                <FontAwesomeIcon icon={faFileLines} className="text-primary mt-1" />
                <span>Files must be clear, uncropped, and readable. High-resolution photos or official PDF exports are preferred.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FontAwesomeIcon icon={faFileLines} className="text-primary mt-1" />
                <span>Bank statements must show at least 90 days of transaction history and your account name.</span>
              </li>
              <li className="d-flex align-items-start gap-2">
                <FontAwesomeIcon icon={faFileLines} className="text-primary mt-1" />
                <span>Identification cards must be government-issued and valid for at least 3 months.</span>
              </li>
            </ul>

            <div className="p-3 bg-white rounded-3 border small text-muted">
              <strong className="text-dark d-block mb-1">Bank-Grade 256-bit Encryption</strong>
              Your financial records are stored securely in compliance with strict privacy standards and utilized exclusively for loan credit assessment.
            </div>
          </div>
        </div>
      </div>

      {/* Already Uploaded Files Section */}
      {uploadedDocs.length > 0 && (
        <div className="dash-card mt-4">
          <div className="dash-card-header">
            <h4 className="dash-card-title d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
              <span>Attached Compliance Documents ({uploadedDocs.length})</span>
            </h4>
          </div>

          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Classification</th>
                  <th>Uploaded Date</th>
                  <th>Status</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocs.map((doc, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong className="text-dark">{doc.documentType}</strong>
                    </td>
                    <td className="small text-muted">
                      {doc.uploadedAt
                        ? new Date(doc.uploadedAt).toLocaleDateString()
                        : "On file"}
                    </td>
                    <td>
                      <span className="dash-badge approved">
                        <FontAwesomeIcon icon={faCircleCheck} /> Uploaded & Encrypted
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        href={doc.backUrl || doc.frontUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-secondary py-1 px-3 d-inline-flex align-items-center gap-1"
                      >
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
