import { useEffect } from "react";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Store
import useStore from "./Store/useStore";

// Components
import Header from "./Components/Header/Header";

// Pages
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Contest from "./Pages/Contest/Contest";
import ContestDetails from "./Pages/Contest/ContestDetails";
import Refferral from "./Pages/Referral/Refferral";
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

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "dashboard",
            element: (
              <ProtectRoute>
                {user && user.role === "player" && <Dashboard />}
                {user && (user.role === "admin" || user.role === "manager") && (
                  <AdminDashboard />
                )}
              </ProtectRoute>
            ),
          },
          {
            path: "contest",
            element: <Contest />,
          },
          {
            path: "contest/:contestId",
            element: <ContestDetails />,
          },
          {
            path: "/referral",
            element: <Refferral />,
          },
          {
            path: "signup",
            element: (
              <RedirectAuthenticateUser>
                <Signup />
              </RedirectAuthenticateUser>
            ),
          },
          {
            path: "login",
            element: (
              <RedirectAuthenticateUser>
                <Login />
              </RedirectAuthenticateUser>
            ),
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
