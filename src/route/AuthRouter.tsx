import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import RegisterProvider from "../Providers/ResigterProvider";

export type TokenResponse = {
  token: string;
  name: string;
};

type Props = {
  children?: React.ReactNode;
};
export default function AuthRoute({ children }: Props) {
  const { isLoggedIn } = useContext<any>(AuthContext);

  if (isLoggedIn) {
    toast.success("You have already registered !");
    return <Navigate to={"/companies"} />;
  }
  return (
    <RegisterProvider>{children ? children : <Outlet />}</RegisterProvider>
  );
}
