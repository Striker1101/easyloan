import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import EmploymentInfo from "../../Components/DashboardPages/EmploymentInfo";
import { useReview } from "../App";

export default function WorkInfo() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Review on Work Related Information",
      body: "Check in here for all work details used for verification",
    }));
  }, []);
  return (
    <div>
      <div className="personalInfo">
        Tell us a little about the kind of work you do.
      </div>
      <Container>
        <EmploymentInfo />
      </Container>
    </div>
  );
}
