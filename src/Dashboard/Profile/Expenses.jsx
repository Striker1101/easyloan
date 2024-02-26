import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import ExpensesInfo from "../../Components/DashboardPages/ExpensesInfo";
import { useReview } from "../App";

export default function Expenses() {
  const { review, setReview } = useReview();
  useEffect(() => {
    setReview((prev) => ({
      ...prev,
      header: "Review on  Expenses Means Information",
      body: "Check in here for all expenses details used for verification",
    }));
  }, []);
  return (
    <div>
      <div className="personalInfo">Update your expenses</div>
      <Container>
        <ExpensesInfo />
      </Container>
    </div>
  );
}
