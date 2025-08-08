import { Navigate, useLocation } from "react-router";
import useAuth from "../AuthProvider/UseAuth";
//import LoadingSpinner from "../Components/LoadingSpinner"; // যদি loading spinner থাকে

const PrivateRouteParticipant = ({ children }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p>Loading...</p>; // Optional
  }

  if (!user || role !== "participant") {
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouteParticipant;
