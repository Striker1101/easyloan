import React, { useEffect } from "react";
import Personal from "../../Components/DashboardPages/Personal";
import { Container } from "react-bootstrap";
import { useReview } from "../App";

export default function PersonalInfo() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Review on Personal Information",
      body: "Personal information used for verification",
    }));
  }, []);
  function handleSubmit() {}
  function setInfo(params) {}
  return (
    <div>
      <div className="personalInfo">Update your Personal Information</div>
      <Container>
        <Personal status={true} handleSubmit={handleSubmit} setInfo={setInfo} />
      </Container>
    </div>
  );
}
