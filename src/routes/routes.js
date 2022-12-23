import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductCreate } from "../core/AddProduct/addProduct.core.js";
import { Home } from "../core/Home/home.core.js";

import { SignIn } from "../core/SignIn/signin.core.js";
import { SignInEmployees } from "../core/SignInEmpleado/signinEmployees.core.js";
import SignOut from "../core/SignOut/signout.core.js";

import { EmployeeRoute } from "./roles.routes.js"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* General Routes */}
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/signout" exact element={<SignOut />} />
        <Route path="/signin/empleado" exact element={<SignInEmployees />} />
        {/* Admin Routes */}
        <Route
          path="/productos/add"
          element={
            <EmployeeRoute>
              <ProductCreate />
            </EmployeeRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;