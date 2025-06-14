import ChangePassword from "../pages/user/ChangePassword";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    name: "Profile",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Change Password",
    path: "change-password",
    element: <ChangePassword />,
  },
];
