import React, { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";


export const MainLayout = () => {

  const { isLoggedIn } = useContext<any>(AuthContext);
  if (!isLoggedIn) {
    toast.error("You haven't registered YET !");
    return <Navigate to={"/register"} replace />;
  }

  return (
    <div className="flex flex-col">
      <header className="p-4 bg-blue-500 px-10">
        <nav className="flex flex-row justify-between items-center">
          <div>
            <Link to="/companies">
              <p className="text-2xl font-semibold text-white">
                LOGO
              </p>
            </Link>
          </div>

          <div className="flex flex-row items-center space-x-4">
            <Link to="/companies"
              className="hover:text-black text-white text-lg font-semibold flex flex-row flex-nowrap items-center space-x-2 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p>
                Companies
              </p>
            </Link>
          </div>
        </nav>
      </header>
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
