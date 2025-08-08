import { Navigate, useLocation } from "react-router";
import useAuth from "../AuthProvider/UseAuth";


const PrivateRouteOrganizer = ({ children }) => {
  const { user, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return <span>Loading...</span>
  }

  // ✅ কেবল organizer role allowed
  if (!user || role !== "organizer") {
    return <Navigate to="/404" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouteOrganizer;
