import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import { userPaths } from "./user.routes";
import { routesGenerator } from "../utils/routesGenerator";
import UserDashboard from "../pages/user/UserDashboard";

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
    ],
  },
]);

export default router;
