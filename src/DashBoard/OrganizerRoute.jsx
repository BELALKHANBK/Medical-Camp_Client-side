// OrganizerRoute.jsx
import { Navigate } from "react-router";
import useAuth from "../AuthProvider/UseAuth";


const OrganizerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (user?.role === "organizer") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default OrganizerRoute;
