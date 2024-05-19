import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element, roles = ["admin"] }) {
    // Default to admin only
    const isAuthenticated = useSelector((state) => state.appUser.isAuthenticated);
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);
    const userRole = userData ? userData.role : null; // Set userRole to null if userData is absent
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    const isAuthorized = roles.includes(userRole);
    return isAuthorized ? element : <Navigate to="/not-found" replace />; // Redirect to not-found for unauthorized roles
  }

  export default PrivateRoute;