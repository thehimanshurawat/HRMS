import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./static.css";
import { ThemeProvider } from "./ThemeContext/ThemeContext";
import {
  Complaints,
  ComplaintPage,
  ForgotPassword,
  Login,
  Setting,
  SideTopBar,
  ResetPassword,
  Payroll,
  AddPayroll,
  Notification,
  Attendance,
  AllEmployee,
  AddEmployee,
  PrivateRoute,
  AttendanceDetails,
  LayoutFile,
  ProjectDetails,
  LeaveDetails,
  Jobs,
  Dashboard,
  Department,
  RoleDetail,
  DailyTask,
  ProfessionalInformation,
  UserDashboard,
  Home,
} from "./index";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInEmployee } from "./Redux/api/userApi";
import { userExist } from "./Redux/reducers/userReducer";
import { ToastContainer } from "react-toastify";
import EditEmployee from "./Components/EditEmployee/EditEmployee";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="content-section">
        <SideTopBar />
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getLoggedInEmployee();
      dispatch(userExist(user));
    };

    getCurrentUser();
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Protected Routes with Layout */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/Department" element={<Department />} />
            <Route path="/role-details/:roleName" element={<RoleDetail />} />
            <Route path="/employees" element={<AllEmployee />} />
            <Route path="/complaint" element={<Complaints />} />
            <Route path="/complaintPage" element={<ComplaintPage />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/Jobs" element={<Jobs />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/add-payroll" element={<AddPayroll />} />
            <Route path="/add-payroll/:payrollId" element={<AddPayroll />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/profile/:empId"
              element={<LayoutFile children={<ProfessionalInformation />} />}
            />
            <Route
              path="/employee-attendance/:empId"
              element={<LayoutFile children={<AttendanceDetails />} />}
            />
            <Route
              path="/projects/:empId"
              element={<LayoutFile children={<ProjectDetails />} />}
            />
            <Route
              path="/leave/:empId"
              element={<LayoutFile children={<LeaveDetails />} />}
            />
            <Route path="/" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/daily-task" element={<DailyTask />} />{" "}
          </Route>
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
