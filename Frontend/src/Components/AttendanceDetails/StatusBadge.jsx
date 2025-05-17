import React from "react";
import "../Attendance/Attendance.css";

const StatusBadge = ({ status }) => {
  const formatStatusText = (status) => {
    if (!status) return "Unknown Status";
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-");
  };

  const getStatusStyles = (status) => {
    const formattedStatus = formatStatusText(status);

    switch (formattedStatus) {
      case "Leave":
        return "bg-yellow-200 text-yellow-700 max-[330px]:text-[8px]";
      case "Absent":
        return "bg-red-200 text-red-700 max-[330px]:text-[8px]";
      case "On-Time":
        return "bg-green-200 text-green-700 max-[330px]:text-[8px]";
      case "Late":
        return "bg-orange-200 text-orange-700 max-[330px]:text-[8px]";
      default:
        return "bg-gray-200 text-gray-700 max-[330px]:text-[8px]";
    }
  };

  return (
    <div
      className={`self-stretch rounded-[4px] px-2 py-[3px] text-xs ${getStatusStyles(
        status
      )}`}
    >
      {formatStatusText(status)}
    </div>
  );
};

export default StatusBadge;
