import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import NextKin from "../../Components/DashboardPages/NextKin";
import { useReview } from "../App";

export default function NextOfKin() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Review on Next of Kings Information",
      body: "Check in here for next of kings details submitted",
    }));
  }, []);
  return (
    <div>
      <div className="personalInfo"> Update your next of kin information</div>
      <Container>
        <NextKin />
      </Container>
    </div>
  );
}
