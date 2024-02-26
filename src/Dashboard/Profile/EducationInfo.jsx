import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import EducationInformation from "../../Components/DashboardPages/EducationInformation";
import { useReview } from "../App";

export default function EducationInfo() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Review on Educational Information",
      body: "Check in here for all Educational information used for verification",
    }));
  }, []);
  return (
    <div>
      <div className="personalInfo">Update your education information</div>
      <Container>
        <EducationInformation />
      </Container>
    </div>
  );
}
