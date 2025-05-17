import React from "react";
import editIcon from "../../assets/edit.svg";
import userImage from "../../assets/userImage.png";
import briefcaseIcon from "../../assets/briefcase.svg";
import mailIcon from "../../assets/mail.svg";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

const MyProfileDetails = ({ employee }) => {
  const navigate = useNavigate();
  return (
    <div className="font-['Lexend,_-apple-system,_Roboto,_Helvetica,_sans-serif'] mx-4 sm:mx-6 md:mx-10 lg:mx-16 overflow-hidden myProfileSection">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
        {/* Profile Image (Left Side) */}
        <div className="flex justify-center sm:justify-start">
          <img
            loading="lazy"
            src={employee.profileImg || userImage}
            className="w-[90px] sm:w-[100px] rounded-[10px] object-cover"
            alt="Profile"
          />
        </div>

        {/* User Details (Right Side) */}
        <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
          <div className="text-lg sm:text-xl md:text-2xl font-semibold">
            {employee.username}
          </div>
          <div className="mt-1 text-sm sm:text-base font-light flex flex-col gap-1">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <img src={briefcaseIcon} className="w-4 sm:w-5" alt="Role" />
              <span>{employee.designation}</span>
            </div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <img src={mailIcon} className="w-4 sm:w-5" alt="Email" />
              <span>{employee.email}</span>
            </div>
          </div>

          {/* Edit Button - Positioned Below */}
          <div className="mt-4 w-full flex justify-center sm:justify-start">
            <button
              onClick={() => navigate(`/edit-employee/${employee._id}`)}
              className="flex items-center bg-[#7152F3] text-white px-4 py-2 rounded-lg gap-2 text-sm sm:text-base hover:bg-[#5a3dcf] transition"
              style={{ borderRadius: "10px" }}
            >
              <img src={editIcon} className="w-4 sm:w-5" alt="Edit" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-gray-300 h-[1px] mt-4 sm:mt-6 w-full" />
    </div>
  );
};

export default MyProfileDetails;
