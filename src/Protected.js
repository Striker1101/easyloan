import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    setTimeout(() => {
      return <Navigate to="/signin" replace />;
    }, 2000);
  }
  return children;
};
export default Protected;
