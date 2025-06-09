import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import { userPaths } from "./user.routes";
import { routesGenerator } from "../utils/routesGenerator";
import UserDashboard from "../pages/user/UserDashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: routesGenerator(userPaths),
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
]);

export default router;
