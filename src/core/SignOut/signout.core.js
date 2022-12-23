import React from "react";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  localStorage.removeItem('jwt');
  return <Navigate replace to='/'/>
}

export default SignOut;