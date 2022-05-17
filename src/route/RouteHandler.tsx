import React from "react";
import { Routes, Route } from "react-router-dom";
import { RegisterContainer } from "../containers/resigterContainer/RegisterContainer";
import { RegisterCode } from "../containers/resigterContainer/RegisterCode";
import AuthRoute from "./AuthRouter";
import ProductsContainerContainer from "../containers/productsContainer/ProductsContainerContainer";
import CompaniesContainer from "../containers/companiesContainer/CompaniesContainer";
import { Toaster } from "react-hot-toast";
import { MainLayout } from "../Layout/MainLayout";
import BaseContainer from "../Layout/BaseContainer";

export const RouteHandler = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="/register/code" element={<RegisterCode />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/companies" element={<CompaniesContainer />} />
          <Route
            path="/companies/:id"
            element={<ProductsContainerContainer />}
          />
        </Route>
        <Route path="*" element={<BaseContainer />} />
      </Routes>
      <div id="taost-wrapper">
        <Toaster position="top-center" />
      </div>
    </>
  );
};
