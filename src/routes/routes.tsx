import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import { userPaths } from "./user.routes";
import { routesGenerator } from "../utils/routesGenerator";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../components/Layout/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute role="user">
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
]);

export default router;
