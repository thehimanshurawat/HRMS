import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import TopBar from "../topBar/TopBar";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";

const Sidebar = ({ setPageTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const { user } = useSelector((state) => state.userReducer);

  const userRole = user.role;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (item, path) => {
    setActiveItem(item);
    setPageTitle(item === "dashboard" ? "Dashboard" : item);
    navigate(path);
    if (window.innerWidth <= 768) {
      // 768px tak mobile view mana jata hai
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/hr-associate")) {
      setActiveItem("Department"); // Highlight "Department" when on HR Associate page
    } else if (path.includes("/dashboard")) {
      setActiveItem("dashboard");
    } else if (path.includes("/employees")) {
      setActiveItem("Employees");
    } else if (path.includes("/attendance")) {
      setActiveItem("Attendance");
    } else if (path.includes("/payroll")) {
      setActiveItem("Payroll");
    } else if (path.includes("/jobs")) {
      setActiveItem("Jobs");
    } else if (path.includes("/complaint")) {
      setActiveItem("Complaints");
    } else if (path.includes("/setting")) {
      setActiveItem("Settings");
    } else if (path.includes("/daily-task")) {
      setActiveItem("DailyTask");
    }
  }, [location.pathname]); // Runs when the URL changes

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Ensure sidebar remains open on desktop
      if (!mobile && !isOpen) {
        setIsOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <>
      <div className="relative">
        {isMobile && (
          <button className={styles.hamburger} onClick={() => toggleSidebar()}>
            <MenuIcon />
          </button>
        )}
        <div className={`${styles.mainContainer} ${isOpen ? styles.open : ""}`}>
          <div
            className={`${styles.sidebar} ${
              isOpen ? styles.open : styles.closed
            }`}
          >
            {isMobile && (
              <button
                className={styles.closeIcon}
                onClick={() => toggleSidebar()}
              >
                <CloseIcon />
              </button>
            )}
            <div className={styles.logo}>
              <svg
                preserveAspectRatio="xMidYMid meet"
                data-bbox="0.36 0.279 243.208 201.268"
                viewBox="0 0 243.913 201.792"
                height="201.792"
                width="243.913"
                xmlns="http://www.w3.org/2000/svg"
                data-type="ugc"
                role="presentation"
                aria-hidden="true"
              >
                <g>
                  <g opacity=".86">
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M139.358 159.816s5.42-26.187 27.014-38.576a13.973 13.973 0 0 0 4.065-3.52l23.864-30.639a11.721 11.721 0 0 1 12.02-4.417c4 1 7.321 4.083 4.681 12.319-5.28 16.6-22.368 36.711-22.368 36.711s.51 6.036 4.769 1.513 18.549-27.665 18.549-27.665l7.515-14.255a11.879 11.879 0 0 0 1.32-4.417l2.534-26.574 2.816-17.282a9.292 9.292 0 0 1 2.851-5.4c3.52-3.238 10.066-7.039 13.445 5.086 3.8 13.6-2.921 53.87-5.808 69.691a29.2 29.2 0 0 1-5.086 11.862c-8.06 11.087-27.208 36.8-42.659 52.444v21.858a2.992 2.992 0 0 1-2.992 2.992h-42.8a1.531 1.531 0 0 1-1.549-1.426z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M214.522 76.345s2.517-29.671 4.277-34.951-10.804 5.28-9.556 32.188z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M202.713 73.071s3.114-18.936 4.523-21.611-7.8-2.27-10.049 21.611z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M104.568 159.816s-5.438-26.187-27.032-38.576a13.9 13.9 0 0 1-4.048-3.52L49.625 86.991a11.738 11.738 0 0 0-12.038-4.417c-3.977 1-7.321 4.083-4.681 12.319 5.28 16.6 22.386 36.711 22.386 36.711s-.51 6.089-4.787 1.549-18.532-27.647-18.532-27.647l-7.519-14.255a11.879 11.879 0 0 1-1.32-4.417L20.587 60.26l-2.8-17.282a9.38 9.38 0 0 0-2.851-5.4c-3.52-3.238-10.066-7.039-13.445 5.086-3.784 13.6 2.9 53.87 5.808 69.691a28.967 28.967 0 0 0 5.086 11.862c8.06 11.087 27.208 36.8 42.642 52.444v21.858a3.009 3.009 0 0 0 3.009 2.992h42.783a1.531 1.531 0 0 0 1.566-1.426z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M29.387 76.345s-2.52-29.671-4.277-34.951 10.823 5.28 9.556 32.188z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M41.213 73.071S38.186 54.135 36.69 51.46s7.78-2.27 10.049 21.611z"
                    ></path>
                    <path
                      strokeWidth=".5"
                      strokeMiterlimit="10"
                      stroke="#e9b00d"
                      fill="#000"
                      d="M131.695 13.481l10.313 10.93c8.623-9.169 22-9.609 29.407-2.745a18.567 18.567 0 0 1 3.52 22.368c-4.8 8.166-16.367 11.4-26.011 6.16a196.508 196.508 0 0 1-28.915-27.278 110.45 110.45 0 0 0-18.478-17.477c-2.165-1.619-3.96-2.165-8.923-3.766-8.5-2.728-19.587-.9-28.281 5.28a34.757 34.757 0 0 0-13.586 36.711 34.687 34.687 0 0 0 26.521 24.638c11.07 2.217 23.723-1.021 30.939-9.063a28.172 28.172 0 0 0 1.883-2.393L99.257 45.529c-.422.581-6.776 8.9-16.842 8.166a18.954 18.954 0 0 1-17.331-17.722 18.831 18.831 0 0 1 13.2-18.6 19.851 19.851 0 0 1 20.1 5.913c5.192 5.385 8.553 7.884 23.142 23 5.86 6.089 5.614 5.79 6.916 7.039 5.438 5.28 10.348 9.943 16.719 12.565 12.618 5.28 25.272-.141 26.644-.757a34.969 34.969 0 0 0 17.352-16.6c.6-1.267 7.48-16.3-.757-31.044A34.7 34.7 0 0 0 151.811.916a35.391 35.391 0 0 0-20.116 12.565z"
                    ></path>
                  </g>
                </g>
              </svg>
              <h3>HRMS</h3>
            </div>
            <ul className={styles.menu}>
              <li
                className={activeItem === "dashboard" ? styles.active : ""}
                onClick={() => {
                  if (userRole === "Employee") {
                    // Redirect to the dashboard for employee
                    handleMenuClick("dashboard", "user-dashboard"); // or use history.push if using React Router
                  } else {
                    // Redirect to user dashboard if the role is not employee
                    handleMenuClick("dashboard", "/"); // or use history.push for React Router
                  }
                }}
              >
                <svg
                  className={`${styles.icon} ${
                    activeItem === "dashboard" ? styles.activeIcon : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill=""
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 2C2.89543 2 2 2.89543 2 4V8C2 9.10457 2.89543 10 4 10H8C9.10457 10 10 9.10457 10 8V4C10 2.89543 9.10457 2 8 2H4ZM18 10C20.2091 10 22 8.20914 22 6C22 3.79086 20.2091 2 18 2C15.7909 2 14 3.79086 14 6C14 8.20914 15.7909 10 18 10ZM10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18ZM16 14C14.8954 14 14 14.8954 14 16V20C14 21.1046 14.8954 22 16 22H20C21.1046 22 22 21.1046 22 20V16C22 14.8954 21.1046 14 20 14H16Z"
                    fill=""
                  />
                </svg>
                <a>Dashboard</a>
              </li>
              {userRole !== "Employee" && (
                <>
                  <li
                    className={activeItem === "Employees" ? styles.active : ""}
                    onClick={() => handleMenuClick("Employees", "employees")}
                  >
                    <svg
                      className={`${styles.icon} ${
                        activeItem === "Employees" ? styles.activeIcon : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <ellipse
                        cx="12"
                        cy="16.5"
                        rx="6"
                        ry="2.5"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="8"
                        r="3"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.44547 13.2617C5.20689 13.3133 4.06913 13.5364 3.18592 13.8897C2.68122 14.0915 2.22245 14.3507 1.87759 14.6768C1.53115 15.0045 1.25 15.4514 1.25 16.0002C1.25 16.5491 1.53115 16.996 1.87759 17.3236C2.22245 17.6498 2.68122 17.9089 3.18592 18.1108C3.68571 18.3107 4.26701 18.469 4.90197 18.578C4.40834 18.0455 4.09852 17.4506 4.01985 16.8197C3.92341 16.7872 3.83104 16.7533 3.74301 16.7181C3.34289 16.558 3.06943 16.3862 2.90826 16.2338C2.7498 16.084 2.74999 16.0048 2.75 16.0003L2.75 16.0002L2.75 16.0002C2.74999 15.9956 2.7498 15.9165 2.90826 15.7667C3.06943 15.6142 3.34289 15.4424 3.74301 15.2824C3.94597 15.2012 4.17201 15.1268 4.41787 15.0611C4.83157 14.3712 5.53447 13.7562 6.44547 13.2617Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.9803 16.8197C19.9016 17.4506 19.5918 18.0455 19.0982 18.578C19.7331 18.469 20.3144 18.3107 20.8142 18.1108C21.3189 17.9089 21.7777 17.6498 22.1226 17.3236C22.469 16.996 22.7502 16.5491 22.7502 16.0002C22.7502 15.4514 22.469 15.0045 22.1226 14.6768C21.7777 14.3507 21.3189 14.0916 20.8142 13.8897C19.931 13.5364 18.7933 13.3133 17.5547 13.2617C18.4657 13.7562 19.1686 14.3712 19.5823 15.0611C19.8281 15.1268 20.0542 15.2012 20.2571 15.2824C20.6573 15.4424 20.9307 15.6142 21.0919 15.7667C21.2504 15.9165 21.2502 15.9956 21.2502 16.0002V16.0002V16.0003C21.2502 16.0048 21.2504 16.084 21.0919 16.2338C20.9307 16.3862 20.6573 16.558 20.2571 16.7181C20.1691 16.7533 20.0767 16.7872 19.9803 16.8197Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.5147 10.1522C16.2948 10.6126 16.0066 11.0341 15.6631 11.4036C16.0589 11.6243 16.5149 11.75 17.0003 11.75C18.5191 11.75 19.7503 10.5188 19.7503 9C19.7503 7.48122 18.5191 6.25 17.0003 6.25C16.896 6.25 16.7931 6.2558 16.6919 6.26711C16.8639 6.73272 16.9686 7.23096 16.9942 7.75001C16.9962 7.75 16.9983 7.75 17.0003 7.75C17.6907 7.75 18.2503 8.30964 18.2503 9C18.2503 9.69036 17.6907 10.25 17.0003 10.25C16.8281 10.25 16.664 10.2152 16.5147 10.1522Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.30845 6.26711C7.20719 6.2558 7.10427 6.25 7 6.25C5.48122 6.25 4.25 7.48122 4.25 9C4.25 10.5188 5.48122 11.75 7 11.75C7.48537 11.75 7.94138 11.6243 8.33721 11.4036C7.99374 11.0341 7.70549 10.6126 7.4856 10.1522C7.33631 10.2152 7.17222 10.25 7 10.25C6.30964 10.25 5.75 9.69036 5.75 9C5.75 8.30964 6.30964 7.75 7 7.75C7.00205 7.75 7.00409 7.75 7.00614 7.75001C7.0317 7.23096 7.13641 6.73272 7.30845 6.26711Z"
                        fill=""
                      />
                    </svg>
                    <a>All Employees</a>
                  </li>
                  <li
                    className={activeItem === "Attendance" ? styles.active : ""}
                    onClick={() => handleMenuClick("Attendance", "/attendance")}
                  >
                    <svg
                      className={`${styles.icon} ${
                        activeItem === "Attendance" ? styles.activeIcon : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8 2V5"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 2V5"
                        stroke=""
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                        stroke=""
                        strokeWidth="1.5"
                      />
                      <path
                        d="M9 15L10.7528 16.4023C11.1707 16.7366 11.7777 16.6826 12.1301 16.2799L15 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 9H21"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <a>Attendance</a>
                  </li>
                </>
              )}

              <li
                className={activeItem === "DailyTask" ? styles.active : ""}
                onClick={() => handleMenuClick("DailyTask", "/daily-task")}
              >
                <svg
                  className={`${styles.icon} ${
                    activeItem === "DailyTask" ? styles.activeIcon : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>

                <a>Daily Task</a>
              </li>
              {userRole === "CEO" && (
                <li
                  className={activeItem === "Payroll" ? styles.active : ""}
                  onClick={() => handleMenuClick("Payroll", "payroll")}
                >
                  <svg
                    className={`${styles.icon} ${
                      activeItem === "Payroll" ? styles.activeIcon : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke=""
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 6.5V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V17.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <a>Payroll</a>
                </li>
              )}

              <li
                className={activeItem === "Jobs" ? styles.active : ""}
                onClick={() => handleMenuClick("Jobs", "/jobs")}
              >
                <svg
                  className={`${styles.icon} ${
                    activeItem === "Payroll" ? styles.activeIcon : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 6V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V6M2 10.3475C2 10.3475 5.11804 12.4244 9.97767 12.9109M22 10.3475C22 10.3475 18.882 12.4244 14.0223 12.9109M6 22H18C20.2091 22 22 20.2091 22 18V10C22 7.79086 20.2091 6 18 6H6C3.79086 6 2 7.79086 2 10V18C2 20.2091 3.79086 22 6 22Z"
                    stroke=""
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 12.1602V13.1602C14 13.1702 14 13.1702 14 13.1802C14 14.2702 13.99 15.1602 12 15.1602C10.02 15.1602 10 14.2802 10 13.1902V12.1602C10 11.1602 10 11.1602 11 11.1602H13C14 11.1602 14 11.1602 14 12.1602Z"
                    stroke=""
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a>Jobs</a>
              </li>
              <li
                className={activeItem === "Complaints" ? styles.active : ""}
                onClick={() => handleMenuClick("Complaints", "/complaintPage")}
              >
                <svg
                  className={`${styles.icon} ${
                    activeItem === "Complaints" ? styles.activeIcon : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M13.1714 1.28867L13.1717 1.28916L23.2974 21.0034L23.2977 21.004C23.5659 21.5247 23.5666 22.176 23.3045 22.6992C23.0451 23.217 22.5819 23.5 22.1249 23.5H1.8734C1.41633 23.5 0.953157 23.217 0.693752 22.6992C0.432383 22.1776 0.436093 21.5205 0.700992 21.0032C0.701033 21.0031 0.701074 21.003 0.701116 21.003L10.8266 1.28916L10.8268 1.28867C11.0903 0.774293 11.545 0.5 11.9991 0.5C12.4532 0.5 12.9079 0.774293 13.1714 1.28867ZM11.9991 6.35714C11.0389 6.35714 10.374 7.21898 10.374 8.14286V14.1429C10.374 15.0667 11.0389 15.9286 11.9991 15.9286C12.9593 15.9286 13.6242 15.0667 13.6242 14.1429V8.14286C13.6242 7.21898 12.9593 6.35714 11.9991 6.35714ZM13.9992 18.8571C13.9992 18.2898 13.8026 17.7345 13.4361 17.3157C13.0678 16.8948 12.5528 16.6429 11.9991 16.6429C11.4455 16.6429 10.9305 16.8948 10.5621 17.3157C10.1956 17.7345 9.99902 18.2898 9.99902 18.8571C9.99902 19.4245 10.1956 19.9798 10.5621 20.3986C10.9305 20.8195 11.4455 21.0714 11.9991 21.0714C12.5528 21.0714 13.0678 20.8195 13.4361 20.3986C13.8026 19.9798 13.9992 19.4245 13.9992 18.8571Z"
                    fill="currentColor"
                    fillOpacity="0.05"
                    stroke=""
                  />
                </svg>
                <a>Complaints</a>
              </li>
            </ul>
          </div>

          {/* topBar */}
          {/* <TopBar /> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
