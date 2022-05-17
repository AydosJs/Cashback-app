import { Routes, Route } from "react-router-dom";
import { RegisterContainer } from "../containers/ResigterContainer/RegisterContainer";
import { RegisterCode } from "../containers/ResigterContainer/RegisterCode";
import AuthRoute from "./AuthRouter";
import ProtectedRoute from "./ProtectedRoute";
import ProductsContainerContainer from "../containers/ProductsContainer/ProductsContainerContainer";
import CompaniesContainer from "../containers/companiesContainer/CompaniesContainer";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import React from "react";

export const RouteHandler = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="/register/code" element={<RegisterCode />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/companies" element={<CompaniesContainer />} />
          <Route
            path="/companies/:id"
            element={<ProductsContainerContainer />}
          />
        </Route>
        {/* <Route path="about" element={<About />} /> */}
        <Route
          path="*"
          element={
            <main className="p-4 flex flex-col items-center justify-center min-h-screen text-left">
              {/* <p className="text-red-500 font-semibold text-2xl">There is nothing here!</p> */}

              <div className="flex flex-col space-y-2">
                <Link to="/register" className="hover:text-blue-600 text-lg font-semibold flex flex-row flex-nowrap items-center space-x-2 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <p>
                    Register
                  </p>
                </Link>
                <hr />
                <Link to="/companies" className="hover:text-blue-600 text-lg font-semibold flex flex-row flex-nowrap items-center space-x-2 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p>
                    Companies
                  </p>
                </Link>
              </div>
            </main>
          }
        />
      </Routes>
      <div id="taost-wrapper">
        <Toaster position="top-center" />
      </div>
    </>
  );
};
