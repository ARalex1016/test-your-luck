import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Store
import useStore from "./Store/useStore";

// Components
import Header from "./Components/Header/Header";

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
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
  const { checkAuth } = useStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        />

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
