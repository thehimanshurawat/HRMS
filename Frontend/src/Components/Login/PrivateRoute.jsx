import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // const user = useSelector((state) => state.user?.currentUser);
  const {user} = useSelector((state) => state.userReducer);
  
  const location = useLocation();

  if (!user) {
    localStorage.setItem("lastPath", location.pathname); // ✅ लॉगिन से पहले path सेव करें
    return <Navigate to="/login" />;
}


  return children;
};

export default PrivateRoute;
