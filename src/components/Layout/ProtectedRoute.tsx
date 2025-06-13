import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { baseApi } from "../../redux/api/baseApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    dispatch(baseApi.util.resetApiState());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
