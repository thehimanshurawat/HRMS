import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const {user} = useSelector(
    (state) => state.userReducer
  );

  // Redirect based on user role
  if (user.role === "Employee") {
    return <Navigate to="/user-dashboard" />;
  } else {
    return <Navigate to="/" />;
  }
};
