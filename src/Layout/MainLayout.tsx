import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";
import HeaderComponent from "./HeaderComponent";


export const MainLayout = () => {
  const { isLoggedIn } = useContext<any>(AuthContext);

  if (!isLoggedIn) {
    toast.error("You haven't registered YET !");
    return <Navigate to={"/register"} replace />;
  }

  return (
    <div className="flex flex-col">
      <HeaderComponent />
      <main
        style={{
          minHeight: "calc(100vh - 112px)"
        }}
        className="flex p-8"
      >
        <Outlet />
      </main>
      <footer className="p-4 bg-blue-500">I am footer</footer>
    </div>
  );
};
