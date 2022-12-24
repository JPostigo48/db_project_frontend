import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProductCreate } from "../core/AddProduct/addProduct.core.js";
import { Doubts } from "../core/Doubts/doubts.core.js";
import { Home } from "../core/Home/home.core.js";
import { SignUp } from "../core/Signup/signup.core.js";
import { PayProduct } from "../core/PayProduct/payProduct.core.js";

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
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/signout" exact element={<SignOut />} />
        <Route path="/signin/empleado" exact element={<SignInEmployees />} />
        <Route path="/consultas" exact element={<Doubts />} />
        <Route path="/product/buy/:Productid" exact element = {<PayProduct />} />

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