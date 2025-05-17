import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const pageTitles = {
  "/": "Home",
  "/employees": "Employees",
  "/department": "Department",
  "/attendance": "Attendance",
  "/complaint": "Complaints",
  "/setting": "Settings",
  "/payroll": "Payroll",
  "/notification": "Notifications",  
};

const SideTopBar = ({ children }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Home");

  // ✅ Automatically update title based on URL
  useEffect(() => {
    setPageTitle(pageTitles[location.pathname] || "Dashboard");
  }, [location.pathname]);

  return (
    <div className="side-topbar-container ">
      <Sidebar setPageTitle={setPageTitle} />
      <div className="topbar-content">
        <Header pageTitle={pageTitle} postName="HR Manager" />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default SideTopBar;
 