import React from "react";
import { NavLink, useParams } from "react-router-dom";
import userIcon from "../../assets/user.svg";
import calendarIcon from "../../assets/calendar.svg";
import fileIcon from "../../assets/file.svg";
import notepadIcon from "../../assets/notepad.svg";
import "./MyProfile.css";

const SideOption = ({ employee }) => {
  return (
    <nav
      className="font-['Lexend,_-apple-system,_Roboto,_Helvetica,_sans-serif'] min-w-[180px] text-base"
      style={{ margin: "0 20px" }}
    >
      <div
        className="w-full rounded-[10px] border border-[rgba(162,161,168,0.20)] 
                      flex flex-row md:flex-col items-center md:items-start 
                      justify-center sideNavbarOption"
      >
        <div className="w-full flex max-md:flex-row md:flex-col items-center md:items-start text-black font-light">
          <NavLink
            to={`/profile/${employee._id}`}
            className={({ isActive }) =>
              `w-full flex items-center max-md:justify-center gap-2.5 px-3 py-4 max-md:rounded-l-[10px] md:rounded-t-[10px] transition ${
                isActive ? "bg-[#7152F3] text-white" : "text-black"
              }`
            }
            style={{ textDecoration: "none" }}
          >
            <img
              loading="lazy"
              src={userIcon}
              alt="Profile icon"
              className="h-6 w-6 fill-current"
            />
            <span className="max-md:hidden md:inline">Profile</span>
          </NavLink>

          <NavLink
            to={`/employee-attendance/${employee._id}`}
            className={({ isActive }) =>
              `w-full flex items-center max-md:justify-center gap-2.5 px-3 py-4 transition ${
                isActive ? "bg-[#7152F3] text-white" : "text-black"
              }`
            }
            style={{ textDecoration: "none" }}
          >
            <img
              loading="lazy"
              src={calendarIcon}
              className="h-6 w-6 fill-current"
              alt="Attendance icon"
            />
            <span className="max-md:hidden md:inline">Attendance</span>
          </NavLink>

          <NavLink
            to={`/leave/${employee._id}`}
            className={({ isActive }) =>
              `w-full flex items-center max-md:justify-center gap-2.5 px-3 py-4 max-md:rounded-e-[10px] md:rounded-b-[10px] transition ${
                isActive ? "bg-[#7152F3] text-white" : "text-black"
              }`
            }
            style={{ textDecoration: "none" }}
          >
            <img
              loading="lazy"
              src={notepadIcon}
              className="h-6 w-6 fill-current"
              alt="Leave icon"
            />
            <span className="max-md:hidden md:inline">Leave</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default SideOption;
