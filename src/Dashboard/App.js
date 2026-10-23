import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavDash from "../Components/Utility/Dashboard/NavDash";
import OverView from "./OverView";
import ProfileHub from "./Profile/ProfileHub";
import Summary from "./Summary";
import Terminate from "./Terminate";
import ActiveLoan from "./ActiveLoan";
import Attachment from "./Attachment";
import Withdraw from "./Withdraw";
import Admin from "./Admin";
import ProtectAdmin from "./ProtectAdmin";
import "./style.css";
import Request from "./Request";
import { getLiveDocument } from "../Firebase/Functions";
import { Helmet } from "react-helmet";
import Chat from "../Chat";

const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);

export default function DashboardApp({ user }) {
  const [loan, setLoan] = useState([]);
  const [review, setReview] = useState({
    header: "",
    body: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.status) {
      navigate("/signin");
    }
  }, [user, navigate]);

  function filterByStatusTrue(data) {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item.status === true);
  }

  const UID = user?.user?.uid || user?.uid || "";

  useEffect(() => {
    if (!UID) return;
    const unsubscribe = getLiveDocument("loan", UID, (result) => {
      if (result && result.status) {
        setLoan(result.data || []);
      } else {
        setLoan([]);
      }
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [UID]);

  return (
    <div className="dash-shell">
      <Chat />
      <NavDash user={user} id={UID} />

      <main className="dash-main-container">
        <ReviewContext.Provider value={{ review, setReview }}>
          <Routes>
            <Route path="/" index element={<OverView summary={loan} user={user} />} />
            <Route path="/summary" element={<Summary summary={loan} />} />
            <Route
              path="/active_loan"
              element={<ActiveLoan loan={filterByStatusTrue(loan)} />}
            />
            <Route path="/request" element={<Request />} />
            <Route path="/withdraw" element={<Withdraw setReview={setReview} id={UID} />} />
            <Route path="/attachment" element={<Attachment id={UID} />} />
            <Route path="/terminate" element={<Terminate terminate={loan} />} />
            <Route path="/profile/*" element={<ProfileHub />} />
            <Route
              path="/admin/*"
              element={
                <ProtectAdmin id={UID}>
                  <Admin id={UID} />
                </ProtectAdmin>
              }
            />
          </Routes>
        </ReviewContext.Provider>
      </main>

      <Helmet>
        <title>Dashboard — Loan Swift</title>
      </Helmet>
    </div>
  );
}
