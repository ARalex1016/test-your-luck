import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
import useStore from "./Store/useStore";

// Components
import Header from "./Components/Header/Header";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contest from "./Pages/Contest/Contest";
import NotFound from "./Pages/NotFound";

const RedirectAuthenticateUser = ({ children }) => {
  const { isAuthenticated } = useStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const { user, checkAuth, getAllContest } = useStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        await getAllContest();
      } catch (error) {}
    };

    fetchContests();
  }, [getAllContest]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              {user && user.role === "player" && <Dashboard />}
              {user && (user.role === "admin" || user.role === "manager") && (
                <AdminDashboard />
              )}
            </ProtectRoute>
          }
        />

        <Route path="/contest" element={<Contest />} />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticateUser>
              <Signup />
            </RedirectAuthenticateUser>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticateUser>
              <Login />
            </RedirectAuthenticateUser>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
