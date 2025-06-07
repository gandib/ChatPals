import { type ReactNode } from "react";
import { Navigate } from "react-router";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  //   let user;

  //   if (token) {
  //     user = verifyToken(token);
  //   }
  //   console.log(token, role, authUser);
  if (role !== "user" && role !== "admin") {
    console.log("object1");
    return <Navigate to={"/login"} replace={true} />;
  }

  //   if (role !== undefined && role !== (user as TUser)?.role) {
  //     console.log("object");
  //     // dispatch(logout());
  //     dispatch(baseApi.util.resetApiState());
  //     return (
  //       <Navigate
  //         to={"/unauthorized"}
  //         state={location?.pathname}
  //         replace={true}
  //       />
  //     );
  //   }

  // if (!token) {
  //   console.log("object2");
  //   return <Navigate to={"/login"} replace={true} />;
  // }

  return children;
};

export default ProtectedRoute;
