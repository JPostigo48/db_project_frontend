import React from "react";
import { Navigate } from "react-router-dom";
import { isEmployee } from "../functions/autentication.function";


export const EmployeeRoute = ({children}) => {
  return isEmployee() ? children : <Navigate to="/" />;
}