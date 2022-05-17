import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

type Props = {
  children?: React.ReactNode;
};
export default function ProtectedRoute({ children }: Props) {
  const { isLoggedIn } = useContext<any>(AuthContext);
  console.log("isLogged IN ", isLoggedIn);
  if (!isLoggedIn) {
    toast.error("You haven't registered YET !");
    return <Navigate to={"/register"} replace />;
  }
  return <>{children ? children : <Outlet />}</>;
}
