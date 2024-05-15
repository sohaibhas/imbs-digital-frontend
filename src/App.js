import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lead from "./pages/lead";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/NotFound";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Header from "./component/Header";
import AddBusiness from "./pages/addBusiness";
import "react-toastify/dist/ReactToastify.css";
import User from "./pages/user"; // Assuming User page is for managing other users
import Business from "./pages/business";
import Company from "./pages/company";

// Enhanced PrivateRoute component with role checks
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

function App() {
  const isAuthenticated = useSelector((state) => state.appUser.isAuthenticated);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Registration />
          }
        />
        <Route
          path="/addnewbusiness"
          element={<PrivateRoute element={<AddBusiness />} roles={["admin"]} />} // Only admins can add businesses
        />
        <Route
          path="/editbusiness/:id"
          element={<PrivateRoute element={<Business />} roles={["admin"]} />} // Only admins can edit businesses
        />
        <Route
          path="/leads"
          element={
            <PrivateRoute
              element={<Lead />}
              roles={["admin", "user"]} // Both admins and users can see leads
            />
          }
        />
        <Route // Assuming User page is for managing other users (admin only)
          path="/users"
          element={<PrivateRoute element={<User />} roles={["admin"]} />}
        />
        <Route
          path="/business"
          element={<PrivateRoute element={<Company />} roles={["admin"]} />} // Only admins can access company details
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  );
}

export default App;
