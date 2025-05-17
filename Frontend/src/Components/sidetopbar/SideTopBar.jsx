import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./SideTopBar.css";

const pageTitles = {
  "/": "Dashboard",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/complaintPage": "Complaints",
  "/setting": "Settings",
  "/payroll": "Payroll",
  "/jobs": "Jobs",
  "/notification": "Notifications",
  "/daily-task": "DailyTask",
  "/add-employee": "Add Employee",
  "/add-payroll": "Add Payroll",
  "/complaint": "Complaints Form",
  // "/profile": "My Profile",
  // "/edit-employee": "Edit Profile", // 👈 यहाँ एड किया गया
  // "/leave": "Leave",
};

const roleTitles = {
  "/role-details/hr-associates": "HR Associates",
  "/role-details/sr-hr-associates": "Sr. HR Associates",
  "/role-details/managers": "Managers",
  "/role-details/sr-managers": "Sr. Managers",
  "/role-details/associate-director": "Associate Director",
};

const SideTopBar = ({ children }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Home");

  // ✅ Automatically update title based on URL
  useEffect(() => {
    if (location.pathname.startsWith("/profile/")) {
      setPageTitle("My Profile");
    } else if (location.pathname.startsWith("/edit-employee")) {
      setPageTitle("Edit Profile");
    }else if(location.pathname.startsWith("/employee-attendance")){
      setPageTitle("Attendance");
    }else if(location.pathname.startsWith("/leave")){
      setPageTitle("Leave");
    }
     else if (roleTitles[location.pathname]) {
      setPageTitle(roleTitles[location.pathname]);
    } else {
      setPageTitle(pageTitles[location.pathname] || "Dashboard");
    }
  }, [location.pathname]);

  return (
    <div className="side-topbar-container">
      <Sidebar setPageTitle={setPageTitle} />
      <div className="topbar-content">
        <Header pageTitle={pageTitle} postName="HR Manager" />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default SideTopBar;
